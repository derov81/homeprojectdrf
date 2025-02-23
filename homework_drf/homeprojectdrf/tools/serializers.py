#from pydantic.v1 import BaseModel



#***************************
from  . models import Tool
from  . models import Order
from  . models import Detail
from  . models import Operation
from rest_framework import serializers


#***********************************************************
class ToolSeralizer(serializers.ModelSerializer):

    class Meta:
        model = Tool
        fields = ('__all__')

class OperationSeralizer(serializers.ModelSerializer):

    tool = ToolSeralizer(many=True, read_only=True)

    class Meta:
        model = Operation
        fields = ('__all__')

class DetailSeralizer(serializers.ModelSerializer):

    operation = OperationSeralizer(many=True, read_only=True)

    class Meta:
        model = Detail
        fields = ('__all__')

class OrderSeralizer(serializers.ModelSerializer):

    detail = DetailSeralizer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('__all__')







