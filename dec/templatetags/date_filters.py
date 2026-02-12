from django import template
from datetime import timedelta

register = template.Library()

def is_weekday(day):
    # Returns True if the day is a weekday (Monday is 0, Sunday is 6)
    return day.weekday() < 4

@register.filter
def calculate_days(end_date, start_date):
    if not start_date or not end_date:
        # If either date is missing, return a default value
        return 0.5 if not end_date else 0
    
    # Initialize the count of weekdays
    workdays = 0
    current_date = start_date
    while current_date <= end_date:
        if is_weekday(current_date):
            workdays += 1
        current_date += timedelta(days=1)
    return workdays