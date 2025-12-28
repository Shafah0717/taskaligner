import re

def infer_experience_level(text: str):
    text = text.lower()

    years = re.findall(r"(\d+)\+?\s+years", text)
    years = int(years[0]) if years else 0

    if "senior" in text or years >= 5:
        return "senior"
    elif years <= 1:
        return "fresher"
    else:
        return "mid"
