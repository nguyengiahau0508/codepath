# Use Node.js 20 as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port 4200 for the Angular dev server
EXPOSE 4200

# Start the Angular development server
# Use --host 0.0.0.0 to allow access from outside the container
# Use --poll to enable file watching in Docker on Windows
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]