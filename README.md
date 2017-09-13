# Secure distributed storage System

## Required env vars

- `PORT` Integer for HTTP Server Port
- `INTERNAL_KEY` API_KEY for internal communication (same for all servers)
- `PUBLIC_KEY_HASH` Bcrypt hash of webui password
- `FILE_PATH` Absolute Path to folder for file storage
- `SERVERS` Array of information about other servers in the network. Looks like:

    `[{"ip": "1.2.3.4"}, {"ip": "5.6.7.8"}]`

## Installation & Usage

1. make sure to have nodejs >=8.x and npm installed
2. `npm install` inside the project folder to install the node modules
3. `VAR1=VAL1 VAR2=VAL2 node .` where `VARX` is the name of an  env variable and `VALX` its value.