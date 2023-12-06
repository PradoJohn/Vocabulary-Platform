from django.db import models
from django.contrib.auth.models import User
from word_app.models import Word

class Conversation(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conversations")
  related_word = models.ForeignKey(Word, on_delete=models.SET_NULL, null=True, blank=True)
  user_input = models.TextField()
  ai_response = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)