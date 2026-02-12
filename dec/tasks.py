# dec/tasks.py
from django.utils import timezone
from .views import send_buddy_email
from .models import *
from django.utils.timezone import now
import json
from django.db.models import Max
import datetime


def my_daily_task():
    print("my_daily_task is running...")  # Added for testing
    now1 = timezone.now()
    print(f"Daily task executed at: {now1}")
    # ... your task logic ...
    # try:
    # Get all approved leaves with start_date in the future
    today = now().date()
    approved_leaves = leave.objects.filter(status="approved", start_date__gte=today)
    print('Start',approved_leaves)
    if not approved_leaves.exists():
        print("No approved leaves for today or future dates.")
    else:
        print('HELLO2')
        for check_leave in approved_leaves:

            leave_start_date = check_leave.start_date
            days_until_leave = (leave_start_date - today).days
            print('HELLO3',days_until_leave)
            # Only process if today is exactly 30 or 7 days before the leave start date
            if days_until_leave not in [30, 7,10,11,27,28,29]:
                continue

            # employee_detail = employee.objects.get(user_id=request.user.id)

            # Get the latest available month in the client contract work
            latest_date = Client_contract_work.objects.aggregate(Max("date"))["date__max"]

            if latest_date:
                first_day_of_latest_month = latest_date.replace(day=1)
                contracts = Client_contract_work.objects.filter(date__gte=first_day_of_latest_month)

                client_buddy_id = {}

                for contract in contracts:
                    if contract.working_role:
                        working_role = json.loads(contract.working_role)

                        # Check if this employee has role 'C' (Client)
                        if str(check_leave.employee_id) in working_role and working_role[
                            str(check_leave.employee_id)] == "C":
                            # Get all IDs where role is 'B' (Buddy)
                            b_ids = [k for k, v in working_role.items() if v == "B"]

                            if contract.client_id not in client_buddy_id:
                                client_buddy_id[contract.client_id] = {}

                            for b_id in b_ids:
                                client_buddy_id[contract.client_id][int(b_id)] = {
                                    "response_status": "",
                                    "response_date": "",
                                }

                client_buddy_id = {k: v for k, v in client_buddy_id.items() if v}

                # Check if record already exists
                if client_buddy_id:
                    try:
                        buddy_email_ob = Buddy_Email.objects.get(leave_id=check_leave.id)
                    except Exception as e:
                        buddy_email_ob = Buddy_Email.objects.create(
                            leave_id=check_leave.id,
                            employee_id=check_leave.employee_id,
                            client_buddy_record=json.dumps(client_buddy_id),
                            leave_approved_date=now().date()
                        )

                    # Send email only if the record was just created

                    send_buddy_email(client_buddy_id, buddy_email_ob.id, check_leave.id)
                    print(f"Email sent for {check_leave.employee_id} - {days_until_leave} days before leave start.")

            else:
                print("No data available in the date column.")