# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the workspace
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Start with database migrations, then start the NestJS development server
CMD ["sh", "-c", "npm run db:migrate && npm run start:dev"]