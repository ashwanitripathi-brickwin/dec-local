from django.urls import path
from .views import *
urlpatterns = [
    path("", login, name="login"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    # path("forgot_password/", forgot_password, name="forgot_password"),
    path("register/", register, name="register"),
    # path('update-gmail1/', update_gmail1, name='update_gmail1'),
    # path('update_auth_gmail', update_gmail_in_timesheets, name='update_auth_gmail'),

]
