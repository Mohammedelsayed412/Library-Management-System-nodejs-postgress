# Specify the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]