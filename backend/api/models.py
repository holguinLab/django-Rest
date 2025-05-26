from django.db import models
from django.contrib.auth.models import User


class Tareas(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE,related_name="tareas_usuarios")
    titulo = models.CharField(max_length=100,null=False,blank=False)
    descripcion = models.CharField(max_length=100,null=False,blank=False)
    ESTADOS = (
        ("C","Completada"),
        ("P","Pendiente"),
    )
    estado = models.CharField(max_length=1 ,choices=ESTADOS ,default="P",null=False,blank=False)