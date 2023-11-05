from django.urls import path
from . import views

urlpatterns = [
    path('run_ocr/', views.run_ocr, name='run_ocr'),
]
