import os
import shutil
import tempfile
import subprocess
import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel
try:
    from backend.pdf_tools import router as pdf_tools_router
except ImportError:
    from .pdf_tools import router as pdf_tools_router

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_tools_router, prefix="/api")

class DownloadRequest(BaseModel):
    url: str
    itag: str

class AnalyzeRequest(BaseModel):
    url: str

@app.post("/analyze")
async def analyze_video(req: AnalyzeRequest):
    print(f"Received analyze request for URL: {req.url}")
    url = req.url
    if not url:
        print("Error: Missing URL")
        return JSONResponse(status_code=400, content={"error": "Missing URL"})
    try:
        print(f"Getting video info for: {url}")
        # Use yt-dlp to get video info
        cmd = [
            "python", "-m", "yt_dlp",
            "--dump-json",
            "--no-playlist",
            url
        ]
        print(f"Running command: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        
        if result.returncode != 0:
            print(f"yt-dlp error: {result.stderr}")
            return JSONResponse(status_code=500, content={"error": f"Failed to get video info: {result.stderr}"})
        
        video_data = json.loads(result.stdout)
        print(f"Video title: {video_data.get('title', 'Unknown')}")
        
        # Only allow these standard resolutions
        allowed_resolutions = {"256x144": "144p", "426x240": "240p", "640x360": "360p", "854x480": "480p", "1280x720": "720p", "1920x1080": "1080p"}
        formats = video_data.get('formats', [])
        stream_list = []
        for fmt in formats:
            res = fmt.get('resolution', '')
            if (
                fmt.get('ext') == 'mp4' and
                fmt.get('vcodec') != 'none' and
                fmt.get('acodec') != 'none' and
                res in allowed_resolutions
            ):
                stream_list.append({
                    "itag": fmt.get('format_id'),
                    "quality": allowed_resolutions[res],
                    "type": f"video/{fmt.get('ext', 'mp4')}",
                    "filesize": fmt.get('filesize', 0),
                })
        # Sort by quality (lowest to highest)
        order = ["144p", "240p", "360p", "480p", "720p", "1080p"]
        stream_list.sort(key=lambda x: order.index(x['quality']) if x['quality'] in order else 99)
        print(f"Found {len(stream_list)} streams")
        if not stream_list:
            print("Error: No suitable video stream found")
            return JSONResponse(status_code=404, content={"error": "No suitable video stream found."})
        result = {
            "title": video_data.get('title', 'Unknown'),
            "thumbnail": video_data.get('thumbnail', ''),
            "streams": stream_list
        }
        print(f"Returning result with {len(stream_list)} streams")
        return result
    except subprocess.TimeoutExpired:
        print("Error: Request timed out")
        return JSONResponse(status_code=408, content={"error": "Request timed out"})
    except Exception as e:
        print(f"Error analyzing video: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/download")
async def download_video(req: DownloadRequest):
    print(f"Received download request for URL: {req.url}, itag: {req.itag}")
    url = req.url
    itag = req.itag
    if not url or not itag:
        print("Error: Missing URL or itag")
        return JSONResponse(status_code=400, content={"error": "Missing URL or itag"})
    try:
        print(f"Downloading video: {url} with format: {itag}")
        with tempfile.TemporaryDirectory() as tmpdir:
            print(f"Downloading to temporary directory: {tmpdir}")
            cmd = [
                "python", "-m", "yt_dlp",
                "-f", str(itag),
                "-o", os.path.join(tmpdir, "%(title)s.%(ext)s"),
                "--no-playlist",
                url
            ]
            print(f"Running command: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            if result.returncode != 0:
                print(f"yt-dlp download error: {result.stderr}")
                return JSONResponse(status_code=500, content={"error": f"Failed to download video: {result.stderr}"})
            files = os.listdir(tmpdir)
            if not files:
                print("Error: No file downloaded")
                return JSONResponse(status_code=500, content={"error": "No file was downloaded"})
            video_file = files[0]
            video_path = os.path.join(tmpdir, video_file)
            print(f"Download complete: {video_file}")
            
            # Copy file to a persistent location
            persistent_path = os.path.join(os.getcwd(), "downloads", video_file)
            os.makedirs(os.path.dirname(persistent_path), exist_ok=True)
            shutil.copy2(video_path, persistent_path)
            print(f"Copied to persistent location: {persistent_path}")
            
            import urllib.parse
            
            # Handle filename encoding for non-ASCII characters
            filename_ascii = video_file.encode('ascii', 'ignore').decode('ascii') or 'video.mp4'
            filename_utf8 = urllib.parse.quote(video_file)
            content_disposition = f"attachment; filename=\"{filename_ascii}\"; filename*=UTF-8''{filename_utf8}"
            
            def iterfile():
                try:
                    with open(persistent_path, "rb") as f:
                        while True:
                            chunk = f.read(8192)  # Read in 8KB chunks
                            if not chunk:
                                break
                            yield chunk
                except Exception as e:
                    print(f"Error streaming file: {e}")
                    yield b""
                finally:
                    # Clean up the persistent file after streaming
                    try:
                        os.remove(persistent_path)
                        print(f"Cleaned up: {persistent_path}")
                    except:
                        pass
            
            return StreamingResponse(
                iterfile(), 
                media_type="video/mp4", 
                headers={
                    "Content-Disposition": content_disposition,
                    "Content-Length": str(os.path.getsize(persistent_path))
                }
            )
    except subprocess.TimeoutExpired:
        print("Error: Download timed out")
        return JSONResponse(status_code=408, content={"error": "Download timed out"})
    except Exception as e:
        print(f"Error downloading video: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)}) 