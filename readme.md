Guide to Installing and Running the zsign Project
Below are the steps to install, build, and run the zsign project.

1. Install node-gyp

```
npm install -g node-gyp
```
2. Configure and Build the Project
Run the following commands inside the project directory:

```
node-gyp configure
node-gyp build
```
3. Run the Server
Once the build is successful, you can start the server by running the following command:

```
node server.js
```
4. Example API Call
To make an API call to the /sign endpoint (assuming the server is running on localhost), you can use the fetch API like the example below:

```javascript:

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
```



For more details, check out the original project on GitHub: [zsign GitHub Repository](https://github.com/zhlynn/zsign).

Notes:
- node-gyp is used to build C++ modules for Node.js. Make sure you have installed Python and the necessary build tools for your environment (on Windows, you may need to install Visual Studio Build Tools).
- Ensure that the paths to the .p12 file and the mobileprovision file are correct when making the API call.
