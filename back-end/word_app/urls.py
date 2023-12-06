from django.urls import path
from .views import SearchWord, SavedWords

urlpatterns =[
  path("search_word/<str:word>/", SearchWord.as_view(), name="search_word"),
  path("saved_words/", SavedWords.as_view(), name="saved_words"),
  path("saved_words/<int:word_id>/", SavedWords.as_view(), name="save_a_word"),

]