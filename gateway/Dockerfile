FROM node:8.9.4

COPY package.json package.json
RUN npm install

# Add your source files
COPY . .

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "index.js", "--use-strict"]