import subprocess
import tempfile
import os

def test_yt_dlp_download():
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    print("Testing yt-dlp download...")
    print(f"URL: {url}")
    
    with tempfile.TemporaryDirectory() as tmpdir:
        print(f"Temporary directory: {tmpdir}")
        
        cmd = [
            "python", "-m", "yt_dlp",
            "-f", "18",
            "-o", os.path.join(tmpdir, "%(title)s.%(ext)s"),
            "--no-playlist",
            url
        ]
        
        print(f"Running command: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            print(f"Return code: {result.returncode}")
            print(f"Stdout: {result.stdout}")
            print(f"Stderr: {result.stderr}")
            
            if result.returncode == 0:
                files = os.listdir(tmpdir)
                print(f"Files in temp dir: {files}")
                if files:
                    print("Download successful!")
                else:
                    print("No files found after download")
            else:
                print("Download failed")
                
        except subprocess.TimeoutExpired:
            print("Download timed out")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    test_yt_dlp_download() 