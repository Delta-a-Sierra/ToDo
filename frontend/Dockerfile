# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /core

# add `/app/node_modules/.bin` to $PATH
ENV PATH="./node_modules/.bin:$PATH"

# install app dependencies
COPY . .

RUN npm run build


# start app
CMD ["npm", "start"]