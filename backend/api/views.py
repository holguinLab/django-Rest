from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from .utils import *

""" esto es para usar con jwt """
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


# Create your views here.

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Crear usuario de Django
        user = User.objects.create_user(username=email, email=email, password=password)
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'mensaje': "Su cuenta se registró correctamente",
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET']) # <<-------- Decorador que es lo mismo que hacer esto if request.method == 'GET':
@permission_classes([IsAuthenticated])
def listar_tareas(request):
    user = request.user
    tareas =  user.tareas_usuarios.all() # related name del modelo Tareas para mostrar las tareas que crea cada usuario
    serializer = TareaSerializer(tareas,many=True) # convierte tareas en un json many=true quiere decir que no es solo un campo si no muchos
    return Response(serializer.data)


@api_view(['POST']) #if request.method == 'POST' :
@permission_classes([IsAuthenticated])
def nueva_tarea(request):
    data = request.data.copy()  # hacer una copia para modificar
    data['usuario'] = request.user.id  # asignar el id del usuario logueado
    serializer = TareaSerializer(data = data)
    if serializer.is_valid(): # esto se debe de usar para que funcionen los mensajes del seralizer si no se pone el no sabe si los datos que llegan son correctos
        serializer.save()
        return Response({"mensaje" : 'Tarea Creada Con Exito ', "data" : serializer.data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mostrar_estados(request) :
    choices = []
    for key , value in Tareas.ESTADOS:
        choices.append({"key" : key , "value" : value})
    return Response(choices)





