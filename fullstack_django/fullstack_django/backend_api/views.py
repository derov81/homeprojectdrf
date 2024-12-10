from django.shortcuts import render
from rest_framework.views import APIView
from . models import YouTubeVideo
from . serializer import YouTubeVideoSerializer
from rest_framework.response import Response

class YouTubeVideoView(APIView):
    def get(self, request):
        output = [
            {
                "title" : output.title,
                'channel': output.channel
            }for output in YouTubeVideo.object.all()
        ]
        return Response(output)

    def post(self, request):
        serialize = YouTubeVideoSerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return  Response(serialize.data)