import Cloudflare from "cloudflare";

const apiEmail = process.env["CLOUDFLARE_EMAIL"];
const apiKey = process.env["CLOUDFLARE_API_KEY"];
const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
const zoneId = process.env["CLOUDFLARE_ZONE_ID"];

if (!apiEmail) {
  throw new Error("CLOUDFLARE_EMAIL is required");
}

if (!apiKey) {
  throw new Error("CLOUDFLARE_API_KEY is required");
}

if (!accountId) {
  throw new Error("CLOUDFLARE_ACCOUNT_ID is required");
}

if (!zoneId) {
  throw new Error("CLOUDFLARE_ZONE_ID is required");
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
  return client.zeroTrust.tunnels.create({
    account_id: accountId as string,
    tunnel_secret: tunnelSecret,
    name,
  });
}

export async function getTunnelConfiguration(tunnelId: string) {
  return client.zeroTrust.tunnels.configurations.get(tunnelId, {
    account_id: accountId as string,
  }) as Promise<{
    tunnel_id: string;
    version: number;
    config: {
      ingress: { id: string; hostname: string; service: string }[];
    };
    source: string;
    created_at: string;
  }>;
}

export function updateTunnelConfiguration({
  tunnelId,
  ingress,
}: {
  tunnelId: string;
  ingress: { hostname: string; service: string }[];
}) {
  return client.zeroTrust.tunnels.configurations.update(tunnelId, {
    account_id: accountId as string,
    config: { ingress },
  });
}

export function deleteTunnel(tunnelId: string) {
  return client.zeroTrust.tunnels.delete(tunnelId, {
    account_id: accountId as string,
  });
}

export function createDnsRecord({
  domainName,
  hostname,
}: {
  domainName: string;
  hostname: string;
}) {
  return client.dns.records.create({
    type: "CNAME",
    content: hostname,
    name: domainName,
    zone_id: zoneId as string,
    proxied: true,
  });
}

export function deleteDnsRecord(recordId: string) {
  return client.dns.records.delete(recordId, {
    zone_id: zoneId as string,
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
  return client.dns.records.update(recordId, {
    type: "CNAME",
    content: hostname,
    name: domainName,
    zone_id: zoneId as string,
    proxied: true,
  });
}