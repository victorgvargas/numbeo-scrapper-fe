# Use a lightweight server (e.g., nginx) to serve static files
FROM nginx:alpine

# Copy built Angular files to the container
COPY dist/numbeo-scrapper-fe /usr/share/nginx/html
