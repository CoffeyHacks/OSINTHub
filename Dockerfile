# Use an official Node.js runtime as the base image
FROM node:20.3.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json ./

# Install application dependencies inside the container
RUN npm install

# Copy the rest of the application into the /app directory in the container
COPY . .

# Make the container listen on port 3000 at runtime
EXPOSE 3000

# Define the command that should be executed 
# when the Docker container starts up
CMD [ "node", "server.js" ]
