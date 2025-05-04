# Use a base image
FROM node:20 AS base

# Prevent services from starting during installation
RUN echo '#!/bin/sh\nexit 0' > /usr/sbin/policy-rc.d && \
    chmod +x /usr/sbin/policy-rc.d

# Set environment variables for user creation
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=1001

# Install necessary packages and create the vscode user
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl sudo && \
    groupadd --gid $USER_GID $USERNAME && \
    useradd --uid $USER_UID --gid $USER_GID --shell /bin/bash -m $USERNAME && \
    echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME && \
    # sudo chmod -R 775 /usr/local/share/nvm && \
    rm -rf /var/lib/apt/lists/*

# Set the default shell for the vscode user
RUN chsh -s /bin/bash vscode

# Ensure .bashrc is sourced for the vscode user
RUN echo 'source ~/.bashrc' >> /home/vscode/.bash_profile

RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /suntrade

# Copy shared files and install dependencies
COPY tsconfig.base.json ./
COPY shared ./shared

# Copy backend folder to build each server
COPY backend ./backend

# Install dependencies and build Prisma client for the backend
WORKDIR /suntrade/backend
RUN npm install && \
    npm install --save-dev  @prisma/client @types/nodemailer  moment lodash @types/express joi @types/jsonwebtoken dotenv redis @types/bcrypt ioredis && \
    npm install --save-dev concurrently

RUN apt update && apt-get install redis-server -y && sudo service redis-server start && \
chown -R vscode:vscode /var/lib/redis /var/log/redis /etc/redis

# @prisma/client
# Build the backend
RUN npm run build

# Step 2: Build and prepare main-server
FROM base AS main-server-dev
WORKDIR /suntrade/backend/main-server
COPY backend/main-server/package*.json ./
RUN npm install

# Step 3: Build and prepare auth-server
FROM base AS auth-server-dev
WORKDIR /suntrade/backend/auth-server
COPY backend/auth-server/package*.json ./
RUN npm install

# RUN apt-get update && apt-get install -y postgresql-client && \
# RUN apt update && apt-get install redis-server -y && sudo service redis-server start && \
# chown -R vscode:vscode /var/lib/redis /var/log/redis /etc/redis
# Step 4: Use a lightweight Node.js image for runtime
FROM node:20 AS runtime

# Set environment variables for user creation
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=1001

# Prevent services from starting during installation
RUN echo '#!/bin/sh\nexit 0' > /usr/sbin/policy-rc.d && \
    chmod +x /usr/sbin/policy-rc.d

# Install necessary packages and create the vscode user
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl sudo && \
    groupadd --gid $USER_GID $USERNAME && \
    useradd --uid $USER_UID --gid $USER_GID --shell /bin/bash -m $USERNAME && \
    echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME && \
    # sudo chmod -R 775 /usr/local/share/nvm && \
    rm -rf /var/lib/apt/lists/*

# Set the default shell for the vscode user
RUN chsh -s /bin/bash vscode

# Ensure .bashrc is sourced for the vscode user
RUN echo 'source ~/.bashrc' >> /home/vscode/.bash_profile

# Set the working directory
WORKDIR /suntrade

# Copy built files from both servers
COPY --from=main-server-dev /suntrade/backend/main-server /suntrade/backend/main-server
COPY --from=auth-server-dev /suntrade/backend/auth-server /suntrade/backend/auth-server

# Install NVM in the vscode user's home directory
# USER root
USER $USERNAME
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc && \
    . ~/.nvm/nvm.sh && \
    nvm install --lts && \
    sudo chown -R vscode:vscode /usr/local/share/nvm

# Allow the vscode user to access necessary directories
USER root
RUN chown -R vscode:vscode /workspace /var/www /usr/share/nginx/html

USER $USERNAME
# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start the servers (using a process manager is recommended for production)
# CMD ["sh", "-c", "node ./backend/main-server/src/server.js & node ./backend/auth-server/src/server.js"]
# CMD ["tail", "-f", "/dev/null","service redis-server start"]
