FROM node:alpine

ARG UID=1001

RUN apk add --no-cache \
    openssh-server \
    iptables

RUN ssh-keygen -A

RUN mkdir -p /var/run/sshd

COPY src/ /home/portfolio-ss/src/
COPY bin/portfolio-shell /home/portfolio-ss/bin/
RUN chmod +x /home/portfolio-ss/bin/portfolio-shell

RUN adduser -D -u ${UID} -G root -s /home/portfolio-ss/bin/portfolio-shell portfolio && \
    chown -R portfolio:root /home/portfolio-ss

COPY sshd_config /etc/ssh/sshd_config
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 22
ENTRYPOINT ["/entrypoint.sh"]