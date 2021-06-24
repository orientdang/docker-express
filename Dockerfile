FROM node:14
WORKDIR /app
COPY package.json . 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
			then npm install; \
			else npm install --only=prod; \
			fi
# docker optimization - utilize docker cache
COPY . ./
EXPOSE 3000
CMD ["npm","run", "dev"]
