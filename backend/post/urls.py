from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    path('posts/<int:pk>/', views.PostView.as_view(), name='post_detail'), 
    path('posts/user/<int:user>/', views.CardDataView.as_view(), name='user_card_data'),
]