from django.contrib import admin
from .models import *
# Register your models here.

class ShowAllFieldsAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in self.model._meta.fields]
admin.site.register(employee,ShowAllFieldsAdmin)
admin.site.register(employee_detail)
admin.site.register(employee_salary)
admin.site.register(client,ShowAllFieldsAdmin)
admin.site.register(client_detail,ShowAllFieldsAdmin)
admin.site.register(client_payment)
admin.site.register(project,ShowAllFieldsAdmin)
admin.site.register(employee_project,ShowAllFieldsAdmin)
admin.site.register(time_tracking)
admin.site.register(leave,ShowAllFieldsAdmin)
admin.site.register(user_login)
admin.site.register(toggl_user)
admin.site.register(toggl_user_detail)
admin.site.register(toggl_project)
admin.site.register(toggl_project_detail)
admin.site.register(toggl_client)
admin.site.register(ShortWorkEmail)
admin.site.register(Holiday)
admin.site.register(Buddy_Email)
admin.site.register(FileManager)
admin.site.register(File_Category)
admin.site.register(SocialMedia)

admin.site.register(LeaveType)


class Client_Country_Admin(admin.ModelAdmin):
    search_fields = ['name']
admin.site.register(Country,Client_Country_Admin)

class Client_contract_workAdmin(admin.ModelAdmin):
    search_fields = ['client_id']


admin.site.register(Client_contract_work,Client_contract_workAdmin)
class timeSheetAdmin(admin.ModelAdmin):
    search_fields = ['employee_id', 'client_id', 'description']


admin.site.register(timeSheet, timeSheetAdmin)

class Work_CategoryAdmin(admin.ModelAdmin):
    search_fields = ['id', 'category']


admin.site.register(Work_Category, Work_CategoryAdmin)