#!/bin/sh

set -e

echo "Starting SSH server..."

if [ ! -f /etc/ssh/ssh_host_rsa_key ]; then
    echo "Generating SSH host keys..."
    ssh-keygen -A
fi

# echo "Configuring connection rate limiting..."
# iptables -N RATE_LIMIT 2>/dev/null || true
# iptables -A RATE_LIMIT -m recent --set --name SSH
# iptables -A RATE_LIMIT -m recent --update --seconds 60 --hitcount 10 --name SSH -j REJECT --reject-with tcp-reset
# iptables -I INPUT -p tcp --dport 22 -j RATE_LIMIT

echo "Starting sshd..."
exec /usr/sbin/sshd -D -e
