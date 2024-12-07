# Gunakan image Node.js resmi sebagai base image
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Expose port tempat aplikasi berjalan
EXPOSE 8080

# Jalankan server
CMD ["node", "src/server/server.js"]