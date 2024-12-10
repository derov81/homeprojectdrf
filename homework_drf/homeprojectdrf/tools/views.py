from . models import Tool
from .serializers import ToolSeralizer
from rest_framework import viewsets
from . permissions import AllForAdminOtherReadOnly
from rest_framework import filters

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSeralizer
    permission_classes = (AllForAdminOtherReadOnly, )
    filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
    search_fields = ['__all__']
