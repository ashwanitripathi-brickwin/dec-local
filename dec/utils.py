from .models import employee,employee_detail,client,project,toggl_user_detail,toggl_project_detail,contracted_hours,Attendance,leave,Holiday,LeaveType,calculation,timeSheet,contracted_employee,Country,Work_Category,Client_contract_work,Client_contract_employee,SalaryHistory,SheetRecord,ShortWorkEmail,Buddy_Email,FileManager

from .models import *
from datetime import timedelta
import random
import string
from django.urls import reverse
import json
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Sum
from django.conf import settings
from django.template.loader import render_to_string

from collections import defaultdict
from django.core.mail import send_mail
from django.db.models import Max
from django.utils.html import strip_tags
import requests

from datetime import datetime, timedelta
from collections import Counter

def adjust_week_counts(result):
    # Identify overlapping weeks
    final_result = {month: len(week_numbers) for month, week_numbers in result.items()}

    for month, weeks in sorted(result.items()):
        previous_month = month - 1
        if previous_month in result:
            overlapping_weeks = result[previous_month] & result[month]  # Common weeks
            if overlapping_weeks:
                final_result[previous_month] -= len(overlapping_weeks)
                final_result[month] = len(result[month])  # Keep count in later month

    return final_result


def calculate_month_weeks(start_date, end_date) -> dict:
    result = {}
    current_date = start_date
    while current_date <= end_date:
        if current_date.weekday() in (0, 1, 2, 3):
            week_number = current_date.strftime('%U')
            month = current_date.month
            if month not in result:
                result[month] = set()
                
            result[month].add(week_number)
        
        current_date += timedelta(days=1)
    
    # final_result = {month: len(week_numbers) for month, week_numbers in result.items()}
    final_result = adjust_week_counts(result)
    return final_result

