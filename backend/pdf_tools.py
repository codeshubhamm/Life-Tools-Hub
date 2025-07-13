from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
import os, tempfile, shutil
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from pdf2docx import Converter
from PIL import Image
import subprocess
import logging
try:
    import pikepdf
except ImportError:
    pikepdf = None

router = APIRouter()

# 1. Merge PDF
@router.post('/merge-pdf')
async def merge_pdf(files: list[UploadFile] = File(...)):
    merger = PdfMerger()
    temp_dir = tempfile.mkdtemp()
    file_paths = []
    for file in files:
        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, 'wb') as f:
            f.write(await file.read())
        merger.append(file_path)
        file_paths.append(file_path)
    output_path = os.path.join(temp_dir, 'merged.pdf')
    merger.write(output_path)
    merger.close()
    for path in file_paths:
        os.remove(path)
    return FileResponse(output_path, filename='merged.pdf')

# 2. Split PDF
@router.post('/split-pdf')
async def split_pdf(file: UploadFile = File(...), start: int = Form(...), end: int = Form(...)):
    temp_dir = tempfile.mkdtemp()
    input_path = os.path.join(temp_dir, file.filename)
    with open(input_path, 'wb') as f:
        f.write(await file.read())
    reader = PdfReader(input_path)
    writer = PdfWriter()
    for i in range(start-1, end):
        writer.add_page(reader.pages[i])
    output_path = os.path.join(temp_dir, f'split_{start}_{end}.pdf')
    with open(output_path, 'wb') as f:
        writer.write(f)
    return FileResponse(output_path, filename=f'split_{start}_{end}.pdf')

# 3. Compress PDF (using Ghostscript if available)
@router.post('/compress-pdf')
async def compress_pdf(file: UploadFile = File(...)):
    os.makedirs('compressed', exist_ok=True)
    input_path = os.path.join('compressed', file.filename)
    output_path = os.path.join('compressed', f'compressed_{file.filename}')
    try:
        logging.info(f"[compress-pdf] Saving uploaded file to {input_path}")
        with open(input_path, 'wb') as f:
            f.write(await file.read())
        if not os.path.exists(input_path):
            logging.error(f"[compress-pdf] Failed to save input file: {input_path}")
            return JSONResponse({"error": "Failed to save input file."}, status_code=500)
        before_size = os.path.getsize(input_path)
        if pikepdf is not None:
            try:
                pdf = pikepdf.Pdf.open(input_path)
                pdf.save(output_path, optimize_streams=True, compress_streams=True)
                pdf.close()
                logging.info(f"[compress-pdf] pikepdf compression succeeded.")
            except Exception as e2:
                logging.error(f"[compress-pdf] pikepdf compression failed: {e2}")
                return JSONResponse({"error": f"pikepdf compression failed: {e2}"}, status_code=500)
        else:
            logging.error(f"[compress-pdf] pikepdf not installed.")
            return JSONResponse({"error": "pikepdf not installed."}, status_code=500)
        if not os.path.exists(output_path):
            logging.error(f"[compress-pdf] Output file not found: {output_path}")
            return JSONResponse({"error": "Compression failed. Output file not found."}, status_code=500)
        after_size = os.path.getsize(output_path)
        logging.info(f"[compress-pdf] Compression complete. Output size: {after_size} bytes")
        return JSONResponse({
            "download_url": f"/api/download-compressed/compressed_{file.filename}",
            "before_size": before_size,
            "after_size": after_size
        })
    except Exception as e:
        logging.error(f"[compress-pdf] Exception: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)

@router.get('/download-compressed/{filename}')
def download_compressed(filename: str):
    file_path = os.path.join('compressed', filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, filename=filename, media_type="application/pdf")
    return JSONResponse({"error": "File not found"}, status_code=404)

# 4. Image to PDF
@router.post('/image-to-pdf')
async def image_to_pdf(files: list[UploadFile] = File(...)):
    temp_dir = tempfile.mkdtemp()
    images = []
    for file in files:
        img_path = os.path.join(temp_dir, file.filename)
        with open(img_path, 'wb') as f:
            f.write(await file.read())
        img = Image.open(img_path).convert('RGB')
        images.append(img)
    output_path = os.path.join(temp_dir, 'output.pdf')
    images[0].save(output_path, save_all=True, append_images=images[1:])
    return FileResponse(output_path, filename='output.pdf')

# 5. PDF to Word
@router.post('/pdf-to-word')
async def pdf_to_word(file: UploadFile = File(...)):
    temp_dir = tempfile.mkdtemp()
    input_path = os.path.join(temp_dir, file.filename)
    with open(input_path, 'wb') as f:
        f.write(await file.read())
    output_path = os.path.join(temp_dir, 'output.docx')
    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)
    cv.close()
    return FileResponse(output_path, filename='output.docx')

# 6. Add Watermark
@router.post('/add-watermark')
async def add_watermark(pdf: UploadFile = File(...), watermark: UploadFile = File(...)):
    temp_dir = tempfile.mkdtemp()
    pdf_path = os.path.join(temp_dir, pdf.filename)
    watermark_path = os.path.join(temp_dir, watermark.filename)
    with open(pdf_path, 'wb') as f:
        f.write(await pdf.read())
    with open(watermark_path, 'wb') as f:
        f.write(await watermark.read())
    output_path = os.path.join(temp_dir, 'watermarked.pdf')
    pdf_reader = PdfReader(pdf_path)
    watermark_reader = PdfReader(watermark_path)
    watermark_page = watermark_reader.pages[0]
    writer = PdfWriter()
    for page in pdf_reader.pages:
        page.merge_page(watermark_page)
        writer.add_page(page)
    with open(output_path, 'wb') as f:
        writer.write(f)
    return FileResponse(output_path, filename='watermarked.pdf')

# 7. Reorder Pages
@router.post('/reorder-pages')
async def reorder_pages(file: UploadFile = File(...), order: str = Form(...)):
    # order: comma-separated page numbers, e.g. "3,1,2"
    temp_dir = tempfile.mkdtemp()
    input_path = os.path.join(temp_dir, file.filename)
    with open(input_path, 'wb') as f:
        f.write(await file.read())
    reader = PdfReader(input_path)
    writer = PdfWriter()
    order_list = [int(x.strip())-1 for x in order.split(',') if x.strip().isdigit()]
    for i in order_list:
        if 0 <= i < len(reader.pages):
            writer.add_page(reader.pages[i])
    output_path = os.path.join(temp_dir, 'reordered.pdf')
    with open(output_path, 'wb') as f:
        writer.write(f)
    return FileResponse(output_path, filename='reordered.pdf') 