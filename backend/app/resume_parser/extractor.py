import re
from .experience import infer_experience_level
from .inference import infer_skills

def extract_resume_profile(text: str):
    email = re.findall(r"\S+@\S+", text)
    email = email[0] if email else ""

    name = text.split("\n")[0][:50]

    experience_level = infer_experience_level(text)
    inferred_skills = infer_skills(text)

    missing = []
    if "security" not in inferred_skills:
        missing.append("security_experience")
    if "payments" not in inferred_skills:
        missing.append("payment_systems")

    return {
        "name": name,
        "email": email,
        "experience_level": experience_level,
        "inferred_skills": inferred_skills,
        "missing_info": missing,
        "status": "UNVERIFIED"
    }
