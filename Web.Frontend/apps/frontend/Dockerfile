# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace configuration
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Copy the entire workspace (we need shared libs)
COPY . .

# Install all dependencies
RUN npm ci

# Build the frontend application
RUN npx nx build frontend --prod

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static files
RUN npm install -g serve

# Copy the built application
COPY --from=builder /app/dist/apps/frontend ./dist

# Create a simple serve configuration
RUN echo '{ "rewrites": [{ "source": "/**", "destination": "/index.html" }] }' > serve.json

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000", "-c", "serve.json"]