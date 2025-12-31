# cateste002

A Custom Activity for Salesforce Marketing Cloud Journey Builder.

## Overview

This Custom Activity was generated using [CA Hub](https://cahub.dev).

- **Type:** rest
- **Version:** 1.0.0
- **Broker:** Zenvia SMS

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file and configure:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your configuration values.

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel

1. Push this code to a GitHub repository
2. Import the project in Vercel
3. Add environment variables from `.env.example`
4. Deploy

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables
6. Deploy

## Marketing Cloud Setup

1. Go to **Setup → Apps → Installed Packages**
2. Create a new package or edit an existing one
3. Add Component → **Journey Builder Activity**
4. Enter your config.json URL: `https://your-domain.com/config.json`
5. Save and test in Journey Builder

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/config.json` | GET | Activity configuration |
| `/save` | POST | Save activity settings |
| `/publish` | POST | Called when journey is published |
| `/validate` | POST | Validate activity configuration |
| `/stop` | POST | Called when journey is stopped |
| `/execute` | POST | Main activity execution |
| `/health` | GET | Health check |

## InArguments

- `contactKey` (Text) - Unique identifier for the contact
- `phoneNumber` (Phone) - Contact phone number
- `message` (Text) - Message content to send

## OutArguments

No output arguments defined.

## Support

For issues and feature requests, please contact support or visit [CA Hub](https://cahub.dev).

---

Generated with ❤️ by CA Hub
