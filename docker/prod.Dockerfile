FROM imagenessegurasproductiongloacr.azurecr.io/node:18-lts

# home directory
WORKDIR /home/app

# copy app
COPY . .

EXPOSE 3500

# start
CMD ["npm", "start"]
