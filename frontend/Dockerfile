# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /core

# add `/app/node_modules/.bin` to $PATH
ENV PATH="./node_modules/.bin:$PATH"

# install app dependencies
COPY . .

RUN npm install
RUN npm run build


RUN echo $REACT_APP_API_URL

ENV REACT_APP_API_URL=http://127.0.0.1:8080/v1

EXPOSE 3000

# start app
CMD ["npm", "start"]