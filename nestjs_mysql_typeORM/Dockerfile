FROM node:16
WORKDIR /app
ADD package.json /app/package.json
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]