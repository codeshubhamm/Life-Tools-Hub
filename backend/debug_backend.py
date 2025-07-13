import requests
import json

def test_backend():
    base_url = "http://127.0.0.1:8000"
    
    # Test analyze endpoint
    print("=== Testing Analyze Endpoint ===")
    analyze_data = {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
    try:
        response = requests.post(f"{base_url}/analyze", json=analyze_data, timeout=30)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Video title: {data.get('title')}")
            print(f"Available streams: {len(data.get('streams', []))}")
            
            # Test download with first stream
            if data.get('streams'):
                first_stream = data['streams'][0]
                print(f"\n=== Testing Download with stream {first_stream} ===")
                
                download_data = {
                    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "itag": first_stream['itag']
                }
                
                download_response = requests.post(f"{base_url}/download", json=download_data, timeout=60)
                print(f"Download Status: {download_response.status_code}")
                print(f"Download Content-Type: {download_response.headers.get('content-type')}")
                print(f"Download Content-Length: {download_response.headers.get('content-length')}")
                
                if download_response.status_code == 200:
                    print("Download successful!")
                    # Save a small sample to test
                    with open("test_download.mp4", "wb") as f:
                        f.write(download_response.content[:1024])  # First 1KB
                    print("Saved first 1KB to test_download.mp4")
                else:
                    print(f"Download failed: {download_response.text}")
        else:
            print(f"Analyze failed: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_backend() 