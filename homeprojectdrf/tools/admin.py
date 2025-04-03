from django.contrib import admin
from . models import Tool
from . models import Feedback

admin.site.register(Tool)

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'create_at')
    list_filter = ('status',)
    search_fields = ('name' , 'email', 'message')
