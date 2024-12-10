from django.urls import path , include
from rest_framework import routers
from . views import ToolViewSet

router = routers.DefaultRouter()
router.register('tools', ToolViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls'))
]