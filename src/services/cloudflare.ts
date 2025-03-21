import Cloudflare from "cloudflare";

const apiEmail = process.env["CLOUDFLARE_EMAIL"];
const apiKey = process.env["CLOUDFLARE_API_KEY"];

if (!apiEmail) {
  throw new Error("CLOUDFLARE_EMAIL is required");
}

if (!apiKey) {
  throw new Error("CLOUDFLARE_API_KEY is required");
}

const client = new Cloudflare({
  apiEmail,
  apiKey,
});

export function createTunnel({
  name,
  tunnelSecret,
}: {
  name: string;
  tunnelSecret: string;
}) {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
  }

  return client.zeroTrust.tunnels.cloudflared.create({
    account_id: accountId,
    tunnel_secret: tunnelSecret,
    name,
  });
}

export async function getTunnelConfiguration(tunnelId: string) {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
  }

  return client.zeroTrust.tunnels.cloudflared.configurations.get(tunnelId, {
    account_id: accountId,
  });
}

export function updateTunnelConfiguration({
  tunnelId,
  ingress,
}: {
  tunnelId: string;
  ingress: { hostname: string; service: string }[];
}) {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
  }

  return client.zeroTrust.tunnels.cloudflared.configurations.update(tunnelId, {
    account_id: accountId,
    config: { ingress },
  });
}

export function deleteTunnel(tunnelId: string) {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
  }

  return client.zeroTrust.tunnels.cloudflared.delete(tunnelId, {
    account_id: accountId,
  });
}

export function getTunnelToken(tunnelId: string) {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
  }

  return client.zeroTrust.tunnels.cloudflared.token.get(tunnelId, {
    account_id: accountId,
  });
}

export function createDnsRecord({
  domainName,
  hostname,
}: {
  domainName: string;
  hostname: string;
}) {
  const zoneId = process.env["CLOUDFLARE_ZONE_ID"];
  if (!zoneId) {
    throw new Error("CLOUDFLARE_ZONE_ID is required");
  }

  return client.dns.records.create({
    type: "CNAME",
    content: hostname,
    name: domainName,
    zone_id: zoneId,
    proxied: true,
  });
}

export function deleteDnsRecord(recordId: string) {
  const zoneId = process.env["CLOUDFLARE_ZONE_ID"];
  if (!zoneId) {
    throw new Error("CLOUDFLARE_ZONE_ID is required");
  }

  return client.dns.records.delete(recordId, {
    zone_id: zoneId,
  });
}

export function updateDnsRecord({
  recordId,
  domainName,
  hostname,
}: {
  recordId: string;
  domainName: string;
  hostname: string;
}) {
  const zoneId = process.env["CLOUDFLARE_ZONE_ID"];
  if (!zoneId) {
    throw new Error("CLOUDFLARE_ZONE_ID is required");
  }

  return client.dns.records.update(recordId, {
    type: "CNAME",
    content: hostname,
    name: domainName,
    zone_id: zoneId,
    proxied: true,
  });
}
