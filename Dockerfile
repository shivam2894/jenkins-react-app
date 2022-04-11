#STAGE-1
FROM node:14-alpine As build

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy app files
COPY . .
RUN npm run build


#STAGE-2
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html