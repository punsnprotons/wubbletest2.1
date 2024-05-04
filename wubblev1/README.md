## Requirements

- OS: Linux or Windows 10+ / OSX 14+
- NodeJS: v18+
- Database is using Sqlite, a file-based SQL database
  - MySQL DB

### Installing NodeJS

1. use this link to download on Windows machine https://nodejs.org/dist/v18.19.1/node-v18.19.1-64.msi

2. run the `msi` file to install, accept all default settings

### Installing MySQL

Follow the video below to install on Windows machine

https://www.youtube-nocookie.com/embed/h6DEDm7C37A


## External Requirements

The following external services are required
- OpenAI - https://openai.com
- Pinecone - https://www.pinecone.io
- Replicate - https://replicate.com
- Rytr - https://rytr.me
- Sendgrid - https://sendgrid.com

The config settings for the above services are found in the following properties in the config file:

OPENAI_API_KEY
PINECONE_API_KEY
REPLICATE_API_TOKEN
RYTR_API_KEY
SENDGRID_KEY
SENDGRID_SENDER
SENDGRID_DEFAULT_TEMPLATE


## Setup Instructions

Unzip source files

### Populate the DB

Use PHPMyAdmin in xampp to create the schema and data using this file `wubble-prod-03_19_2024.sql`

### Build and run frontend

From project root directory

```
cd frontend
npm i
npm run start
```

### Build and run backend

From project root directory

```
cd backend
npm i
cd @es-labs/node
npm i
cd ../..
npm run dev
```
# wubblev1
# wubbledo
