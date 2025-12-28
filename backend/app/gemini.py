import os
from dotenv import load_dotenv
import json
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted
from app.prompts import single_prompt

load_dotenv()

genai.configure()
# Use stable model
model = genai.GenerativeModel("gemini-2.5-flash")


def safe_json_parse(text: str):
    try:
        return json.loads(text)
    except Exception:
        print("⚠️ JSON PARSE FAILED")
        print(text)
        return None


def process_document(text: str):
    try:
        response_text = model.generate_content(
            single_prompt(text)
        ).text or ""

        data = safe_json_parse(response_text)

        # If Gemini misbehaves, return safe fallback
        if not isinstance(data, dict):
            return {
                "error": "INVALID_AI_OUTPUT",
                "missing_fields": [],
                "project": {},
                "tasks": {
                    "fresher": [],
                    "mid": [],
                    "senior": []
                }
            }

        # Normalize output (frontend-safe)
        return {
            "missing_fields": data.get("missing_fields", []),
            "project": data.get("project", {}),
            "tasks": {
                "fresher": data.get("tasks", {}).get("fresher", []),
                "mid": data.get("tasks", {}).get("mid", []),
                "senior": data.get("tasks", {}).get("senior", [])
            }
        }

    except ResourceExhausted:
        return {
            "error": "GEMINI_QUOTA_EXCEEDED",
            "message": "Gemini API quota exceeded. Please try later.",
            "missing_fields": [],
            "project": {},
            "tasks": {
                "fresher": [],
                "mid": [],
                "senior": []
            }
        }

    except Exception as e:
        print("Unexpected error:", e)
        return {
            "error": "INTERNAL_ERROR",
            "missing_fields": [],
            "project": {},
            "tasks": {
                "fresher": [],
                "mid": [],
                "senior": []
            }
        }
