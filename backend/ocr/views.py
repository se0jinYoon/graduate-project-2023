import json
import base64
import requests
from django.http import JsonResponse

def run_ocr(request) :
    with open("/media/post_images/test3.jpeg", "rb") as f:
        img = base64.b64encode(f.read())

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
        "requestId": "string", # 요청을 구분하기 위한 ID, 사용자가 정의
        "timestamp": 0, # 현재 시간값
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

    print(res)
    return res