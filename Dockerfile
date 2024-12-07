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

# Set environment variables
ENV APP_ENV=production
ENV APP_PORT=8080
ENV MODEL_URL="https://storage.googleapis.com/asclepius-model-anna-bucket/model-in-prod/model.json"
ENV PROJECT_ID="submissionmlgc-annastefanie"

# Expose port tempat aplikasi berjalan
EXPOSE 8080

# Jalankan server
CMD ["node", "src/server/server.js"]
