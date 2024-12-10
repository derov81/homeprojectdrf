
from . models import Car
from rest_framework import generics
from .serializers import CarSeralizer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from . permissions import AllForAdminOtherReadOnly
from rest_framework import filters



class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSeralizer
    permission_classes = (AllForAdminOtherReadOnly, )
    filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
    search_fields = ['brand', 'mark', 'yers']



