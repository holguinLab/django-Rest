# Generated by Django 5.2.1 on 2025-05-26 07:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_usuarios_tareas_usuario'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='tareas',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tareas_usuarios', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Usuarios',
        ),
    ]
