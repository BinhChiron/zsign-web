
Dưới đây là nội dung của bạn đã được format lại theo chuẩn Markdown, cùng với một ví dụ về API call và link đến dự án gốc zsign trên GitHub.

Hướng dẫn cài đặt và chạy dự án zsign
Dưới đây là các bước để cài đặt, build, và chạy dự án zsign.

1. Cài đặt node-gyp

```
npm install -g node-gyp
```
2. Cấu hình và build dự án
Chạy các lệnh sau trong thư mục dự án:

```
node-gyp configure
node-gyp build
```
3. Chạy server
Sau khi build thành công, bạn có thể khởi động server bằng lệnh:

```
node server.js
```
4. Ví dụ API call
Để thực hiện API call tới endpoint /sign (giả sử server đang chạy trên localhost), bạn có thể sử dụng fetch như ví dụ dưới đây:

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

Ghi chú:

- node-gyp được sử dụng để build các module C++ cho Node.js. Hãy chắc chắn rằng bạn đã cài đặt Python và các công cụ build cần thiết cho môi trường của bạn (trên Windows, bạn có thể cần cài Visual Studio Build Tools).

- Đảm bảo rằng đường dẫn đến file .p12 và mobileprovision là chính xác khi thực hiện API call.
