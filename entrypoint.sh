#!/bin/sh

set -e

echo "Starting sshd.."

echo "Shell exists: $(test -f /home/portfolio-ss/bin/portfolio-shell && echo yes || echo no)"
echo "Sh exists: $(test -f /bin/sh && echo yes || echo no)"
ls -la /bin/sh

exec /usr/sbin/sshd -D -e