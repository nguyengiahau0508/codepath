# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the workspace
COPY package*.json ./

# Install project dependencies with clean install
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Start with database migrations, then start the NestJS development server
CMD ["npm", "run", "start:dev"]