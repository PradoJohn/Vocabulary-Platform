from django.db import models
from django.contrib.auth.models import User

class Word(models.Model):
    word = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    # From Django User default model
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='words')