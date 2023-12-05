from django.urls import path
from .views import SignUp, LogIn, LogOut, Account

urlpatterns=[
  path("signup/", SignUp.as_view(), name='signup'),
  path("login/", LogIn.as_view(), name='login'),
  path("logout/", LogOut.as_view(), name='logout'),
  path("account/", Account.as_view(), name='account'),
]