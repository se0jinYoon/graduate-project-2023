from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images')
    
    def __str__(self):
        return self.title
    
class CardData(models.Model):
    name = models.CharField(max_length=30, null=True)
    company = models.CharField(max_length=100, null=True)
    department = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)
    position = models.CharField(max_length=30, null=True)
    tel = models.CharField(max_length=30, null=True)
    fax = models.CharField(max_length=30, null=True)
    email = models.CharField(max_length=30, null=True)
    homepage = models.CharField(max_length=30, null=True)