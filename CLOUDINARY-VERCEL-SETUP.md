# Cloudinary Setup for Vercel

## ✅ Your Cloudinary is Working Locally!

Your test confirmed Cloudinary works fine locally. The issue is that **Vercel doesn't have your environment variables**.

## 🚀 Fix for Vercel Deployment

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dullqnrse
CLOUDINARY_API_KEY=992717112893261
CLOUDINARY_API_SECRET=lNSokxgsP6XRfqm40JWjQ0gAs2k
```

### Step 2: Redeploy

After adding the environment variables:
- Go to **Deployments** tab
- Click the three dots (...) on your latest deployment
- Click **Redeploy**

OR just push a new commit to trigger a deployment.

## 📤 How to Upload Images

You have TWO ways to add images:

### Option 1: Direct URL (Recommended for now)
1. Upload your image to any free hosting:
   - https://imgur.com (easiest, no account needed)
   - https://imgbb.com
   - https://postimages.org

2. Copy the direct image URL
3. Paste it in the "Main Image" or "Gallery Images" field

### Option 2: Upload via Cloudinary (After Vercel setup)
1. Click the "📤 Upload" button in the admin panel
2. Select your image file
3. Wait for upload to complete
4. The URL will be automatically filled

## 🔍 Testing After Deployment

After redeploying with environment variables:

1. Go to your admin panel on Vercel
2. Try uploading an image using the Upload button
3. It should now work!

## ⚠️ Important Notes

- Environment variables are **NOT** automatically synced to Vercel
- You must manually add them in Vercel dashboard
- After adding env vars, you MUST redeploy
- The `NEXT_PUBLIC_` prefix makes the cloud name available in the browser
- API Key and Secret are server-side only (secure)

## 🆘 Still Not Working?

If uploads still fail after adding env vars:

1. Check browser console for errors (F12)
2. Check Vercel deployment logs
3. Verify all three env vars are set correctly
4. Make sure you redeployed after adding env vars
