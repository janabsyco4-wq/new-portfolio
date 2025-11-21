# 📸 Image URL Guide for Projects

## ✅ CORRECT Image URLs

Use **direct image URLs** that end with image extensions:

### 1. Unsplash (Recommended)
```
https://images.unsplash.com/photo-1485827404703-89b55fcc595e
https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600
```

### 2. Direct Image Links
```
https://example.com/image.jpg
https://example.com/photo.png
https://example.com/picture.webp
```

### 3. Image Hosting Services
- **Imgur**: `https://i.imgur.com/xxxxx.jpg`
- **Cloudinary**: `https://res.cloudinary.com/xxx/image/upload/xxx.jpg`
- **AWS S3**: `https://bucket-name.s3.amazonaws.com/image.jpg`

---

## ❌ INCORRECT Image URLs (Will NOT Work)

### Google Image Search Results
```
❌ https://www.google.com/imgres?q=hello&imgurl=...
```
This is a search results page, not an image!

### Image Search Pages
```
❌ https://www.google.com/search?q=images
❌ https://www.bing.com/images/search?q=...
```

---

## 🎯 How to Get Correct Image URLs

### From Unsplash:
1. Go to https://unsplash.com
2. Search for your image
3. Click on the image
4. Right-click on the image → "Copy Image Address"
5. Paste in your project form

### From Google Images:
1. Search for your image on Google
2. Click on the image
3. Click "Visit" to go to the source website
4. Right-click on the image → "Copy Image Address"
5. Make sure the URL ends with `.jpg`, `.png`, or `.webp`

### Upload Your Own:
1. Use free image hosting:
   - https://imgur.com (free, no account needed)
   - https://cloudinary.com (free tier)
   - https://imgbb.com (free)
2. Upload your image
3. Copy the direct image link

---

## 🔍 Quick Test

Before adding an image URL to your project:
1. Paste the URL in a new browser tab
2. If you see ONLY the image (no website around it), it's correct! ✅
3. If you see a webpage with the image on it, it's wrong ❌

---

## 📝 Example Good URLs for Engineering Projects

```
https://images.unsplash.com/photo-1485827404703-89b55fcc595e  (Robotic arm)
https://images.unsplash.com/photo-1581092160562-40aa08e78837  (Heat exchanger)
https://images.unsplash.com/photo-1581092918056-0c4c3acd3789  (Gears)
https://images.unsplash.com/photo-1581092160607-ee22621dd758  (3D printing)
```

---

## 🛠️ Current Issue Fix

Your current project has an invalid image URL. To fix it:

1. Open admin panel (type `fa22019`)
2. Login with `admin123`
3. Go to Projects tab
4. Click "Edit" on your project
5. Replace the image URL with a valid one from Unsplash
6. Click "Update Project"
7. Refresh the page to see your image!
