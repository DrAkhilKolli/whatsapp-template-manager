# WhatsApp Template Manager

A ready-to-deploy full stack app to build, submit, and list WhatsApp message templates with automatic Meta Cloud API integration.

---

## Features

- Build and submit new WhatsApp templates for approval via Meta API
- Fetch and list all approved templates from Meta
- FastAPI backend + React (Vite) frontend

---

## Quick Start

### 1. Clone and setup

```
git clone https://github.com/YOUR_USER/whatsapp-template-manager.git
cd whatsapp-template-manager
```

### 2. Backend

```
cd backend
cp .env.example .env    # Fill your WhatsApp phone number ID and permanent access token
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend

```
cd ../frontend
npm install
npm run dev
```

- Frontend runs on [localhost:5173](http://localhost:5173)
- Backend runs on [localhost:8000](http://localhost:8000)

---

## WhatsApp Cloud API Setup

- Get a [permanent access token](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- Find your **WhatsApp Business Phone Number ID** in [Meta Business Manager](https://business.facebook.com/wa/manage/message-templates/)
- Set these in `backend/.env`

---

## Notes

- Some template fields/categories require additional API fields (see Meta docs for advanced templates)
- This repo is for demo and dev use; for production, add authentication, error handling, and secure .env management
- Not affiliated with Meta / WhatsApp

---