from django.contrib import admin
from django.urls import path , include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user

#**************************
# from . views import *
#**************************
from . views import ToolViewSet
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
    # *****************************************************************************
    path('admin/', admin.site.urls),
    # path('api/v1/tools/', ToolsAPIList.as_view()),
    # path('api/v1/tools/<int:pk>/', ToolsAPIUpdate.as_view()),
    # path('api/v1/toolsdelete/<int:pk>/', ToolsAPIDestroy.as_view()),
    # ******************************************************************************
    path('auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register_user, name='register'),

]