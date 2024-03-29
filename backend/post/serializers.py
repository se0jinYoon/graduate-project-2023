from rest_framework import serializers
from .models import Post
from .models import CardData

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CardDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardData
        fields = '__all__'
