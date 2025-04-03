from  . models import Tool
from rest_framework import serializers
from .models import SliderImage
from django.contrib.auth.models import User
from .models import Feedback

class ToolSeralizer(serializers.ModelSerializer):

    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Tool
        fields = ('__all__')

class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImage
        fields = ['__all__']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'date_joined']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'







