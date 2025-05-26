from rest_framework import serializers
from .models import *

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tareas
        fields = '__all__'
        
        # Estos Mensajes Son automaticos al momento de retornar con esta linea en las vistas  return Response(serializers.errors,status=status.HTTP_404_NOT_FOUND)
        
        extra_kwargs = {
            'titulo': {
                'required': True,
                'allow_blank':False,
                'error_messages': {
                    'required': 'El título es obligatorio',
                    'max_length': 'Máximo 100 caracteres',
                    'blank' : "El titulo no puede estar vacio "
                }
            },
            'descripcion': {
                'required': True,
                'allow_blank':False,
                'error_messages': {
                    'required': 'La descripción es obligatoria',
                    'max_length': 'Máximo 100 caracteres',
                    'blank' : "La descripcion no puede estar vacia"
                }
            },
            'estado': {
                'required': True,
                'allow_blank':False,
                'error_messages': {
                    'required': 'El estado es obligatorio',
                    'blank' : "El estado no puede estar vacio"
                }
            },
        }
        


class UsuarioSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=100)
    password = serializers.CharField(required=True, write_only=True, max_length=128)

