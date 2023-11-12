from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    # default는 admin일 수 있도록. admin 인덱스 확인 필
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=User.objects.get(pk=1).id) 
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images')
    
    def __str__(self):
        return self.title
    
class CardData(models.Model):
    # default는 admin일 수 있도록. admin 인덱스 확인 필
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=User.objects.get(pk=1).id) 
    name = models.CharField(max_length=30, null=True)
    company = models.CharField(max_length=100, null=True)
    department = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)
    position = models.CharField(max_length=30, null=True)
    tel = models.CharField(max_length=30, null=True)
    mobile = models.CharField(max_length=30, null=True)
    fax = models.CharField(max_length=30, null=True)
    email = models.CharField(max_length=30, null=True)
    homepage = models.CharField(max_length=30, null=True)