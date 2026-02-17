
from django.shortcuts import render,redirect,HttpResponse
from ..models import employee,employee_detail,client,project,toggl_user_detail,toggl_project_detail,contracted_hours,Attendance,leave,Holiday,LeaveType,calculation,timeSheet,contracted_employee,Country,Work_Category,Client_contract_work,Client_contract_employee,SalaryHistory,SheetRecord,ShortWorkEmail,Buddy_Email,FileManager

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate,login
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings 
import random
import string
import json
from django.http import JsonResponse 
import os
import time
from datetime import date
from django.contrib.auth.decorators import login_required
from decimal import Decimal
from django.contrib.auth import login,logout
from datetime import datetime  # Import the datetime module
import requests
from base64 import b64encode
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Sum
import pytz
import calendar
from django.http import HttpResponse
from django.db import connection
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
import openpyxl
from django.db.models import F, Value
from django.db.models.functions import Concat
from django.db.models import Case, When, Value, IntegerField
from collections import defaultdict
import logging 


# Create your views here.
@csrf_exempt
def login(request):
    # Check if the user is already logged in
    if request.user.is_authenticated:
        logging.info(f"User {request.user.username} is already authenticated. Redirecting to admin dashboard.")
        return redirect("admin-dashboard")

    base_url = f"{request.scheme}://{request.get_host()}/auth-receiver"
    if request.method == 'POST':
        uname = request.POST.get("username")
        print("myyyy")
        print(uname)
        password = request.POST.get('password')
        print('Password')
        print(password)

        # Attempt authentication with the original username
        user = auth.authenticate(username=uname, password=password)

        # If authentication fails, attempt authentication with the first letter lowercase
        try:
            if not user:
                uname_lower = uname[0].lower() + uname[1:]
                user = auth.authenticate(username=uname_lower, password=password)

            # If authentication fails again, attempt authentication with the first letter uppercase
            if not user:
                uname_upper = uname[0].upper() + uname[1:]
                user = auth.authenticate(username=uname_upper, password=password)
        except:
            pass

        if user is not None:
            # print("if")
            auth.login(request, user)
            request.session['user_email'] = user.email
            print(request.session['user_email'])
            group = None

            if request.user.groups.exists():
                group = request.user.groups.all()
                print("exist group")
                print(group)

                if group[0].name == 'admin' or group[0].name == 'super_admin'or group[0].name == 'super_user':
                    print("admin")
                    employee1 = employee.objects.get(email=request.user.email)
                    if employee1:
                        request.session['first_name'] = employee1.first_name
                        request.session['last_name'] = employee1.last_name
                        request.session['user_image_url'] = employee1.image_url
                        request.session['user_name'] = employee1.user_name
                        request.session['user_id'] = employee1.id
                        return redirect("admin-dashboard")

            else:
                logging.info("User is not in any admin group. Checking for employee record.")
                print("employee")
                employee1 = employee.objects.get(email=request.user.email)
                print("sgvfbhjnmk,,,,;l/////////////////////////////////////")
                print(employee1)
                if employee1:
                    request.session['first_name'] = employee1.first_name
                    request.session['last_name'] = employee1.last_name
                    request.session['user_image_url'] = employee1.image_url
                    request.session['user_name'] = employee1.user_name
                    request.session['user_id'] = employee1.id
                    print(user.email)
                    print(employee1.image_url)
                    print("employee done")
                return redirect("admin-dashboard")

    # Default return statement if none of the conditions are met
    return render(request, "login.html", {'google_client_id': settings.GOOGLE_OAUTH_CLIENT_ID,'base_url':base_url})


def logout(request):
    auth.logout(request)
    return redirect('login')


@csrf_exempt
def register(request):
    if request.method == 'POST':
        uname = request.POST.get("username")
        pass1 = request.POST.get("password")
        pass2 = request.POST.get("repeat_password")

        if pass1 != pass2:
            messages.error(request, "Passwords do not match.")
            return redirect("register")  # Redirect back to the registration page

        # Check if the email is already in use
        if User.objects.filter(username=uname).exists():
            messages.error(request, "This email is already in use.")
            return redirect("register")

        # Create a new user
        my_user = User.objects.create_user(username=uname, password=pass1)
        my_user.save()

        messages.success(request, "Registration successful.")
        return redirect("admin-dashboard")

    return render(request, "register.html",{})
@csrf_exempt
def forgot_password(request):
        if request.method == 'POST':
            email = request.POST.get('email')
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None

            if user:
                # Generate a temporary password
                temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
                user.set_password(temp_password)
                user.save()

                # Send an email with the temporary password
                send_mail(
                    'Password Reset',
                    f'Your new password: {temp_password}',
                    'your_email@example.com',  # Replace with your email
                    [email],
                    fail_silently=False,
                )

                messages.success(request, 'Password reset email sent. Check your inbox.')
                return redirect('login')  # Redirect to the login page
            else:
                messages.error(request, 'No user found with this email address.')

        return render(request, 'forgot_password.html',{})
