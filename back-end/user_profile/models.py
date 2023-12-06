from django.db import models
from django.contrib.auth.models import User

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     is_premium = models.BooleanField(default=False)

# class Word(models.Model):
#     word = models.CharField(max_length=100)
#     definition = models.TextField()
#     examples = models.TextField(blank=True, null=True)
#     pronunciation = models.CharField(max_length=50, blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     # ForeignKey establishes a relationship between Word and User
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='words')

# class UserProgress(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     total_words_learned = models.PositiveIntegerField(default=0)
#     last_learning_session = models.DateTimeField(blank=True, null=True)
#     # Add more fields as needed for user progress tracking

# class LearningSession(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     words = models.ManyToManyField(Word)
#     session_date = models.DateTimeField(auto_now_add=True)
#     # Add more fields as needed for learning sessions

# class Feedback(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     feedback_text = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     # Add more fields as needed for feedback
