# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the production server
FROM node:18-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only what’s needed for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port Next.js runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
