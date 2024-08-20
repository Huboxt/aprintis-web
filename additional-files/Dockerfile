FROM node:20-alpine
# ENV NODE_OPTIONS=--max-old-space-size=1024
# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm run build:app &
# RUN npm run serve-gl


# COPY .next .next
# COPY node_modules node_modules
# COPY src src
# COPY public public
# # Set the command to run the application when the container starts
# CMD ["npm", "start"]
