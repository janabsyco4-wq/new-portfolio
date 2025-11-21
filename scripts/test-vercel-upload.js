const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Your Vercel production URL
const VERCEL_URL = 'https://portolio-project.vercel.app';

// Create a simple test image file
const testImagePath = path.join(__dirname, 'test-image.png');
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
fs.writeFileSync(testImagePath, Buffer.from(testImageBase64, 'base64'));

console.log('Testing Vercel Production Upload...\n');
console.log('URL:', VERCEL_URL + '/api/upload');
console.log('---\n');

const formData = new FormData();
formData.append('file', fs.createReadStream(testImagePath), {
  filename: 'test-image.png',
  contentType: 'image/png'
});

fetch(VERCEL_URL + '/api/upload', {
  method: 'POST',
  body: formData,
  headers: formData.getHeaders(),
})
  .then(async res => {
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
    
    try {
      const data = JSON.parse(text);
      
      if (data.success) {
        console.log('\n✓ SUCCESS!');
        console.log('Uploaded URL:', data.url);
        console.log('\nCloudinary is working on Vercel!');
      } else {
        console.log('\n✗ FAILED!');
        console.log('Error:', data.message || data.error);
      }
    } catch (e) {
      console.log('\n✗ Invalid JSON response');
      console.log('Raw response:', text);
    }
    
    // Cleanup
    fs.unlinkSync(testImagePath);
    process.exit(res.status === 200 ? 0 : 1);
  })
  .catch(error => {
    console.error('\n✗ Request failed!');
    console.error('Error:', error.message);
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    process.exit(1);
  });
