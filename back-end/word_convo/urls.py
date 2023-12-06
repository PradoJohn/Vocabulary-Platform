from django.urls import path

from .views import StartConversation


urlpatterns =[
  path("<str:word>/", StartConversation.as_view(), name="start_conversation"),

]