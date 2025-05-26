from .views  import *
from django.urls import path


urlpatterns =[
    
    
    path('tareas/', listar_tareas ,name='listar_tareas'),
    path('nueva_tarea/', nueva_tarea ,name='nueva_tarea'),
    path('estados/', mostrar_estados ,name='estados'),
    path('register/',register,name='register'),
    
]