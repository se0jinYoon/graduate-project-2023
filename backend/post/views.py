from .serializers import PostSerializer
from .serializers import CardDataSerializer
from .models import Post
from .models import CardData
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

import json
import base64
import requests
from django.http import JsonResponse

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        print(request.data)
        pk = kwargs.get('pk')  # URL에서 pk 값을 가져옴
        if pk:
            try:
                card_data = CardData.objects.get(pk=pk)
                serializer = CardDataSerializer(card_data)
                return Response(serializer.data)
            except CardData.DoesNotExist:
                return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            cardDatas = CardData.objects.all()
            serializer = CardDataSerializer(cardDatas, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_data = json.loads(request.data.get('user'))
        user_instance = User.objects.get(pk=user_data['user_id'])
        request.data['user'] = user_instance.id
        
        posts_serializer = PostSerializer(data=request.data)
        print(request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            
            image_data = request.data.get('image')
            ocr_result = self.run_ocr(image_data)
            ocr_result['user'] = user_instance

            # post 필드에 Post 인스턴스 설정
            ocr_result['content'] = posts_serializer.instance.content
            ocr_result['category'] = posts_serializer.instance.category

            card_data_instance, is_created = CardData.objects.get_or_create(**ocr_result)
            card_data_serializer = CardDataSerializer(card_data_instance)
            print(card_data_instance)

            return Response(card_data_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, *args, **kwargs):
        try:
            card_data_instance = CardData.objects.get(pk=pk)
            print(request.data)
        except CardData.DoesNotExist:
            return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CardDataSerializer(card_data_instance, data=request.data)
        
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # 네이버 OCR로 post 보내기
    def run_ocr(self,image_data):
        img = base64.b64encode(image_data.read())

        # 본인의 APIGW Invoke URL로 치환
        URL = "https://lo2k6f5615.apigw.ntruss.com/custom/v1/25430/ff06a5c14f1cc1ccf2cb1d3e99ded2303b138813b29b879bccefe62a7b8cc72c/document/name-card"
        # 본인의 Secret Key로 치환
        KEY = "WnNFbEJ3VUNOSFF1REdOQldqS2NiSGRJT3ZBeGVuV3Q="

        headers = {
            "Content-Type": "application/json",
            "X-OCR-SECRET": KEY
        }

        data = {
            "version": "V2",
            "requestId": "string",  # 요청을 구분하기 위한 ID, 사용자가 정의
            "timestamp": 0,  # 현재 시간값
            "images": [
                {
                    "name": "test1",
                    "format": "jpeg",
                    "data": img.decode('utf-8')
                }
            ]
        }

        data = json.dumps(data)
        response = requests.post(URL, data=data, headers=headers)
        res = json.loads(response.text)

        #  데이터에서 텍스트 필드만 가져오기
        result = res["images"][0]["nameCard"]["result"]
        dataTagList = list(result.keys())

        dataContentDic = {}

        for tag in dataTagList :
            if (len(result[tag])==1) :
                dataContentDic[tag] = result[tag][0]['text']
            else :
                for content in result[tag] :
                    if dataContentDic.get(tag) == None :
                        dataContentDic[tag] = content['text']
                    else :
                        dataContentDic[tag] = dataContentDic[tag] + ' ' + content['text']

        # print(dataContentDic)
        return dataContentDic

class CardDataView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user')
        if user_id:
            try:
                card_data = CardData.objects.filter(user=user_id)
                serializer = CardDataSerializer(card_data, many=True)
                return Response(serializer.data)
            except CardData.DoesNotExist:
                return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            cardDatas = CardData.objects.all()
            serializer = CardDataSerializer(cardDatas, many=True)
            return Response(serializer.data)


