from . models import Tool
from rest_framework import serializers

class ToolSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('__all__')

