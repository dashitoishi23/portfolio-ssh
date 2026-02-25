# SSH Portfolio Setup Guide

## Quick Start

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Set up the shell as a restricted user (see below)

3. Configure SSH to use this shell (see below)

---

## Server Setup

### 1. Create a dedicated user

```bash
sudo adduser portfolio
# Follow prompts, set a strong password or leave blank if using key-only auth
```

### 2. Copy the portfolio files

```bash
sudo cp -r /path/to/portfolio-ssh /home/portfolio/portfolio
sudo chown -R portfolio:portfolio /home/portfolio/portfolio
```

### 3. Make the shell executable

```bash
sudo chmod +x /home/portfolio/portfolio/bin/portfolio-shell
```

### 4. Add to allowed shells

```bash
echo "/home/portfolio/portfolio/bin/portfolio-shell" | sudo tee -a /etc/shells
```

### 5. Set as default shell for user

```bash
sudo usermod -s /home/portfolio/portfolio/bin/portfolio-shell portfolio
```

### 6. Configure SSH (recommended security settings)

Edit `/etc/ssh/sshd_config` and add:

```
# Restrict to this user only
AllowUsers portfolio

# Disable password auth (recommended - key-only)
PasswordAuthentication no

# Disable root login
PermitRootLogin no

# Use strong key exchange
KexAlgorithms curve25519-sha256,ecdh-sha2-nistp256

# Disable unused auth methods
ChallengeResponseAuthentication no
PubkeyAuthentication yes
```

Then restart SSH:
```bash
sudo systemctl restart sshd
```

---

## Security Checklist

For Docker deployment (recommended):

- [ ] Container runs as non-root user
- [ ] Read-only filesystem enabled
- [ ] All capabilities dropped
- [ ] Memory limit set (128MB)
- [ ] Process limit set (50)
- [ ] No new privileges allowed
- [ ] Connection rate limiting (iptables)
- [ ] Host firewall allows only port 22
- [ ] No sensitive data in content files

---

## Testing Locally

To test the CLI without SSH:

```bash
./bin/portfolio-shell
```

---

## Docker Deployment (Recommended)

This is the recommended approach - run everything in an isolated container.

### Build the Image

```bash
docker build -t portfolio-ssh .
```

### Run the Container

```bash
docker run -d \
  --name portfolio-ssh \
  --cap-drop ALL \
  --security-opt=no-new-privileges:true \
  --pids-limit=50 \
  --memory=128m \
  --cpu-quota=10000 \
  -p 22:22 \
  portfolio-ssh
```

Then connect with:
```bash
ssh -p 2222 <any-user>@localhost
```

### Connect from Remote

If running on a server with port 2222 exposed:
```bash
ssh -p 2222 anyone@your-domain.com
```

### Security Features

| Feature | Implementation |
|---------|---------------|
| No authentication | ForceCommand to CLI, no shell |
| Rate limiting | iptables: 10 conns/IP/minute |
| Filesystem | Read-only container |
| Capabilities | Dropped all |
| Memory limit | 128MB |
| Process limit | 50 processes max |
| Network | Host port mapped (rate limited) |
| Privilege escalation | Blocked |

### Production Deployment

On your server, expose port 22:

```bash
docker run -d \
  --name portfolio-ssh \
  --read-only \
  --cap-drop ALL \
  --security-opt=no-new-privileges:true \
  --pids-limit=50 \
  --memory=128m \
  --cpu-quota=10000 \
  -p 22:22 \
  portfolio-ssh
```

Then users connect with:
```bash
ssh user@your-domain.com
```

### Content Management (Docker)

To update content, edit files in `src/content/` and rebuild:

```bash
docker build -t portfolio-ssh .
docker stop portfolio-ssh && docker rm portfolio-ssh
docker run -d [same args as above] portfolio-ssh
```

---

## Content Management

Edit files in `src/content/`:
- `about.txt` - Introduction
- `projects.txt` - Your projects
- `experience.txt` - Work history
- `skills.txt` - Technical skills
- `contact.txt` - Contact details
- `connect.txt` - Social links
