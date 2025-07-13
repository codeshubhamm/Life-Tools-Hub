import requests
import json

def test_analyze():
    url = "http://127.0.0.1:8000/analyze"
    data = {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
    headers = {"Content-Type": "application/json"}
    
    print("Testing analyze endpoint...")
    print(f"URL: {url}")
    print(f"Data: {data}")
    print(f"Headers: {headers}")
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        if response.status_code == 200:
            result = response.json()
            print(f"Video Title: {result.get('title')}")
            print(f"Streams: {len(result.get('streams', []))}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_analyze() 