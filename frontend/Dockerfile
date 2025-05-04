 #  Step 1: Build the frontend
FROM node:20 AS build

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
    rm -rf /var/lib/apt/lists/*

# Set the default shell for the vscode user
RUN chsh -s /bin/bash vscode
# RUN sudo chown -R $USERNAME:$USERNAME
# Ensure .bashrc is sourced for the vscode user
RUN echo 'source ~/.bashrc' >> /home/vscode/.bash_profile
# USER $USERNAME
# Set the working directory
WORKDIR /app

# Copy shared files
COPY tsconfig.base.json ./
COPY shared ./shared

# Copy the frontend code and install dependencies
COPY frontend ./frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --save-dev rollup
RUN npm install

# Build the frontend project
RUN npm run build

# Step 2: Use Nginx to serve static files
FROM nginx:stable
# RUN adduser --system --no-create-home --group vscode
# RUN chown -R vscode:vscode /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html
# USER vscode
# COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files from the build stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html


# Copy the entrypoint script
COPY ./frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh




# USER $USERNAME
# COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80
EXPOSE 80

# Start Nginx automatically
# CMD ["nginx", "-g", "daemon off;"]
CMD ["tail", "-f", "/dev/null"]

# ENTRYPOINT ["/entrypoint.sh"]
