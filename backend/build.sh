#!/usr/bin/env bash
# build.sh

echo "Instalando dependencias..."
pip install -r requirements.txt

echo "Aplicando migraciones..."
python manage.py migrate

echo "Recolectando archivos estáticos..."
python manage.py collectstatic --noinput