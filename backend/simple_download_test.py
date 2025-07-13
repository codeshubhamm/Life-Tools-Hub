import requests

def test_download():
    url = "http://127.0.0.1:8000/download"
    data = {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "itag": "18"}
    
    print("Testing download endpoint...")
    
    try:
        response = requests.post(url, json=data, stream=True)
        print(f"Status: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Content-Length: {response.headers.get('content-length')}")
        print(f"Content-Disposition: {response.headers.get('content-disposition')}")
        
        if response.status_code == 200:
            # Read first 1KB to check if it's a valid file
            chunk = response.raw.read(1024)
            print(f"First 1KB size: {len(chunk)} bytes")
            print(f"First few bytes: {chunk[:20]}")
            
            # Check if it looks like an MP4 file (should start with specific bytes)
            if chunk.startswith(b'\x00\x00\x00') or b'mp4' in chunk[:20]:
                print("✅ Looks like a valid MP4 file!")
            else:
                print("❌ Doesn't look like a valid MP4 file")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_download() 