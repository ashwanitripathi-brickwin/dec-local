from django.db import models
from django.utils import timezone
import calendar
from django.contrib.postgres.fields import ArrayField

class employee(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    user_name = models.CharField(max_length=50, null=True, blank=True)
    toggl_user_id = models.IntegerField(null=True, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    personal_email = models.EmailField(unique=True, blank=True, null=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=1000.00)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    country_id = models.IntegerField(null=True, blank=True)  # ASHOK ADDED THIS
    remaining_leave = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    calender_status = models.IntegerField(default=0)
    auth_gmail = models.CharField(max_length=200, null=True, blank=True)
    token = models.TextField(null=True, blank=True)
    joining_date = models.DateField(blank=True, null=True)
    timezone = models.CharField(max_length=100, null=True, blank=True)
    manual_timezone = models.CharField(max_length=100, null=True, blank=True)
    gd_gmail = models.CharField(max_length=200, null=True, blank=True)
    gd_token = models.TextField(null=True, blank=True)
    is_special_case = models.BooleanField(default=False)
    is_external = models.BooleanField(default=True)
    is_email_verified = models.BooleanField(default=False)


    # def __str__(self):
    #     return self.first_name

class SalaryHistory(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    effective_date = models.DateField(null=True, blank=True)

class toggl_user(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    toggl_user_id = models.IntegerField(null=True, blank=True)
    toggl_username=models.CharField(max_length=100, blank=True, null=True)

class toggl_user_detail(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    username = models.CharField(max_length=50)
    project_id = models.IntegerField(null=True, blank=True)
    task_id = models.IntegerField(null=True, blank=True)
    billable = models.BooleanField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tag_ids = models.JSONField(default=list)
    billable_amount_in_cents = models.IntegerField(null=True)
    hourly_rate_in_cents = models.IntegerField(null=True)
    currency = models.CharField(max_length=30)
    time_entries_id = models.BigIntegerField(null=True, blank=True)
    time_entries_seconds = models.IntegerField(null=True, blank=True)
    time_entries_start_date = models.DateField(null=True, blank=True)
    time_entries_start_time = models.TimeField(null=True, blank=True)
    time_entries_start_time_utc = models.CharField(max_length=15, null=True, blank=True)
    time_entries_stop_date = models.DateField(null=True, blank=True)
    time_entries_stop_time = models.TimeField(null=True, blank=True)
    time_entries_stop_time_utc = models.CharField(max_length=15, null=True, blank=True)
    time_entries_at_date = models.DateField(null=True, blank=True)
    time_entries_at_time = models.TimeField(null=True, blank=True)
    time_entries_at_time_utc = models.CharField(max_length=15, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)


class user_login(models.Model):
    employee_id = models.CharField(max_length=10, null=True, blank=True)
    user_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    confirm_password = models.CharField(max_length=100, blank=True, null=True)

class employee_detail(models.Model):
    employee_id = models.CharField(max_length=10,null=True, blank=True)
    emergency_contact = models.CharField(max_length=100,null=True, blank=True)
    name = models.CharField(max_length=100,null=True, blank=True)
    relationship = models.CharField(max_length=100, null=True, blank=True)


class employee_salary(models.Model):
    employee_id = models.CharField(max_length=10,null=True, blank=True)
    month_year = models.CharField(max_length=10,null=True, blank=True)  # You can adjust the max length as needed
    monthly_salary = models.DecimalField(max_digits=10, decimal_places=4,null=True, blank=True)
    bonus = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    deductions = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    net_salary = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)


class client(models.Model):
    client_name = models.CharField(max_length=100, null=True, blank=True)
    toggl_client_name= models.CharField(max_length=100, null=True, blank=True)
    toggl_client_id=models.IntegerField(null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=100, null=True, blank=True)
    level = models.CharField(max_length=100, null=True, blank=True)
    region = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    company_size = models.CharField(max_length=100,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    status=models.IntegerField(null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class toggl_client(models.Model):
    client_id = models.IntegerField(null=True, blank=True)
    toggl_client_id = models.IntegerField(null=True, blank=True)
    toggl_client_name = models.CharField(max_length=100, blank=True, null=True)


class client_detail(models.Model):
    client_id = models.CharField(max_length=10,null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    business_type = models.CharField(max_length=255,null=True, blank=True)
    client_name = models.CharField(max_length=255,null=True, blank=True)


class client_payment(models.Model):
    client_id = models.CharField(max_length=10,null=True, blank=True)
    month_year = models.CharField(max_length=10,null=True, blank=True)  # e.g., "Jan 2023"
    amount_paid = models.DecimalField(max_digits=10, decimal_places=4,null=True, blank=True)
    outstanding_amount = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)


class project(models.Model):
    project_name = models.CharField(max_length=255,null=True, blank=True)
    company = models.CharField(max_length=255,null=True, blank=True)
    working_role = models.TextField(null=True, blank=True)
    working_hours = models.CharField(max_length=10, null=True, blank=True)
    working_hours_type = models.CharField(max_length=10, null=True, blank=True)
    duration = models.CharField(null=True, blank=True)
    duration_type = models.CharField(max_length=10, null=True, blank=True)
    status = models.CharField(max_length=50,null=True, blank=True)
    client_id = models.CharField(max_length=255, null=True, blank=True)
    toggl_project_id=models.IntegerField(null=True, blank=True)
    toggl_client_id = models.IntegerField(null=True, blank=True)
    toggl_project_name = models.CharField(max_length=255, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    rate = models.CharField(max_length=10,null=True, blank=True)
    rate_type = models.CharField(max_length=10, null=True, blank=True)
    priority = models.CharField(max_length=10,null=True, blank=True)
    project_leader = models.CharField(max_length=255,null=True, blank=True)
    team_members = models.CharField(max_length=255,null=True, blank=True)  # You can use a ForeignKey to an Employee model if needed
    description = models.TextField(null=True, blank=True)
    uploaded_file = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class toggl_project(models.Model):
    project_id = models.IntegerField(null=True, blank=True)
    toggl_project_id = models.IntegerField(null=True, blank=True)
    toggl_project_name = models.CharField(max_length=100, blank=True, null=True)


class toggl_project_detail(models.Model):
    project_id=models.IntegerField(null=True, blank=True)
    toggl_project_id = models.BigIntegerField(null=True, blank=True)
    workspace_id = models.IntegerField(null=True, blank=True)
    client_id = models.BigIntegerField(null=True, blank=True)
    name = models.CharField(max_length=255,null=True, blank=True)
    is_private = models.BooleanField(null=True, blank=True)
    active = models.BooleanField(null=True, blank=True)
    at_date = models.DateField(null=True, blank=True)
    at_time_of_day = models.TimeField(null=True, blank=True)
    at_time_zone_offset = models.CharField(max_length=15, null=True, blank=True)
    created_at_date = models.DateField(null=True, blank=True)
    created_at_time_of_day = models.TimeField(null=True, blank=True)
    created_at_time_zone_offset = models.CharField(max_length=15, null=True, blank=True)
    server_deleted_at = models.DateTimeField(null=True, blank=True)
    color = models.CharField(max_length=7)
    billable = models.BooleanField(null=True, blank=True)
    template = models.BooleanField(null=True, blank=True)
    auto_estimates = models.BooleanField(null=True, blank=True)
    estimated_hours = models.FloatField(null=True, blank=True)
    rate = models.FloatField(null=True, blank=True)
    rate_last_updated = models.DateTimeField(null=True, blank=True)
    currency = models.CharField(max_length=3, null=True, blank=True)
    recurring = models.BooleanField(null=True, blank=True)
    recurring_parameters = models.JSONField(null=True, blank=True)
    current_period = models.JSONField(null=True, blank=True)
    fixed_fee = models.FloatField(null=True, blank=True)
    actual_hours = models.IntegerField(null=True, blank=True)
    wid = models.BigIntegerField(null=True, blank=True)
    cid = models.BigIntegerField(null=True, blank=True)


class employee_project(models.Model):
    employee_id = models.CharField(max_length=10,null=True, blank=True)
    project_id = models.CharField(max_length=10,null=True, blank=True)
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)


class time_tracking(models.Model):
    employee_id = models.CharField(max_length=10,null=True, blank=True)
    project_id = models.CharField(max_length=10,null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    description = models.TextField(null=True, blank=True)


class leave(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    leave_type_id = models.IntegerField(null=True, blank=True)
    day_type = models.IntegerField(null=True, blank=True)
    leave_days = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    reason = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50,null=True, blank=True)
    approved_by = models.IntegerField(null=True, blank=True)
    apply_by = models.IntegerField(null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class contracted_hours(models.Model):
    client_id=models.IntegerField(null=True, blank=True)
    client_name = models.CharField(max_length=255, null=True, blank=True)
    total_working_hours = models.FloatField(null=True, blank=True)
    working_input = models.TextField(null=True, blank=True)
    no_of_people_on_account = models.IntegerField(null=True, blank=True)
    month = models.DateField(null=True, blank=True)
    rate=models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)


class Attendance(models.Model):
    employee_id = models.CharField(max_length=10,null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50,null=True, blank=True) # e.g., 'Present', 'Absent', 'Late', etc.
    in_time = models.TimeField(null=True, blank=True)  # Optional, records time of arrival
    out_time = models.TimeField(null=True, blank=True)  # Optional, records time of departure
    notes = models.TextField(null=True, blank=True)  # Optional, for any additional notes
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class Country(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    code = models.CharField(max_length=3, null=True, blank=True)  # ISO country codes are 2 or 3 characters
    currency = models.CharField(max_length=100, null=True, blank=True)  # ASHOK ADDED THIS
    region = models.CharField(max_length=200, null=True, blank=True)  # ASHOK ADDED THIS
    paid_leave = models.IntegerField(null=True, blank=True) #Added by Vinod
    is_external=models.BooleanField(default=True)


    def __str__(self):
        return self.name

class Holiday(models.Model):
    country_id = models.IntegerField(null=True, blank=True) # ASHOK Changed THIS
    name = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class LeaveType(models.Model):
    name = models.CharField(max_length=100)
    no_of_day = models.IntegerField(null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class calculation(models.Model):
    earning=models.DecimalField(max_digits=20, decimal_places=2,null=True, blank=True)
    profit=models.DecimalField(max_digits=20, decimal_places=2,null=True, blank=True)
    contracted_profit=models.DecimalField(max_digits=20, decimal_places=2,null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

class timeSheet(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    category_id = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    time_entries_seconds = models.IntegerField(null=True, blank=True)
    time_entries_start_date = models.DateField(null=True, blank=True)
    time_entries_stop_date = models.DateField(null=True, blank=True)
    time_entries_start_time = models.TimeField(null=True, blank=True)
    time_entries_stop_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_google = models.IntegerField(default=0)
    gmail = models.CharField(max_length=200, null=True, blank=True)
    calender_eid = models.CharField(max_length=500, null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    project_id = models.IntegerField(null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)
    
    class Meta:
        unique_together = ('employee_id', 'calender_eid')

class contracted_employee(models.Model):
    employee_id=models.IntegerField(null=True, blank=True)
    employee_name = models.CharField(max_length=255, null=True, blank=True)
    month = models.DateField(null=True, blank=True)
    support = models.IntegerField(null=True, blank=True)
    account_manager=models.IntegerField(null=True, blank=True)
    advisor=models.IntegerField(null=True, blank=True)
    total=models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class Work_Category(models.Model):
    category=models.CharField(max_length=255,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class Client_contract_work(models.Model):
    client_id=models.IntegerField(null=True, blank=True)
    total_working_hours=models.FloatField(null=True, blank=True)
    no_of_people_on_account = models.IntegerField(null=True, blank=True)
    working_input = models.TextField(null=True, blank=True)
    working_role = models.TextField(null=True, blank=True)
    cost=models.IntegerField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    status=models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external=models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class Client_contract_employee(models.Model):
    employee_id=models.IntegerField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    support = models.IntegerField(null=True, blank=True)
    account_manager=models.IntegerField(null=True, blank=True)
    advisor=models.IntegerField(null=True, blank=True)
    total=models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)
    created_by=models.IntegerField(null=True, blank=True)

class SheetRecord(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    spreadsheet_id = models.CharField(max_length=255, unique=True)
    google_email = models.CharField(max_length=255, unique=True)
    sheet_name = models.CharField(max_length=255, blank=True)
    record_type = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)

    def __str__(self):
        return self.sheet_name
        
class ShortWorkEmail(models.Model):
    employee_id = models.IntegerField(null=True, blank=True)
    minimum_work = models.IntegerField(null=True, blank=True)  # TOTAL WORK NEED IN SECONDS
    total_working = models.IntegerField(null=True, blank=True)  # TOTAL WORKING IN SECOND
    status = models.IntegerField(null=True, blank=True)  # 0 ,1,2 for Pending,Sent,Canceled
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_external = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.employee_id} ({self.status})"


class Buddy_Email(models.Model):
    leave_id = models.IntegerField(null=True, blank=True)
    employee_id = models.IntegerField(null=True, blank=True)
    client_buddy_record = models.TextField(null=True, blank=True)
    leave_approved_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_external = models.BooleanField(default=True)

# class FileManager(models.Model):
    # ENTITY_CHOICES = [
    #     ('employee', 'Employee'),
    #     ('client', 'Client'),
    # ]
    
    # entity_type = models.CharField(max_length=10, choices=ENTITY_CHOICES)
    # employee_id = models.IntegerField(null=True, blank=True)
    # client_id = models.IntegerField(null=True, blank=True)
    # file = models.FileField(upload_to='gallery/%Y/%m/%d/', blank=True, null=True)
    # description = models.TextField(blank=True, null=True)
    # file_type = models.CharField(max_length=50, blank=True, null=True)
    # uploaded_by = models.IntegerField(null=True, blank=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return f"FileManager for {self.entity_type} with ID {self.get_entity_id()}"

    # def get_entity(self):
    #     if self.entity_type == 'employee' and self.employee_id:
    #         from .models import Employee
    #         return Employee.objects.get(id=self.employee_id)
    #     elif self.entity_type == 'client' and self.client_id:
    #         from .models import Client
    #         return Client.objects.get(id=self.client_id)
    #     else:
    #         return None

    # def get_entity_id(self):
    #     if self.entity_type == 'employee':
    #         return self.employee_id
    #     elif self.entity_type == 'client':
    #         return self.client_id
    #     return None


# Added by Vinod
class FileManager(models.Model):
    ENTITY_CHOICES = [
        ('employee', 'Employee'),
        ('client', 'Client'),
    ]

    entity_type = models.CharField(max_length=10, choices=ENTITY_CHOICES)
    employee_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    file = models.FileField(upload_to='gallery/%Y/%m/%d/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    file_type = models.CharField(max_length=50, blank=True, null=True)
    uploaded_by = models.IntegerField(null=True, blank=True)
    category_id = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    google_drive_file_url = models.CharField(max_length=1000, blank=True, null=True)
    is_external = models.BooleanField(default=True)

    def __str__(self):
        return f"FileManager for {self.entity_type} with ID {self.get_entity_id()}"

    def get_entity(self):
        if self.entity_type == 'employee' and self.employee_id:
            from .models import Employee
            return Employee.objects.get(id=self.employee_id)
        elif self.entity_type == 'client' and self.client_id:
            from .models import Client
            return Client.objects.get(id=self.client_id)
        else:
            return None

    def get_entity_id(self):
        if self.entity_type == 'employee':
            return self.employee_id
        elif self.entity_type == 'client':
            return self.client_id
        return None


# Added by Vinod
class File_Category(models.Model):
    ENTITY_CHOICES = [
        ('employee', 'Employee'),
        ('client', 'Client'),
    ]
    
    name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    entity_type = models.CharField(max_length=10, choices=ENTITY_CHOICES)
    employee_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    is_external = models.BooleanField(default=True)

    def clean(self):
        if self.entity_type == 'employee':
            if not self.employee_id:
                raise ValidationError('You must provide an employee_id when entity_type is employee.')
            if self.client_id:
                raise ValidationError('client_id should not be provided when entity_type is employee.')
        
        elif self.entity_type == 'client':
            if not self.client_id:
                raise ValidationError('You must provide a client_id when entity_type is client.')
            if self.employee_id:
                raise ValidationError('employee_id should not be provided when entity_type is client.')
        
        else:
            raise ValidationError('Invalid entity_type.')

    def __str__(self):
        return f"FileCategory for {self.entity_type} with ID {self.get_entity_id()} {self.name}"
    
    def get_entity_id(self):
        if self.entity_type == 'employee':
            return self.employee_id
        elif self.entity_type == 'client':
            return self.client_id
        return None

class Airtable(models.Model):
    client_name = models.CharField(max_length=255, blank=True, null=True)
    client_id = models.IntegerField(null=True, blank=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    
    contract_start_date = models.DateField(blank=True, null=True)
    
    twitter_follower_count = models.IntegerField(blank=True, null=True)
    twitter_following_count = models.IntegerField(blank=True, null=True)
    twitter_tweet_count = models.IntegerField(blank=True, null=True)
    twitter_like_count = models.IntegerField(blank=True, null=True)
    twitter_retweet_count = models.IntegerField(blank=True, null=True)
    twitter_reply_count = models.IntegerField(blank=True, null=True)
    twitter_engagement_count = models.IntegerField(blank=True, null=True)
    twitter_engagement_rate = models.FloatField(blank=True, null=True)
    twitter_sent_count = models.IntegerField(blank=True, null=True)
    twitter_posted_count = models.IntegerField(blank=True, null=True)
    
    linkedin_connection_count = models.IntegerField(blank=True, null=True)
    linkedin_follower_count = models.IntegerField(blank=True, null=True)
    linkedin_profile_view_count = models.IntegerField(blank=True, null=True)
    linkedin_profile_search_count = models.IntegerField(blank=True, null=True)
    linkedin_ssi_score = models.FloatField(blank=True, null=True)
    linkedin_post_count = models.IntegerField(blank=True, null=True)
    linkedin_sent_post_count = models.IntegerField(blank=True, null=True)
    linkedin_used_post_count = models.IntegerField(blank=True, null=True)
    linkedin_usage_percentage = models.FloatField(blank=True, null=True)
    linkedin_view_count = models.IntegerField(blank=True, null=True)
    linkedin_views_per_post = models.FloatField(blank=True, null=True)
    linkedin_repost_count = models.IntegerField(blank=True, null=True)
    linkedin_reaction_count = models.IntegerField(blank=True, null=True)
    linkedin_comment_count = models.IntegerField(blank=True, null=True)
    linkedin_engagement_count = models.IntegerField(blank=True, null=True)
    linkedin_engagement_rate = models.FloatField(blank=True, null=True)
    is_external = models.BooleanField(default=True)
    
    reporting_month = models.IntegerField(
        choices=[(i, calendar.month_name[i]) for i in range(1, 13)],
        default=1
    )
    reporting_year = models.IntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    shared_post_count = models.IntegerField(default=0, null=True)
    
    def __str__(self):
        return f"{self.client_name} - {self.company_name}"

class LinkedinPost(models.Model):
    client_id = models.IntegerField(null=True, blank=True)
    airtable_id = models.IntegerField(null=True, blank=True)
    post_count = models.IntegerField(blank=True, null=True)
    post_url = models.URLField(blank=True, null=True)
    post_content = models.TextField(blank=True, null=True)
    view_count = models.IntegerField(default=0, null=True)
    reaction_count = models.IntegerField(default=0, null=True)
    comment_count = models.IntegerField(default=0, null=True)
    repost_count = models.IntegerField(default=0, null=True)
    engagement_rate = models.FloatField(blank=True, null=True)
    published_date = models.DateField(blank=True, null=True)
    tonality = models.CharField(max_length=50, blank=True, null=True)
    topic_1 = models.CharField(max_length=100, blank=True, null=True)
    topic_2 = models.CharField(max_length=100, blank=True, null=True)
    topic_3 = models.CharField(max_length=100, blank=True, null=True)
    # domain = models.TextField(blank=True, null=True)
    domain = ArrayField(models.CharField(max_length=200), blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_external = models.BooleanField(default=True)



class SocialMedia(models.Model):
    topic_name = models.CharField(max_length=255, blank=True, null=True)
    employee_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    company_include = models.CharField(max_length=500, blank=True, null=True)
    domain_source = models.CharField(max_length=500, blank=True, null=True)
    exclude_content = models.CharField(max_length=500, blank=True, null=True)
    exclude_domain = models.CharField(max_length=500, blank=True, null=True)
    top_post_text = models.TextField(blank=True, null=True)
    selected_linkedin_post = models.TextField(blank=True, null=True)
    selected_twitter_post = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    is_external = models.BooleanField(default=True)

    def __str__(self):
        return self.topic_name
