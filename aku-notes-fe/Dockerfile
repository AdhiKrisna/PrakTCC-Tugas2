FROM node:18-alpine

WORKDIR /app
COPY package.json . 
RUN npm install 
COPY . .

# Set PORT agar mengikuti Cloud Run
ENV PORT=8080
EXPOSE 8080

# Jalankan Vite dengan port 8080 dan host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--port", "8080", "--host"]
