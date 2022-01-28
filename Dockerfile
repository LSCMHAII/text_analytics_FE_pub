FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# update npm
RUN npm install -g npm@8.3.0

# Install PM2 globally
# RUN npm install --global pm2

# COPY . ./
EXPOSE 3000

USER node
# EXPOSE 3001
