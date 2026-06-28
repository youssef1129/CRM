FROM jenkins/jenkins:lts-jdk17

USER root

# ── 1. Base tools ───────────────────────────────────────────────────────────
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg gosu unzip && \
    rm -rf /var/lib/apt/lists/*

# ── 2. Docker CLI (to run docker build / push from pipeline stages) ─────────
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli && \
    rm -rf /var/lib/apt/lists/*

# ── 3. Terraform ─────────────────────────────────────────────────────────────
ARG TERRAFORM_VERSION=1.8.5
RUN curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip" \
        -o /tmp/terraform.zip && \
    unzip /tmp/terraform.zip -d /usr/local/bin && \
    rm /tmp/terraform.zip && \
    terraform version

# ── 4. Entrypoint (fixes Docker socket GID at runtime) ───────────────────────
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Stay as root — entrypoint drops to jenkins after fixing groups
USER root
ENTRYPOINT ["/entrypoint.sh"]