# 📤 File Upload Guide

## ✅ What You Can Upload

### Images
- **Formats**: JPG, JPEG, PNG, WEBP, GIF
- **Max Size**: 10MB per file
- **Use For**: Main project image, gallery images

### PDFs
- **Format**: PDF only
- **Max Size**: 10MB
- **Use For**: Project documentation, technical drawings, reports

---

## 🎯 How to Upload Files

### Method 1: Upload from Computer (NEW!)

1. **Open Admin Panel**
   - Type `fa22019` anywhere on the site
   - Login with `admin123`

2. **Go to Projects Tab**
   - Click "Add Project" or "Edit" existing project

3. **Upload Files**
   - **Main Image**: Click the "📤 Upload" button next to the image URL field
   - **Gallery Images**: Click the green "📤 Upload" button
   - **PDF**: Click the red "📄 Upload PDF" button

4. **Select File**
   - Choose your file from your computer
   - Wait for "File uploaded successfully!" message
   - The URL will be automatically filled in

### Method 2: Paste URL (Still Works!)

You can still paste direct URLs:
- Image URLs: `https://images.unsplash.com/photo-xxx`
- PDF URLs: `https://example.com/document.pdf`

---

## 📁 Where Files Are Stored

Uploaded files are stored in:
```
portfolio/public/uploads/
```

Files are accessible at:
```
http://localhost:3000/uploads/filename.jpg
http://localhost:3000/uploads/document.pdf
```

---

## 🔒 File Validation

### Automatic Checks:
- ✅ File type validation (only allowed formats)
- ✅ File size limit (10MB max)
- ✅ Unique filenames (timestamp + original name)
- ✅ Safe filename sanitization

### Error Messages:
- "Invalid file type" - Use JPG, PNG, WEBP, GIF, or PDF only
- "File too large" - Reduce file size to under 10MB
- "Failed to upload file" - Try again or check file

---

## 💡 Tips

### For Images:
- Use high-quality images (at least 800x600px)
- Compress large images before uploading
- WEBP format gives best quality/size ratio

### For PDFs:
- Keep PDFs under 5MB for faster loading
- Use descriptive filenames
- Compress PDFs if they're too large

### Best Practices:
1. **Upload** files for permanent storage
2. **Use URLs** for external images (Unsplash, etc.)
3. **Test** uploaded files by viewing the project
4. **Backup** important files separately

---

## 🚀 Quick Example

### Adding a Project with Uploads:

1. Click "Add Project"
2. Enter title: "My Engineering Project"
3. **Main Image**: Click "📤 Upload" → Select `project-main.jpg`
4. **Gallery**: Click "📤 Upload" → Select `detail-1.jpg`, `detail-2.jpg`
5. **Description**: Enter project details
6. **PDF**: Click "📄 Upload PDF" → Select `documentation.pdf`
7. Click "Create Project"
8. Done! ✅

---

## ⚠️ Important Notes

- Uploaded files are **permanent** (not deleted automatically)
- Files are stored locally in your project
- When deploying, ensure the `public/uploads` folder is included
- For production, consider using cloud storage (Cloudinary, AWS S3)

---

## 🔧 Troubleshooting

### Upload button not working?
- Check if the dev server is running
- Refresh the page and try again

### File not showing after upload?
- Check browser console for errors
- Verify file was uploaded to `public/uploads/`
- Try refreshing the page

### "Failed to upload" error?
- Check file size (must be under 10MB)
- Verify file format is allowed
- Check server logs for details

---

## 🎉 You're All Set!

Now you can easily upload images and PDFs directly from your computer without needing external hosting services!
