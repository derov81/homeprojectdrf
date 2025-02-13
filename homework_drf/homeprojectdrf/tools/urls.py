from django.urls import path , include
from rest_framework import routers
from . views import ToolViewSet
#from  . views import ToolUpdateViewSet
from  . views import OrderViewSet
from . views import DetailViewSet
from . views import OperationViewSet

router = routers.DefaultRouter()
router.register('tools', ToolViewSet)
router.register('orders', OrderViewSet)
router.register('details', DetailViewSet)
router.register('operations', OperationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls'))
]