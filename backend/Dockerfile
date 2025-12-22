# Sử dụng Node.js 20 làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port 3000 cho NestJS
EXPOSE 3000

# Chạy NestJS development server với hot reload
# NestJS watch mode tự động hỗ trợ polling cho Docker
CMD ["npm", "run", "start:dev", "--", "--watch"]