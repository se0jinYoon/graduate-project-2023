from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    # path('posts/<int:pk>/', views.CardDataDetailView.as_view(), name='carddata_detail'),

]