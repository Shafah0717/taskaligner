from .skills import SKILL_KEYWORDS

def infer_skills(text: str):
    text = text.lower()
    inferred = {}
    
    for category, keywords in SKILL_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                inferred.setdefault(category, []).append(kw)

    return inferred
