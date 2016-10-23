FROM node

MAINTAINER eric

EXPOSE 2333

COPY . /src

WORKDIR /src

CMD ["npm", "start"]
