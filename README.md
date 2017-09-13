# Secure distributed storage System

## Required env vars

- `PORT` Integer for HTTP Server Port
- `INTERNAL_KEY` API_KEY for internal communication (same for all servers)
- `PUBLIC_KEY_HASH` Bcrypt hash of webui password
- `SERVERS` Array of information about other servers in the network. Looks like:

    [{"ip": "1.2.3.4"}, {"ip": "5.6.7.8"}]