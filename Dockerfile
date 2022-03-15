# build environment
FROM node:14.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build step #1: build the React front end
# FROM node:16-alpine as build-step
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json yarn.lock ./
# COPY ./src ./src
# COPY ./public ./public
# RUN yarn install
# RUN yarn build
