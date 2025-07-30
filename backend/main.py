import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

load_dotenv()

WHATSAPP_API_URL = "https://graph.facebook.com/v19.0"
PHONE_NUMBER_ID = os.getenv("WA_PHONE_NUMBER_ID")
ACCESS_TOKEN = os.getenv("WA_ACCESS_TOKEN")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TemplateSubmission(BaseModel):
    name: str
    language: str
    category: str
    body: str

@app.post("/templates/submit")
def submit_template(tpl: TemplateSubmission):
    url = f"{WHATSAPP_API_URL}/{PHONE_NUMBER_ID}/message_templates"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    data = {
        "name": tpl.name,
        "language": tpl.language,
        "category": tpl.category,
        "components": [
            {
                "type": "BODY",
                "text": tpl.body
            }
        ]
    }
    resp = requests.post(url, headers=headers, json=data)
    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.json())
    return resp.json()

@app.get("/templates/approved")
def get_approved_templates():
    url = f"{WHATSAPP_API_URL}/{PHONE_NUMBER_ID}/message_templates"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    resp = requests.get(url, headers=headers)
    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.json())
    templates = resp.json().get("data", [])
    approved = [tpl for tpl in templates if tpl.get("status") == "APPROVED"]
    return {"approved_templates": approved}