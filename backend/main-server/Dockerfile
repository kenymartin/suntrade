# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy both package.json and package-lock.json to the working directory
COPY ./backend/main-server/package*.json ./
COPY ./backend/package*.json ./

# Copy the tsconfig.base.json from the root directory
COPY ../../tsconfig.base.json .



# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./backend/main-server .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]