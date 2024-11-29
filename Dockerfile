# Dockerfile
FROM node:22-alpine AS build
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /dist ./dist
COPY --from=build /node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
