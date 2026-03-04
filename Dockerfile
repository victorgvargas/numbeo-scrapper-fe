# Stage 1: Build the Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-path=dist/numbeo-scrapper-fe

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/numbeo-scrapper-fe /usr/share/nginx/html
