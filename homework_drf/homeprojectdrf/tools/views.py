#from rest_framework.permissions import AllowAny, IsAdminUser

# from . models import Tools
# from django.forms import model_to_dict
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

# from django.shortcuts import render
# from rest_framework.decorators import action
# from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.viewsets import GenericViewSet


#*******************************************
from  . models import Tool
from  . models import Order
from  . models import Detail
from  . models import Operation
from .serializers import ToolSeralizer
from . serializers import OrderSeralizer
from . serializers import DetailSeralizer
from . serializers import OperationSeralizer
from rest_framework import viewsets
#from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from .permissions import  CustomPermission
from rest_framework.decorators import api_view, permission_classes
#from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.db import IntegrityError



#*************************************************************************************
class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSeralizer
    permission_classes = (CustomPermission, )           #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSeralizer
    permission_classes = (CustomPermission, )               #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]filters.SearchFilter
    search_fields = ['__all__']

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSeralizer
    permission_classes = (CustomPermission, )              #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']

class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSeralizer
    permission_classes = (CustomPermission, )             #(AllForAdminOtherReadOnly, )AllowAny
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'Это защищенный эндпоинт'})


@api_view(['POST'])
def register_user(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response(
                {'detail': 'Пожалуйста, укажите имя пользователя и пароль'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {'detail': 'Пользователь успешно создан'},
            status=status.HTTP_201_CREATED
        )

    except IntegrityError:
        return Response(
            {'detail': 'Пользователь с таким именем уже существует'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

