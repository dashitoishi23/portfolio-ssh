FROM node:alpine

ARG UID=1001

RUN apk add --no-cache \
    openssh-server \
    iptables

RUN ssh-keygen -A

RUN mkdir -p /var/run/sshd

RUN mkdir -p /home/portfolio-ss && \
    chown -R node:node /home/portfolio-ss

COPY entrypoint.sh /entrypoint.sh
COPY . /home/portfolio-ss

RUN chmod +x /home/portfolio-ss/bin/portfolio-shell

RUN adduser -D -u ${UID} -G root -s /home/portfolio-ss/bin/portfolio-shell portfolio && \
    passwd -d portfolio && \
    chown -R portfolio:root /home/portfolio-ss/*

COPY sshd_config /etc/ssh/sshd_config

EXPOSE 2222
# CMD ["/usr/sbin/sshd", "-D", "-e"]
ENTRYPOINT ["/entrypoint.sh"]