import requests
import json

def test_download():
    url = "http://127.0.0.1:8000/download"
    data = {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "itag": "18"}
    headers = {"Content-Type": "application/json"}
    
    print("Testing download endpoint...")
    print(f"URL: {url}")
    print(f"Data: {data}")
    print(f"Headers: {headers}")
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Content-Length: {response.headers.get('content-length')}")
        
        if response.status_code == 200:
            print("Download successful!")
            # Save the file to test
            with open("test_video.mp4", "wb") as f:
                f.write(response.content)
            print("Video saved as test_video.mp4")
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_download() 