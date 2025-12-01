# Use Node image
FROM node:20-slim

# Install Chrome and dependencies
RUN apt-get update && apt-get install -y \
    wget unzip xvfb libnss3 libatk-bridge2.0-0 libgtk-3-0 \
    libxss1 libasound2 fonts-liberation libappindicator3-1 \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y ./google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb

# Set workdir
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY wdio.conf.ts ./
COPY src ./src

# Install dependencies
RUN npm install

# Run tests
CMD ["npx", "wdio", "run", "wdio.conf.ts"]