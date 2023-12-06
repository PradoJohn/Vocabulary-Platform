from django.urls import path
from .views import SearchWord, SavedList

urlpatterns =[
  path("search_word/<str:word>/", SearchWord.as_view(), name="search_word"),
  path("saved_list/", SavedList.as_view(), name="saved_list"),
  path("saved_list/<int:word_id>/", SavedList.as_view(), name="save_a_word"),

]