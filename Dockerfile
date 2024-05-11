FROM node:22-alpine3.18

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY --chown=app:node package*.json .

# Install npm production packages 
RUN npm install --legacy-peer-deps

COPY . .

# ENV NODE_ENV production
# ENV PORT 5001

EXPOSE 5000

CMD ["npm", "run", "server"]