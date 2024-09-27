# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc của dự án
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng mà ứng dụng sẽ chạy (thường là 3000 hoặc cổng khác nếu ứng dụng của bạn chạy trên cổng khác)
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
