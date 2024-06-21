FROM node:16.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]

#COPY client/package*.json /app/client

#RUN cd /app/client && npm install

#RUN npm run dev

# FROM redis:6.2.6

# CMD ["redis-server"]