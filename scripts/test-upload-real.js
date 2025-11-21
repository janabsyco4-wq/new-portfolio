require('dotenv').config({ path: '.env.local' });
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Create a simple test image file
const testImagePath = path.join(__dirname, 'test-image.png');
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
fs.writeFileSync(testImagePath, Buffer.from(testImageBase64, 'base64'));

console.log('Testing upload API with real file...\n');

const formData = new FormData();
formData.append('file', fs.createReadStream(testImagePath), {
  filename: 'test-image.png',
  contentType: 'image/png'
});

// Test against local dev server
const url = 'http://localhost:3000/api/upload';

console.log('Uploading to:', url);
console.log('File:', testImagePath, '\n');

fetch(url, {
  method: 'POST',
  body: formData,
  headers: formData.getHeaders(),
})
  .then(res => res.json())
  .then(data => {
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✓ Upload successful!');
      console.log('Image URL:', data.url);
      console.log('\nCheck Cloudinary dashboard:');
      console.log('https://cloudinary.com/console/media_library/folders/portfolio%2Fuploads');
    } else {
      console.log('\n✗ Upload failed!');
      console.log('Error:', data.message || data.error);
    }
    
    // Cleanup
    fs.unlinkSync(testImagePath);
    process.exit(data.success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n✗ Request failed!');
    console.error('Error:', error.message);
    console.log('\nMake sure dev server is running: npm run dev');
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    process.exit(1);
  });
