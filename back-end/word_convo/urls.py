from django.urls import path
from .views import StartConversation


urlpatterns =[
  path("",StartConversation.as_view(), name="start_conversation" ),
  path("<str:word>/", StartConversation.as_view(), name="search_word_conversation"),
]