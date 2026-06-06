# Use nginx to serve your HTML CSS JS files
FROM nginx:alpine

# Copy your project files into nginx's default serve folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80