from django import template
import os

register = template.Library()


@register.filter
def replace_space(value):
    """Replaces spaces with underscores."""
    if value:
        return value.replace(' ', '_')
    return value


@register.filter
def cut(value, arg):
    """Removes all values of arg from the given string"""
    return value.replace(arg, '')


@register.filter
def split(value, arg):
    """Splits the string at the specified argument"""
    print(value, arg, "IMAGE NAME")
    return value.split(arg)


@register.filter
def get_item(dictionary, key):
    """Gets an item from a dictionary"""
    print(dictionary, key, 'CHECK CUSTOM')
    key = key.lower().replace(' ', '_')
    return dictionary.get(key, [])


@register.filter
def get_name(dictionary, key):
    """Fetches a value from a dictionary using a key."""
    if isinstance(dictionary, dict) and key in dictionary:
        return dictionary.get(key, "Unknown")  # Default to "Unknown" if key is missing
    return "Unknown"


@register.filter
def get_filename(file_path):
    """Extracts filename from a given file path."""
    return os.path.basename(file_path)


@register.filter
def clean_filename(file_path):
    """Extracts and cleans the filename by skipping the first two parts split by '_'."""
    filename = os.path.basename(file_path)  # Get the filename
    parts = filename.split("_", 2)  # Split into at most 3 parts
    return parts[-1] if len(parts) > 2 else filename


@register.filter
def clean_filename_without_ext(file_path):
    """Extracts and cleans the filename by skipping the first two parts split by '_', and removes the extension."""
    filename = os.path.basename(file_path)  # Get the filename
    parts = filename.split("_", 2)  # Split into at most 3 parts
    clean_name = parts[-1] if len(parts) > 2 else filename  # Extract relevant part
    return os.path.splitext(clean_name)[0]
