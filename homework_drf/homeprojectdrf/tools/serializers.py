from  . models import Tool
from rest_framework import serializers

class ToolSeralizer(serializers.ModelSerializer):

    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Tool
        fields = ('__all__')








