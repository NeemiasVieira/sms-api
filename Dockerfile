FROM node:20

# Instala o Google Chrome e dependências necessárias
RUN apt-get update \
  && apt-get install -y wget gnupg ca-certificates \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Define variável para evitar o download do Chrome pelo Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3333

# Adiciona um usuário não privilegiado para executar o Puppeteer
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

# Defina o diretório de cache do Puppeteer e verifique permissões
RUN mkdir -p /home/pptruser/.cache/puppeteer \
  && chown -R pptruser:pptruser /home/pptruser/.cache

# Executar como o usuário pptruser
USER pptruser

CMD ["npm", "run", "start:prod"]
