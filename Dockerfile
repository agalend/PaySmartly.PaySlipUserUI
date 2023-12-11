# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies
RUN npm i 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

LABEL author="Stefan Bozov"

# Start the app
CMD ["npm", "start"]