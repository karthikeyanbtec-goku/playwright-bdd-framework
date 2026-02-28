# Use the official Microsoft Playwright image as the base image
# This image contains Node.js and all required browser binaries and OS dependencies
FROM mcr.microsoft.com/playwright:v1.49.1-noble

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Install Java (Required for Allure Command Line)
RUN apt-get update && apt-get install -y default-jre && rm -rf /var/lib/apt/lists/*

# Set default environment variables
ENV ENV=qa
ENV HEADLESS=true
ENV BROWSER=chromium

# Execute tests by default
CMD ["npm", "run", "test:qa"]
