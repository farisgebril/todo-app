FROM node:18-alpine
WORKDIR /app

# Copy package files first (optimizes Docker cache)
COPY backend/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY backend/ .

# Configure port
ENV PORT=8081
EXPOSE 8081

# Runtime command
CMD ["node", "server.js"]