#from rest_framework.permissions import AllowAny, IsAdminUser

from  . models import Tool
from  . models import Order
from  . models import Detail
from  . models import Operation
from .serializers import ToolSeralizer
from . serializers import OrderSeralizer
from . serializers import DetailSeralizer
from . serializers import OperationSeralizer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from .permissions import AllForAdminOtherReadOnly, IsAdminOrReadOnly


class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSeralizer
    permission_classes = (IsAuthenticated, IsAdminOrReadOnly)           #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']

# class ToolUpdateViewSet(viewsets.ModelViewSet):
#     queryset = Tool.objects.all()
#     serializer_class = ToolSeralizer
#     permission_classes = (IsAuthenticatedOrReadOnly, )           #(AllForAdminOtherReadOnly, )
#     filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
#     search_fields = ['__all__']


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSeralizer
    permission_classes = (AllForAdminOtherReadOnly, )               #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]filters.SearchFilter
    search_fields = ['__all__']

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSeralizer
    permission_classes = (IsAuthenticatedOrReadOnly, )              #(AllForAdminOtherReadOnly, )
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']

class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSeralizer
    permission_classes = (IsAuthenticatedOrReadOnly, )             #(AllForAdminOtherReadOnly, )AllowAny
    filter_backends = [filters.OrderingFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']
