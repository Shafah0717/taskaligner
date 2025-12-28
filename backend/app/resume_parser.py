import pdfplumber
import re


# --------- SKILL KEYWORDS (EXTENDABLE) ---------

SKILL_KEYWORDS = {
    "payments": ["stripe", "razorpay", "paypal"],
    "security": ["jwt", "oauth", "authentication", "authorization"],
    "backend": ["django", "fastapi", "node", "express"],
    "frontend": ["react", "vue", "angular"],
    "database": ["postgres", "mysql", "mongodb"],
    "cloud": ["aws", "docker", "kubernetes"]
}


# --------- MAIN PARSER ---------

def parse_resume(file):
    text = extract_text_from_pdf(file)
    text_lower = text.lower()

    name = extract_name(text)
    inferred_skills = extract_skills(text_lower)
    experience_level = infer_experience(text_lower)
    missing_info = detect_missing_info(text_lower)

    return {
        "name": name or "Unknown Developer",
        "experience_level": experience_level,
        "inferred_skills": inferred_skills,
        "missing_info": missing_info
    }


# --------- HELPERS ---------

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def extract_name(text):
    """
    Best-effort name detection:
    - First non-empty line
    - Exclude email/phone lines
    """
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        if any(x in line.lower() for x in ["@", "phone", "+91", "email"]):
            continue
        if len(line.split()) <= 4:
            return line
    return None


def extract_skills(text):
    inferred = {}

    for category, keywords in SKILL_KEYWORDS.items():
        found = []
        for kw in keywords:
            if kw in text:
                found.append(kw)
        if found:
            inferred[category] = found

    return inferred


def infer_experience(text):
    """
    Simple heuristic:
    - years mentioned → mid/senior
    """
    match = re.search(r"(\d+)\+?\s+years", text)
    if match:
        years = int(match.group(1))
        if years >= 5:
            return "senior"
        if years >= 2:
            return "mid"
        return "fresher"

    # fallback keywords
    if "senior" in text:
        return "senior"
    if "intern" in text or "fresher" in text:
        return "fresher"

    return "mid"


def detect_missing_info(text):
    missing = []

    if "scalability" not in text:
        missing.append("scalability_experience")

    if "mentor" not in text and "lead" not in text:
        missing.append("mentoring_experience")

    if "security" not in text and "jwt" not in text:
        missing.append("security_experience")

    return missing