def calculate_rates_for_employee(request,client_id,current_month,current_year):

    start_date = datetime(current_year, current_month, 1).date()
    print("newwwwwwwwwwwwwwwwwwwww")
    print(client_id)

    # Calculate end date
    if current_month == 12:
        end_date = datetime(current_year, 12, 31).date()
    else:
        end_date = (datetime(current_year, current_month + 1, 1) - timedelta(days=1)).date()
    print(start_date)
    print(end_date)

    toggl_client=client_id
    employee_names = {}
    if current_year == 2023 and 9 <= current_month <= 12:
        employee_details = {}
        #contracted employee images
        if contracted_hours.objects.filter(client_id=toggl_client).exists():
            # Use the contracted_hours model to query the database
            all = contracted_hours.objects.filter(client_id=toggl_client, month__range=(start_date, end_date),month__year=current_year)
            print("rekhaaaa")
            print(all)

            # Check if any records were found
            if all.exists():
                # Access the first record in the QuerySet
                first_record = all.first()

                # Access the 'working_input' attribute
                work_json_str = first_record.working_input

                # Parse the JSON string
                work_dict = json.loads(work_json_str)

                # Fetch employee details including image URL based on employee IDs

                for employee_id, hours in work_dict.items():
                    try:
                        # Assuming Employee model has fields 'employee_id', 'first_name', 'last_name', 'user_name', and 'image_url'
                        employee1 = employee.objects.get(toggl_user_id=int(employee_id))

                        # Check if first name and last name are present, otherwise use username
                        if employee1.first_name and employee1.last_name:
                            employee_name = f"{employee1.first_name} {employee1.last_name}"
                        else:
                            employee_name = employee1.user_name

                        # Get the image URL
                        image_url = employee1.image_url if hasattr(employee1, 'image_url') else "/static/assets/img/client/default-profile-pic.jpg"

                        id=employee1.id
                        # Store employee details
                        employee_details[employee_id] = {'name': employee_name, 'image_url': image_url,'id':id}
                    except employee.DoesNotExist:
                        employee_details[employee_id] = {'name': f"Employee {employee_id} not found", 'image_url': "/static/assets/img/client/default-profile-pic.jpg"}
                #client total time contract
                client_details={}
                total_hours1 = float(first_record.total_working_hours) * 4.3
                print("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                print(total_hours1)

                # Convert total hours to total seconds
                total_seconds1 = int(total_hours1 * 3600)

                # Extracting hours, minutes, and seconds
                hoursss1, remainder1 = divmod(total_seconds1, 3600)
                minutes1, seconds1 = divmod(remainder1, 60)

                # Formatting the time
                formatted_time2 = f"{hoursss1:02d}:{minutes1:02d}:{seconds1:02d}"

                client_details = {'cost': first_record.rate,'total_working_hours':formatted_time2}
                # Print the employee details
                for employee_id, details in employee_details.items():
                    print(f"Employee ID: {employee_id}, Employee Name: {details['name']}, Image URL: {details['image_url']}")
            else:
                print("No records found for the specified client and month.")
        else:
            print("No contracted hours found for the specified client.")

        print(employee_details)


        # for work category below boxes
        project_list = project.objects.filter(toggl_client_id=toggl_client)
        print("project_list1")
        print(project_list)
        # Iterate through the project_list and get toggl_project_id for each project
        toggl_project_ids = [project.toggl_project_id for project in project_list]
        filtered_records = toggl_user_detail.objects.filter(
        project_id__in=toggl_project_ids,
        time_entries_start_date__range=(start_date, end_date)
        )
        print(filtered_records)
        unique_project_ids = filtered_records.values('project_id').distinct()
        print(unique_project_ids)

        # Query the Project table to get names of unique project IDs
        project_names = project.objects.filter(toggl_project_id__in=unique_project_ids)
        print("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
        # Now you can display project names on the UI
        print(project_names)

        #working time on toggl

        # Create a dictionary to store the total time spent per client and project
        total_time_spent = {}
        project_rate = {}

        for record in filtered_records:
            # Fetch project details from toggl_project_detail
            project_id_1 = record.project_id

            # project_id_2 = project.objects.filter(toggl_project_id=project_id_1).first()
            # project_id = project_id_2.id
            time_seconds = record.time_entries_seconds

            if project_id_1:
                client_project_key = int(project_id_1)
                if client_project_key in total_time_spent:
                    total_time_spent[client_project_key] += time_seconds
                else:
                    # If the key doesn't exist, create it
                    total_time_spent[client_project_key] = time_seconds
        # Now, total_time_spent dictionary contains the total time spent per client and project
        # You can iterate through it to display the results
        print("client revenue")
        print(total_time_spent)
        print(project_rate)

        total_time_spent_formatted = {}
        for key, seconds in total_time_spent.items():
            hours, remainder = divmod(seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            total_time_spent_formatted[key] = f"{hours:02d}:{minutes:02d}:{seconds:02d}"

        # Now, total_time_spent_formatted dictionary contains the total time spent per client and project in HH:MM:SS format
        # You can iterate through it to display the results
        # print(total_time_spent_formatted)
        for key, formatted_time in total_time_spent_formatted.items():
            print(f"Project {key}: {formatted_time}")


        #project member images on toggl
        # Initialize an empty dictionary to store project_id and corresponding user_ids
        project_user_dict_1 = {}

        # Iterate through each project_id
        for project_id in toggl_project_ids:
            # Get unique user_id values for the specified project_id
            user_ids = toggl_user_detail.objects.filter(
                project_id=project_id,
                time_entries_start_date__range=(start_date, end_date)
            ).values_list('user_id', flat=True).distinct()

            # Assign the user_ids to the dictionary with project_id as the key
            project_user_dict_1[project_id] = list(user_ids)

        print(project_user_dict_1)

        project_user_dict={}

        for project_id, user_ids in project_user_dict_1.items():
            # Fetch image URLs and full names for each user_id from the Employee model
            employees_data = employee.objects.filter(toggl_user_id__in=user_ids).values('id', 'first_name',
                                                                                        'last_name', 'salary','image_url','user_name').distinct()

            # Update the project_user_dict with image_urls and full names for each project_id
            project_user_dict[project_id] = [

                {'id': data['id'],'salary': float(data['salary']),'image_url': data['image_url'], 'full_name': f"{data['first_name']} {data['last_name']}",'user_name': data['user_name']}
                for data in employees_data]

        print(project_user_dict)

        #employee cost
        total_time_spent_employee = {}
        employee_rate_per_hour = {}

        # Iterate through each project
        for project_id, time_spent in total_time_spent.items():
            # Convert total_time_spent from seconds to hours
            print("new")
            print(project_id)
            print(time_spent)
            time_spent_hours = time_spent / 3600
            total_time_spent_employee[project_id] = str(time_spent_hours)

            # Fetch user salaries for the project
            user_salaries = [user['salary'] for user in project_user_dict.get(project_id, [])]

            print(user_salaries)
            # Calculate total rate for the project based on user salaries
            total_salary = sum(user_salaries)
            working_days_per_month = 22
            hours_per_day = 8
            hourly_rate = total_salary / (working_days_per_month * hours_per_day)

            total_rate = hourly_rate * time_spent_hours

            # Format total_rate to have 2 decimal places
            total_rate_formatted = "{:.2f}".format(total_rate)
            employee_rate_per_hour[project_id] = str(total_rate_formatted)

        # Print the results
        print("total_time_spent_employee:")
        print(total_time_spent_employee)

        print("employee_rate_per_hour:")
        print(employee_rate_per_hour)

        # Initialize a variable to store the sum of rates
        sum_of_rates_employee = 0.0

        # Iterate through the "Project Rate per Hour" dictionary and add up the rates
        for project_id, rate in employee_rate_per_hour.items():
            sum_of_rates_employee += float(rate)

        # Format total_rate to have 2 decimal places
        sum_of_rates_employee = "{:.2f}".format(sum_of_rates_employee)
        # Print the sum of rates
        print("Sum of Rates Employee:", sum_of_rates_employee)



        #client revenue

             # Filter contracted hours for the project and current month
        if contracted_hours.objects.filter(client_id=toggl_client,month__month=current_month,month__year=current_year).exists():
            contracted_hours_for_month = contracted_hours.objects.filter(client_id= toggl_client,month__month=current_month,month__year=current_year)
            first_contracted_hour = contracted_hours_for_month.first()

               # Access the rate attribute if the instance exists, otherwise set project_salary to 100
                # Set project_salary based on conditions
            if first_contracted_hour.rate:

                one_project_rate = first_contracted_hour.rate
            else:one_project_rate=0

        else:
            one_project_rate=0


        print("Sum of Rates Client revenue:", one_project_rate)

        #contracted employee cost
        if contracted_hours.objects.filter(client_id=toggl_client,month__range=(start_date, end_date),month__year=current_year).exists():
            contracted_client = contracted_hours.objects.get(client_id=toggl_client,month__range=(start_date, end_date),month__year=current_year)
            # contracted_client = contracted_hours.objects.get(client_id=client_id1,month=current_month)
            contracted_working_hours_1 = contracted_client.working_input
            print(contracted_working_hours_1)
            contracted_hours_for_project=contracted_client.total_working_hours
            print("contracted")
            print(contracted_hours_for_project)
                # Convert the JSON string to a dictionary
            contracted_working_hours_1_dict1 = json.loads(contracted_working_hours_1)
            print('muksn')
            print(contracted_working_hours_1_dict1)
            contracted_working_hours_1_dict = {key.strip(): value for key, value in contracted_working_hours_1_dict1.items()}
            # Fetch the hourly rate for the user from the Employee table
            employee_ids = list(contracted_working_hours_1_dict.keys())
            print(employee_ids)
            # Fetch hourly rate for each employee
            hourly_rates = {}
            for emp_id in employee_ids:
                try:
                    employee1 = employee.objects.get(toggl_user_id=emp_id)
                    hourly_rates[emp_id] = employee1.salary
                    print("salary")
                    print(hourly_rates[emp_id])

                except employee.DoesNotExist:
                    print(f"Employee with ID {emp_id} not found.")

            # Calculate total salary
            total_salary = sum(hourly_rates[emp_id] for emp_id in employee_ids)
            print(total_salary)

        else:
            contracted_hours_for_project = 0
            total_salary=0

        if contracted_hours_for_project != 0:
            print("calculation")
            print(total_salary)
            print(contracted_hours_for_project)
            hourly_rate1 = float(total_salary) / (22*8)
            print(hourly_rate1)
            hourly_rate=hourly_rate1 * contracted_hours_for_project * 4.3
            print(hourly_rate)


        else:
            hourly_rate = 0
        # Format total_rate to have 2 decimal places
        contracted_sum_of_rates_employee = "{:.2f}".format(hourly_rate)
        # Print the sum of rates
        print("Contracted Sum of Rates Employee:", contracted_sum_of_rates_employee)


        client_category_list={}
        employee_info_dict={}
        category_time_dict={}
        category_cost_dict={}

        category_time_dict_client={}
        employee_data={}
        employee_salary_dict={}
        print("check")
        print(client_id)
        print(sum_of_rates_employee)
        print(contracted_sum_of_rates_employee)
        print(one_project_rate)

        return sum_of_rates_employee,contracted_sum_of_rates_employee,one_project_rate


    else:
        employee_details = {}
        client_details={}
        #contracted employee images
        if Client_contract_work.objects.filter(client_id=client_id,date__year=current_year,date__month=current_month).exists():
                # Use the contracted_hours model to query the database
            all = Client_contract_work.objects.filter(client_id=client_id,date__year=current_year,date__month=current_month)
            print("lllllllllllllllllllllllllllllllll")
            print(all)

            # Check if any records were found
            if all.exists():
                print("ppppppppppppppppppppppppppppppppppppppppppppp")
                # Access the first record in the QuerySet
                first_record = all.first()

                ui_final_cost=first_record.cost

                # Access the 'working_input' attribute
                work_json_str = first_record.working_input

                # Parse the JSON string
                work_dict = json.loads(work_json_str)

                # Access the 'working_role' attribute
                role_json_str = first_record.working_role

                # Parse the JSON string for role information
                role_dict = json.loads(role_json_str)
                print(work_dict)

                # Fetch employee details including image URL based on employee IDs

                for employee_id, hours in work_dict.items():
                    try:
                        print("try")
                        # Assuming Employee model has fields 'employee_id', 'first_name', 'last_name', 'user_name', and 'image_url'
                        employee1 = employee.objects.get(id=int(employee_id))

                        # Check if first name and last name are present, otherwise use username
                        if employee1.first_name and employee1.last_name:
                            employee_name = f"{employee1.first_name} {employee1.last_name}"
                        else:
                            employee_name = employee1.user_name

                        # Get the image URL
                        image_url = employee1.image_url if hasattr(employee1, 'image_url') else "/static/assets/img/client/default-profile-pic.jpg"

                        id=employee1.id
                        salary=employee1.salary
                        # Store employee details
                        # Get the role
                        role = role_dict.get(employee_id, "Unknown")
                        #employee time
                        print(hours)
                        print("week_start")


                        import calendar
                        from datetime import datetime
                        # Calculate the difference between end_date and start_date
                        date_difference = (end_date - start_date).days
                        # Add 1 to the difference in days
                        date_difference += 1
                        print(date_difference)


                        # Get the number of days in that month
                        days_in_month = calendar.monthrange(start_date.year, start_date.month)[1]

                        print(days_in_month)

                        if date_difference==days_in_month:
                            weeks=4.3
                        else:
                            weeks = date_difference / 7

                        total_hours = float(hours)  * weeks


                        print("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                        print("muskannnnnnnnnnnnnnnnnnnnnnnnnn")
                        print(total_hours)

                        # Convert total hours to total seconds
                        total_seconds = int(total_hours * 3600)

                        # Extracting hours, minutes, and seconds
                        hoursss, remainder = divmod(total_seconds, 3600)
                        minutes, seconds = divmod(remainder, 60)

                        # Formatting the time
                        formatted_time = f"{hoursss:02d}:{minutes:02d}:{seconds:02d}"
                        employee_details[int(employee_id)] = {'name': employee_name, 'image_url': image_url,'id':id,'salary':salary,'role': role,'hours_worked':formatted_time}
                    except employee.DoesNotExist:
                        employee_details[int(employee_id)] = {'name': f"Employee {employee_id} not found", 'image_url': "/static/assets/img/client/default-profile-pic.jpg"}
                #client total time contract

                if first_record.total_working_hours:

                    import calendar
                    from datetime import datetime
                    # Calculate the difference between end_date and start_date
                    date_difference = (end_date - start_date).days
                    # Add 1 to the difference in days
                    date_difference += 1
                    print(date_difference)


                    # Get the number of days in that month
                    days_in_month = calendar.monthrange(start_date.year, start_date.month)[1]

                    print(days_in_month)

                    if date_difference==days_in_month:
                        weeks=4.3
                    else:
                        weeks = date_difference / 7


                    total_hours1 = float(first_record.total_working_hours) * weeks
                    ui_total_hours=first_record.total_working_hours
                else:
                    total_hours1 = 0
                    ui_total_hours=0

                # print("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                # print(total_hours1)

                # Convert total hours to total seconds
                total_seconds1 = int(total_hours1 * 3600)

                # Extracting hours, minutes, and seconds
                hoursss1, remainder1 = divmod(total_seconds1, 3600)
                minutes1, seconds1 = divmod(remainder1, 60)

                print("qqqqqqqqqqqqqqqqqqqqqqqqq")
                print(hoursss1)
                print(minutes1)
                print(seconds1)

                import calendar
                from datetime import datetime
                # Calculate the difference between end_date and start_date
                date_difference = (end_date - start_date).days
                # Add 1 to the difference in days
                date_difference += 1
                print(date_difference)


                # Get the number of days in that month
                days_in_month = calendar.monthrange(start_date.year, start_date.month)[1]

                print(days_in_month)

                if date_difference==days_in_month:
                    weeks=4.3
                    cost_new=first_record.cost
                else:
                    weeks = date_difference / 7
                    cost_new = round((first_record.cost * weeks) / 4.3, 2)

                # Formatting the time
                formatted_time2 = f"{hoursss1:02d}:{minutes1:02d}:{seconds1:02d}"
                ui_formatted_time2=formatted_time2
                client_details = {'cost': cost_new,'total_working_hours':formatted_time2}
                # Print the employee details
                for employee_id, details in employee_details.items():
                    print(f"Employee ID: {employee_id}, Employee Name: {details['name']}, Image URL: {details['image_url']}")
            else:
                print("No records found for the specified client and month.")
        else:
            print("No contracted hours found for the specified client.")
        print("ghhh")
        print(employee_details)
        print(client_details)
        unique_category_ids = timeSheet.objects.filter(client_id=client_id,time_entries_start_date__range=(start_date, end_date)).values('category_id').distinct()

        # Prepare a list to store client and category information
        client_category_list = []

        # Iterate over unique category IDs and fetch corresponding category names
        for unique_category_id in unique_category_ids:
            category_id = unique_category_id['category_id']

            # Fetch the corresponding category name from the WorkCategory table
            try:
                category_1 = Work_Category.objects.get(id=category_id)
                category_name = category_1.category

                # Append client and category information to the list
                client_category_list.append({'id': category_id, 'category_name': category_name})

            except Work_Category.DoesNotExist:
                print(f"Category with ID {category_id} does not exist in the WorkCategory table.")


        print(client_category_list)

       # project member of timer
        # Get unique timeSheet entries for a specific client
        unique_timesheet_entries = timeSheet.objects.filter(client_id=client_id,time_entries_start_date__range=(start_date, end_date)).values('category_id', 'employee_id').distinct()

        # Prepare a dictionary to store employee information
        employee_info_dict = {}

        # Iterate over unique timeSheet entries
        for timesheet_entry in unique_timesheet_entries:
            category_id = timesheet_entry['category_id']
            employee_id = timesheet_entry['employee_id']

            # Fetch the employee from the Employee table
            try:
                employee1 = employee.objects.get(id=employee_id)
                employee_name = f"{employee1.first_name} {employee1.last_name}"
                employee_image_url = employee1.image_url
                employee_salary = employee1.salary

                # Check if the category exists in the dictionary, if not, create an entry
                if category_id not in employee_info_dict:
                    employee_info_dict[category_id] = []

                # Append employee information to the dictionary
                employee_info_dict[category_id].append({
                    'id': employee_id,
                    'name': employee_name,
                    'image_url': employee_image_url,
                    'salary':employee_salary
                })

            except employee.DoesNotExist:
                print(f"Employee with ID {employee_id} does not exist in the Employee table.")

        # Now employee_info_dict contains information about employees in each category
        # You can use this dictionary to look up employees based on the category
        print("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        print(employee_info_dict)



        total_time_spent_by_category = timeSheet.objects.filter(client_id=client_id,
                                                        time_entries_start_date__gte=start_date,
                                                        time_entries_stop_date__lte=end_date) \
                                                 .values('category_id') \
                                                 .annotate(total_time=Sum('time_entries_seconds'))

        # Create a dictionary to store category_id and total time spent
        category_time_dict = {}

        # Loop through the results to populate the dictionary
        for entry in total_time_spent_by_category:
            category_id = entry['category_id']
            total_time_spent_seconds = entry['total_time']

            # Convert total_time_spent_seconds to a more readable format
            total_time_spent_hours, remainder = divmod(total_time_spent_seconds, 3600)
            total_time_spent_minutes, total_time_spent_seconds = divmod(remainder, 60)

            # Store the values in the dictionary
            category_time_dict[category_id] = {
                'formatted_time': f"{total_time_spent_hours:02d}:{total_time_spent_minutes:02d}:{total_time_spent_seconds:02d}",
                'total_time_seconds':entry['total_time'],
                'hours': total_time_spent_hours,
                'minutes': total_time_spent_minutes,
                'seconds': total_time_spent_seconds
            }

        # Print or use the category_time_dict as needed
        print(category_time_dict)

        print("kiki")
        total_time_spent_by_client = timeSheet.objects.filter(
        client_id=client_id,
        time_entries_start_date__gte=start_date,  # Filter based on start date
        time_entries_stop_date__lte=end_date     # Filter based on end date
        ).values('client_id', 'employee_id').annotate(total_time=Sum('time_entries_seconds'))
        print(total_time_spent_by_client)
        # Create a dictionary to store category_id and total time spent
        category_time_dict_client = {}

        # Loop through the results to populate the dictionary
        for entry in total_time_spent_by_client:
            employee_id = entry['employee_id']
            client_id = entry['client_id']
            total_time_spent_seconds = entry['total_time']

            # Convert total_time_spent_seconds to a more readable format
            total_time_spent_hours, remainder = divmod(total_time_spent_seconds, 3600)
            total_time_spent_minutes, total_time_spent_seconds = divmod(remainder, 60)

            # Store the values in the dictionary
            category_time_dict_client[employee_id] = {
                'formatted_time': f"{total_time_spent_hours:02d}:{total_time_spent_minutes:02d}:{total_time_spent_seconds:02d}",
                'total_time_seconds':entry['total_time'],
                'client_id':entry['client_id'],
                'hours': total_time_spent_hours,
                'minutes': total_time_spent_minutes,
                'seconds': total_time_spent_seconds
            }
        print("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        print(work_dict)
        for employee_id in work_dict.keys():
            if int(employee_id) not in category_time_dict_client:
                category_time_dict_client[int(employee_id)] = {
                    'formatted_time': '00:00:00',
                    'total_time_seconds': 0,
                    'client_id': '',  # You may set this to appropriate default value
                    'hours': 0,
                    'minutes': 0,
                    'seconds': 0
                }

        # Print or use the category_time_dict as needed
        print("birth")
        print(category_time_dict_client)

        #employee cost in task tab
        # Create a dictionary to store category_id and total cost
        category_cost_dict = {}

        # Iterate over the categories in employee_info_dict
        for category_id, employees in employee_info_dict.items():
            total_salary = 0

            # Calculate total salary for employees in the category
            for employee_info in employees:
                if employee_info['salary']:
                    total_salary += float(employee_info['salary'])  # Convert Decimal to float

            # Calculate cost per hour
            cost_per_hour = total_salary / (22 * 8)

            # Fetch total time spent for the category from category_time_dict
            total_time_seconds = category_time_dict.get(category_id, {}).get('total_time_seconds', 0)

            # Convert Decimal to float for total_cost calculation and round to 2 decimal places
            total_cost = round(float((total_time_seconds / 3600) * cost_per_hour), 2)


            # Store the values in the category_cost_dict
            category_cost_dict[category_id] = {
                'total_cost': total_cost,
                # 'cost_per_hour': cost_per_hour,
                # 'total_time_seconds': total_time_seconds
            }

        # Print or use the category_cost_dict as needed
        print("ppppppppppppppppppppppppppppppppppppppppppppppp")
        print(category_cost_dict)

        #employee cost in client tab   $$$$$$$$$$$$$$$$$$$$$$$$$$
        # Get unique timeSheet entries for a specific client
        timesheets = timeSheet.objects.filter(client_id=client_id,time_entries_start_date__range=(start_date, end_date))

        # Dictionary to store employee IDs and their total time worked
        employee_data = {}
        ui={}
        from decimal import Decimal
        # Calculate total time worked by each employee for the client
        for timesheet1 in timesheets:
            employee_id = timesheet1.employee_id
            time_worked_seconds = timesheet1.time_entries_seconds

            # Update total time worked for the employee
            if employee_id in employee_data:
                employee_data[employee_id]['time_worked'] += time_worked_seconds
            else:
                employee_data[employee_id] = {'time_worked': time_worked_seconds, 'salary': 0}
        for employee_id in work_dict.keys():
            if int(employee_id) not in employee_data:
                employee_data[int(employee_id)] = {'time_worked': 0, 'salary': 0}
        for employee_id in employee_data.keys():
            print(employee_data.keys())
            employee1 = employee.objects.get(id=employee_id)
            print(employee1)
            print(client_id)
            if employee1.salary:
                employee_data[employee_id]['salary'] = employee1.salary
                adjusted_salary = float(employee1.salary) / (22 * 8)
                salary=employee1.salary
            else:
                employee_data[employee_id]['salary']=0
                adjusted_salary = 0
                salary=0

            time_worked_hours = employee_data[employee_id]['time_worked'] / 3600

            if employee1.first_name and employee1.last_name:
                name=employee1.first_name + ' ' + employee1.last_name
            else:
                name=employee1.user_name

            ui[str(employee_id)] = {
                        'ui_employee_name':name,
                        'ui_employee_salary': salary,
                        'ui_working_hours': time_worked_hours
                    }
            # Multiply adjusted salary and time worked
            total_payment = adjusted_salary * time_worked_hours
            total_payment = "{:.2f}".format(total_payment)
            # Update employee_data with total_payment
            employee_data[employee_id]['total_payment'] = total_payment
        print("qqqqqqqqqqqqqqqqqq")
        print(employee_data)


       # end employee cost in client tab $$$$$$$$$$$$$$$$$$
        print("vedansh")
        print(category_cost_dict)


       # Initialize a variable to store the sum of rates
        sum_of_rates_employee = 0.0  # Initialize the variable to store the sum of all costs

        # Iterate over the categories in category_cost_dict
        for category_id, category_cost_info in category_cost_dict.items():
            # Add the total_cost for the current category to the sum
            sum_of_rates_employee += category_cost_info['total_cost']

        # Format the sum_of_rates_employee as a string with two decimal places when printing
        sum_of_rates_employee= "{:.2f}".format(sum_of_rates_employee)

        # Print or use the sum_of_rates_employee_str as needed
        print("Sum of all costs:", sum_of_rates_employee)




        #client revenue
        client_detail = client.objects.get(pk=client_id)
        client_id= client_detail.id
        if Client_contract_work.objects.filter(client_id=client_id,date__month=current_month,date__year=current_year).exists():
        # Filter contracted hours for the project and current month
            contracted_hours_for_month = Client_contract_work.objects.filter(client_id= client_id,date__month=current_month,date__year=current_year
                )
            first_contracted_hour = contracted_hours_for_month.first()


            import calendar
            from datetime import datetime
            # Calculate the difference between end_date and start_date
            date_difference = (end_date - start_date).days
            # Add 1 to the difference in days
            date_difference += 1
            print(date_difference)


            # Get the number of days in that month
            days_in_month = calendar.monthrange(start_date.year, start_date.month)[1]

            print(days_in_month)

            if date_difference==days_in_month:
                weeks=4.3
                one_project_rate=first_contracted_hour.cost
            else:
                weeks = date_difference / 7
                one_project_rate = round((first_contracted_hour.cost * weeks) / 4.3, 2)

            # one_project_rate = first_contracted_hour.cost
        else:
            one_project_rate=0


        print("Sum of Rates Client revenue:", one_project_rate)

        #contracted employee cost

        if Client_contract_work.objects.filter(client_id=client_id,date__month=current_month,date__year=current_year).exists():
            contracted_client = Client_contract_work.objects.get(client_id=client_id,date__year=current_year,date__month=current_month)
            # contracted_client = contracted_hours.objects.get(client_id=client_id1,month=current_month)
            import ast
            from decimal import Decimal

            contracted_working_hours_1_str = contracted_client.working_input
            contracted_working_hours_1 = ast.literal_eval(contracted_working_hours_1_str)
            print(contracted_working_hours_1)

            employee_salary_dict = {}
            ui_data={}
                # Assuming 'working_input' is a dictionary with employee_id as keys
            for employee_id, working_hours in contracted_working_hours_1.items():
                # Fetch the employee from the Employee table
                employee3 = employee.objects.get(id=employee_id)
                # Calculate salary per hour
                ui_employee_salary=float(employee3.salary)
                salary_per_hour = float(employee3.salary) / (22 * 8)
                # Convert working hours to float
                working_hours = float(working_hours)
                ui_working_hours=working_hours
                # Calculate total salary for the given working hours

              
                # Calculate the difference between end_date and start_date
                date_difference = (end_date - start_date).days
                # Add 1 to the difference in days
                date_difference += 1
                print(date_difference)

                if employee3.first_name and employee3.last_name:
                    name=employee3.first_name + ' ' + employee3.last_name
                else:
                    name=employee3.user_name

                ui_data[employee_id] = {
                        'ui_employee_name': name,
                        'ui_employee_salary': employee3.salary,
                        'ui_working_hours': working_hours
                    }
                # Get the number of days in that month
                days_in_month = calendar.monthrange(start_date.year, start_date.month)[1]

                print(days_in_month)

                if date_difference==days_in_month:
                    weeks=4.3
                else:
                    weeks = date_difference / 7

                total_salary = salary_per_hour * working_hours *weeks
                total_salary  = "{:.2f}".format(total_salary )
                # Store the total salary in the dictionary
                employee_salary_dict[int(employee_id)] = total_salary


            print("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
            print(employee_salary_dict)

        contracted_sum_of_rates_employee=0.0
        # Convert all values in employee_salary_dict to float
        employee_salary_dict = {k: float(v) for k, v in employee_salary_dict.items()}

        # Sum the values in employee_salary_dict
        contracted_sum_of_rates_employee = sum(employee_salary_dict.values())
        contracted_sum_of_rates_employee = "{:.2f}".format(contracted_sum_of_rates_employee)
        print("Total contracted sum of rates for employees:", contracted_sum_of_rates_employee)


        total_time_spent_formatted={}
        project_names={}
        project_user_dict={}
        employee_rate_per_hour={}


        return sum_of_rates_employee,contracted_sum_of_rates_employee,one_project_rate


def calculate_rates(request):

    selected_month = request.session.get('month')

    if selected_month:
        # current_month = datetime.strptime(selected_month, "%B").month
        current_month = int(selected_month)
    else:
        current_month = 2

    if current_month ==1:
        last_month=12
    else:
        last_month=current_month-1
    print("ssssssssssssssssssssssssssssssssssssss")
    print(current_month)
    print(last_month)

    selected_year = request.session.get('year')

    if selected_year:
        # current_month = datetime.strptime(selected_month, "%B").month
        current_year = int(selected_year)
    else:
        current_year = 2026

    if current_month ==1:
        last_year=current_year-1
    else:
        last_year=current_year

    print("gggggggggggggggggggggggggggggggggggggg")
    print(current_year)
    print(last_year)

    print("newwwwwwwwwwwwww11111111111111111")

    if current_year == 2023 and 9 <= current_month <= 12:
        client_ids_for_current_month = contracted_hours.objects.filter(
        month__month=current_month,
        month__year=current_year
        ).values_list('client_id', flat=True).distinct()

    else:

        client_ids_for_current_month = Client_contract_work.objects.filter(
        date__month=current_month,
        date__year=current_year
        ).values_list('client_id', flat=True).distinct()

    print("newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")

    print(client_ids_for_current_month)

    if last_year == 2023 and 9 <= last_month <= 12:
        client_ids_for_last_month = contracted_hours.objects.filter(
        month__month=last_month,
        month__year=last_year
        ).values_list('client_id', flat=True).distinct()

    else:

        client_ids_for_last_month = Client_contract_work.objects.filter(
        date__month=last_month,
        date__year=last_year
        ).values_list('client_id', flat=True).distinct()

    print("newwwwwlastmonthhhhhhhhhhhhhhhhhhh")
    print(client_ids_for_last_month)

    # Initialize as floats
    sum_of_rates_all_employee = 0.0
    sum_of_contracted_rates_all_employee = 0.0
    sum_one_project_rate=0.0

     # Initialize variables for previous month
    sum_of_all_employee_rates_previous = 0.0
    sum_of_contracted_rates_all_employee_previous = 0.0
    sum_one_project_rate_previous = 0.0

    # Iterate through all clients and calculate rates for each client
    for client_id in client_ids_for_current_month :
        sum_of_rates_employee, contracted_sum_of_rates_employee,one_project_rate = calculate_rates_for_employee(request, client_id,current_month,current_year)

         # Ensure that sum_of_rates_client is a float
        try:
            sum_of_rates_employee = float(sum_of_rates_employee)
            contracted_sum_of_rates_employee=float(contracted_sum_of_rates_employee)
            one_project_rate=float(one_project_rate)

        except ValueError:
            # Handle the case where sum_of_rates_client cannot be converted to a float
            print("Error: Unable to convert sum_of_rates_client to float")
        # Accumulate the values
        sum_of_rates_all_employee += sum_of_rates_employee
        sum_of_contracted_rates_all_employee += contracted_sum_of_rates_employee
        sum_one_project_rate += one_project_rate

    for client_id in client_ids_for_last_month :
        # Calculate rates for the previous month
        sum_of_rates_employee_prev, contracted_sum_of_rates_employee_prev, one_project_rate_prev = calculate_rates_for_employee(request, client_id, last_month,last_year)
        try:
            sum_of_all_employee_rates_previous += float(sum_of_rates_employee_prev)
            sum_of_contracted_rates_all_employee_previous += float(contracted_sum_of_rates_employee_prev)
            sum_one_project_rate_previous += float(one_project_rate_prev)
        except ValueError:
            # Handle the case where sum_of_rates_client cannot be converted to a float
            print("Error: Unable to convert sum_of_rates_client to float")


    # Format the total sum of employee cost and contracted employee cost
    formatted_sum_of_employee_cost_current = "{:.2f}".format(sum_of_rates_all_employee)
    formatted_sum_of_contracted_employee_cost_current = "{:.2f}".format(sum_of_contracted_rates_all_employee)
    formatted_sum_one_project_rate_current="{:.2f}".format(sum_one_project_rate)

    # Format the total sums for the previous month
    formatted_sum_of_employee_cost_previous = "{:.2f}".format(sum_of_all_employee_rates_previous)
    formatted_sum_of_contracted_employee_cost_previous = "{:.2f}".format(sum_of_contracted_rates_all_employee_previous)
    formatted_sum_one_project_rate_previous = "{:.2f}".format(sum_one_project_rate_previous)


    # Print or return the results, depending on your requirements
    print("\nCurrent Month:")
    print("Sum of Employee Cost:", formatted_sum_of_employee_cost_current)
    print("Sum of Contracted Employee Cost:", formatted_sum_of_contracted_employee_cost_current)
    print("Sum of Client Cost:", formatted_sum_one_project_rate_current)

    print("\nPrevious Month:")
    print("Sum of Employee Cost:", formatted_sum_of_employee_cost_previous)
    print("Sum of Contracted Employee Cost:", formatted_sum_of_contracted_employee_cost_previous)
    print("Sum of Client Cost:", formatted_sum_one_project_rate_previous)


    # Return the formatted sums
    # return formatted_sum_of_employee_cost, formatted_sum_of_contracted_employee_cost, formatted_sum_one_project_rate
    return (
        formatted_sum_of_employee_cost_current,
        formatted_sum_of_contracted_employee_cost_current,
        formatted_sum_one_project_rate_current,
        formatted_sum_of_employee_cost_previous,
        formatted_sum_of_contracted_employee_cost_previous,
        formatted_sum_one_project_rate_previous
    )


def send_leave_approval_email(leave_obj):
    emp_ob = employee.objects.get(id=leave_obj.employee_id)
    subject = f"{emp_ob.first_name} Leave Request Approval Needed ({leave_obj.start_date} - {leave_obj.end_date})"
    to_email = ["ekirk@educatedc.com"]
    user_email = "ekirk@educatedc.com"
    approve_url = settings.BASE_URL + reverse('update_leave_status') + f'?leave_id={leave_obj.id}&leave_status=approved&user_email={user_email}'
    decline_url = settings.BASE_URL + reverse('update_leave_status') + f'?leave_id={leave_obj.id}&leave_status=declined&user_email={user_email}'
    leave_type_ob = LeaveType.objects.get(id = leave_obj.leave_type_id)
    context = {
        'employee_name': f"{emp_ob.first_name} {emp_ob.last_name}",
        'start_date': leave_obj.start_date,
        'end_date': leave_obj.end_date,
        'leave_type':leave_type_ob.name,
        'approve_url': approve_url,
        'decline_url': decline_url,
        'logo_url': 'https://dec.educatedapp.com/static/assets/img/EC_Logo_Black.png',  # Or use static()
    }
    html_content = render_to_string('email_leave_request.html', context)

   
    text_content = strip_tags(html_content)

    # msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    # msg.attach_alternative(html_content, "text/html")
    # msg.send()
    send_mail(
        subject,
        text_content,  # Plain text version
        "developers@brickwin.com",  # Sender email
        to_email,
        fail_silently=False,
        html_message=html_content  # Send HTML version
    )


def send_buddy_email(client_buddy_id, buddy_email_ob_id, leave_id):
    email_count = 0
    print("Starting email process...")

    # Group clients by buddy
    buddy_clients_map = defaultdict(list)

    for client_id, buddies in client_buddy_id.items():
        for buddy_id in buddies:
            buddy_clients_map[buddy_id].append(client_id)
    print(buddy_clients_map, 'MAP')
    for buddy_id, client_ids in buddy_clients_map.items():
        try:
            emp_ob = employee.objects.get(id=int(buddy_id))
            leave_ob = leave.objects.get(id=leave_id)
            leave_start_date = leave_ob.start_date
            leave_end_date = leave_ob.end_date

            buddy_name = emp_ob.first_name
            # buddy_email = emp_ob.email  # Ensure the email is coming from DB
            buddy_email = "jagrawal@educatedc.com"  # Temporary email for testing

            # Build client-specific details
            client_data = []

            for client_id in client_ids:
                try:
                    client_ob = client.objects.get(id=client_id)
                    client_name = client_ob.client_name
                    yes_link = f"{settings.BASE_URL}{reverse('update_response', args=[buddy_email_ob_id, buddy_id, client_id, 'yes'])}"
                    no_link = f"{settings.BASE_URL}{reverse('update_response', args=[buddy_email_ob_id, buddy_id, client_id, 'no'])}"
                    try:
                        latest_date = Client_contract_work.objects.aggregate(Max("date"))["date__max"]

                        if latest_date:
                            first_day_of_latest_month = latest_date.replace(day=1)
                            print(latest_date, first_day_of_latest_month)
                            # Filter contracts from the latest available month
                            contracts = Client_contract_work.objects.get(date__gte=first_day_of_latest_month,
                                                                         client_id=client_id)
                            if contracts.working_role:
                                working_role = json.loads(contracts.working_role)  # Parse JSON data
                                ids_with_role_advisor = [key for key, value in working_role.items() if value == "A"]
                                print(ids_with_role_advisor)
                                advisor_ob = employee.objects.get(id=int(ids_with_role_advisor[0]))
                                advisor_name = advisor_ob.first_name + " " + advisor_ob.last_name
                    except Exception as e:
                        advisor_name = ''

                    client_data.append({
                        "client_name": client_name,
                        "advisor_name": advisor_name,
                        "yes_link": yes_link,
                        "no_link": no_link
                    })
                except client.DoesNotExist:
                    print(f"Client ID {client_id} does not exist.")
                    continue  # Skip this client and continue

            if not client_data:
                continue  # Skip sending email if no valid clients

            # Email subject
            email_subject = f"Client Assignment ({leave_start_date} - {leave_end_date})"

            buddy_email_object = Buddy_Email.objects.get(id=int(buddy_email_ob_id))
            emp_on_leave_ob = employee.objects.get(id=buddy_email_object.employee_id)
            emp_on_leave = emp_on_leave_ob.first_name + ' ' + emp_on_leave_ob.last_name

            # Render email template with multiple clients
            email_html_body = render_to_string("email_template.html", {
                "buddy_name": buddy_name,
                "leave_start_date": leave_start_date,
                "leave_end_date": leave_end_date,
                "client_data": client_data,  # Pass multiple clients
                "emp_on_leave": emp_on_leave
            })

            # Strip HTML tags for plain text version
            email_plain_body = strip_tags(email_html_body)

            # Send email
            send_mail(
                email_subject,
                email_plain_body,  # Plain text version
                "developers@brickwin.com",  # Sender email
                [buddy_email],
                fail_silently=False,
                html_message=email_html_body  # Send HTML version
            )

            print(f"Email sent to {buddy_email}")
            email_count += 1  # Increase count after sending email

        except employee.DoesNotExist:
            print(f"Employee ID {buddy_id} does not exist.")
        except Exception as e:
            print(f"Error sending email: {e}")

    print(f"Total emails sent: {email_count}")



def get_clients_with_role_c(employee_id):
    # Get the latest date from the Client_contract_work table
    latest_date = Client_contract_work.objects.aggregate(Max("date"))["date__max"]

    if latest_date:
        first_day_of_latest_month = latest_date.replace(day=1)

        # Filter contracts from the latest available month
        contracts = Client_contract_work.objects.filter(date__gte=first_day_of_latest_month)

        client_ids = []

        for contract in contracts:
            if contract.working_role:
                working_role = json.loads(contract.working_role)  # Convert JSON string to dict

                # Check if the given employee_id exists and has role 'C'
                if str(employee_id) in working_role and working_role[str(employee_id)] == "C":
                    client_ids.append(contract.client_id)  # Store client_id
    return list(set(client_ids))



def get_clients_with_role_a(employee_id):
    # Get the latest date from the Client_contract_work table
    latest_date = Client_contract_work.objects.aggregate(Max("date"))["date__max"]

    if latest_date:
        first_day_of_latest_month = latest_date.replace(day=1)

        # Filter contracts from the latest available month
        contracts = Client_contract_work.objects.filter(date__gte=first_day_of_latest_month)

        client_ids = []

        for contract in contracts:
            if contract.working_role:
                working_role = json.loads(contract.working_role)  # Convert JSON string to dict

                # Check if the given employee_id exists and has role 'C'
                if str(employee_id) in working_role and working_role[str(employee_id)] == "A":
                    client_ids.append(contract.client_id)  # Store client_id
    return list(set(client_ids))


def get_clients_with_role_b(employee_id):
    # Get the latest date from the Client_contract_work table
    latest_date = Client_contract_work.objects.aggregate(Max("date"))["date__max"]

    if latest_date:
        first_day_of_latest_month = latest_date.replace(day=1)

        # Filter contracts from the latest available month
        contracts = Client_contract_work.objects.filter(date__gte=first_day_of_latest_month)

        client_ids = []

        for contract in contracts:
            if contract.working_role:
                working_role = json.loads(contract.working_role)  # Convert JSON string to dict

                # Check if the given employee_id exists and has role 'C'
                if str(employee_id) in working_role and working_role[str(employee_id)] == "B":
                    client_ids.append(contract.client_id)  # Store client_id
    return list(set(client_ids))



def revoke_access_token(access_token):

    """
    Revokes the access token granted to the application.
    """
    url = 'https://oauth2.googleapis.com/revoke'
    params = {'token': access_token}
    response = requests.post(url, params=params)
    if response.status_code == 200:
        print('Access token revoked successfully.')
        return True
    else:
        print('Failed to revoke access token.')
        return False

def get_week_of_month(date):
    import calendar
    year, month = date.year, date.month
    month_calendar = calendar.monthcalendar(year, month)

    for i, week in enumerate(month_calendar):
        if date.day in week:
            return i + 1  # 1-based calendar week




def get_weekly_heatmap_data(client_id):
    posts = LinkedinPost.objects.filter(client_id=client_id)
    matrix = [[{'likes': 0, 'shares': 0, 'comments': 0, 'total': 0, 'count': 0} for _ in range(5)] for _ in range(7)]

    for post in posts:
        date = post.published_date
        if not date:
            continue
        week = get_week_of_month(date) - 1
        print('week ',week)
        print(week)
        print(date)
        day = date.weekday()
        print('day')
        print(post.engagement_rate)
        if 0 <= week < 5 and 0 <= day < 7:
            cell = matrix[day][week]
            cell['likes'] += post.reaction_count or 0
            cell['shares'] += post.repost_count or 0
            cell['comments'] += post.comment_count or 0
            cell['total'] += post.engagement_rate or 0
            cell['count'] += 1

    # for y in range(7):
    #     for x in range(5):
    #         cell = matrix[y][x]
    #         if cell['count']:
    #             cell['total'] = round(cell['total'] / cell['count'], 2)

    return matrix
