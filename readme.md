1. npm install -g node-gyp
2. node-gyp configure
   node-gyp build
3. node server.js


Call api example:

fetch('http://localhost:3000/sign', {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       ipaPath: '/path/to/your/ipa',
       cert: '/path/to/your/cert.p12',
       mobileProvision: '/path/to/your/provision.mobileprovision'
   })
})
   .then(response => response.text())
   .then(data => console.log(data))
   .catch(error => console.error('Error:', error));
