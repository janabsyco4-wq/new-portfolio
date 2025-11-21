import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Debug: Check if env vars are loaded
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary env vars:', {
        cloud_name: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET,
      });
      return NextResponse.json({ 
        success: false, 
        error: 'Cloudinary not configured. Check environment variables.' 
      }, { status: 500 });
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid file type. Only images and PDFs allowed.' 
      }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        success: false, 
        error: 'File too large. Max 10MB.' 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const uploadOptions: any = {
      folder: 'portfolio/uploads',
      resource_type: file.type === 'application/pdf' ? 'raw' : 'auto',
    };

    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    return NextResponse.json({ 
      success: true, 
      url: result.secure_url,
      publicId: result.public_id,
      type: file.type
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Upload failed' 
    }, { status: 500 });
  }
}
