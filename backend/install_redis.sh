: '
# Documentation: Redis Installation Script

This script automates the installation and setup of Redis on a Linux system. 
It performs the following tasks:
1. Updates the package list and installs necessary prerequisites.
2. Downloads, extracts, builds, and installs the latest stable version of Redis.
3. Configures Redis to run as a background service using systemd.
4. Creates a dedicated Redis user, group, and data directory.
5. Starts and enables the Redis service.

## How to Invoke:
1. Save this script to a file, e.g., `install_redis.sh`.
2. Make the script executable:
    chmod +x install_redis.sh
3. Run the script with superuser privileges:
    sudo ./install_redis.sh

## Prerequisites:
- Ensure you have `curl` installed on your system.
- Run this script on a Linux distribution that supports systemd.

## Notes:
- The script assumes a clean environment and may overwrite existing Redis configurations.
- After execution, Redis will be installed and running as a systemd service.
'
#!/bin/bash

# Update package list and install prerequisites
sudo apt update
sudo apt install -y build-essential tcl

# Download and extract the latest stable version of Redis
cd /tmp
curl -O http://download.redis.io/redis-stable.tar.gz
tar xzvf redis-stable.tar.gz
cd redis-stable

# Build and install Redis
make
sudo make install

# Configure Redis
sudo mkdir -p /etc/redis
sudo cp redis.conf /etc/redis

# Update Redis configuration to run as a background service
sudo sed -i 's/^supervised no/supervised systemd/' /etc/redis/redis.conf
sudo sed -i 's/^dir .\//dir \/var\/lib\/redis/' /etc/redis/redis.conf

# Create a systemd service file for Redis
sudo bash -c 'cat <<EOF > /etc/systemd/system/redis.service
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
EOF'

# Create Redis user, group, and data directory
sudo adduser --system --group --no-create-home redis
sudo mkdir -p /var/lib/redis
sudo chown redis:redis /var/lib/redis
sudo chmod 770 /var/lib/redis

# Start and enable Redis service
sudo systemctl start redis
sudo systemctl enable redis

echo "Redis installation and setup completed successfully." 