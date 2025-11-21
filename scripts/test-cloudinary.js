require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PRIVATE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary Configuration...\n');
console.log('Cloud Name:', process.env.NEXT_PRIVATE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');
console.log('\n---\n');

// Create a test image (1x1 pixel PNG)
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const dataURI = `data:image/png;base64,${testImageBase64}`;

console.log('Uploading test image to Cloudinary...\n');

cloudinary.uploader.upload(dataURI, {
  folder: 'portfolio/uploads',
  resource_type: 'auto',
})
  .then(result => {
    console.log('✓ SUCCESS!\n');
    console.log('Uploaded URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    console.log('\nCloudinary is configured correctly!');
    process.exit(0);
  })
  .catch(error => {
    console.log('✗ FAILED!\n');
    console.error('Error:', error.message);
    if (error.http_code) {
      console.error('HTTP Code:', error.http_code);
    }
    console.log('\nCheck your Cloudinary credentials in .env.local');
    process.exit(1);
  });
