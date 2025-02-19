FROM node:alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/front-desafio-ids/browser /usr/share/nginx/html

COPY --from=build /app/dist/front-desafio-ids/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

