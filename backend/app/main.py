from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil, uuid
from app.storage import save_project, get_projects, update_project

from app.loaders import load_pdf
from app.schemas import InputText
from app.gemini import process_document
from app.resume_parser import parse_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 SINGLE SOURCE OF TRUTH (MVP)
developers = []
projects = []



@app.post("/process")
async def process(input: InputText):
    return process_document(input.text)


@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    file_path = f"/tmp/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = load_pdf(file_path)
    return process_document(text)


@app.post("/parse-resume")
async def upload_resume(file: UploadFile = File(...)):
    # 🔥 RESET FILE POINTER
    file.file.seek(0)

    parsed = parse_resume(file)

    developer = {
        "id": str(uuid.uuid4()),
        "name": parsed.get("name", "Unknown Developer"),
        "experience_level": parsed.get("experience_level", "fresher"),
        "approved_skills": [],
        "inferred_skills": parsed.get("inferred_skills", {}),
        "missing_info": parsed.get("missing_info", []),
        "notes": "",
        "status": "UNVERIFIED"
    }

    developers.append(developer)
    return {"success": True, "id": developer["id"]}


@app.get("/developers")
def get_developers():
    return developers


@app.post("/approve-developer")
def approve_developer(dev: dict):
    for i, d in enumerate(developers):
        if d["id"] == dev["id"]:
            developers[i] = dev  # 🔥 FULL OVERWRITE
            return {"success": True}

    return {"error": "Developer not found"}


@app.post("/create-project")
def create_project(data: dict):
    print("🔥 DATA RECEIVED:", data)

    project_data = data.get("project", {})

    # ✅ SAFE project name extraction
    project_name = (
        project_data.get("project_name")
        or project_data.get("name")
        or project_data.get("title")
        or "Untitled Project"
    )

    project = {
        "id": str(uuid.uuid4()),
        "name": project_name,
        "timeline": project_data.get("timeline", "Not specified"),
        "status": "IN_PROGRESS",
        "summary": project_data,
        "tasks": data.get("tasks", {}),
        "assignments": {}
    }

    save_project(project)
    return project

@app.post("/update-project")
def update_project(data: dict):
    for i, project in enumerate(projects):
        if project["id"] == data["id"]:

            # 🔥 Normalize + collect all tasks
            all_tasks = []
            for level in ["fresher", "mid", "senior"]:
                for task in data["tasks"].get(level, []):
                    if isinstance(task, dict):
                        all_tasks.append(task)
                    else:
                        all_tasks.append({
                            "title": task,
                            "completed": False
                        })

            # 🔥 Determine project status
            if all_tasks and all(t.get("completed") is True for t in all_tasks):
                data["status"] = "COMPLETED"
            else:
                data["status"] = "IN_PROGRESS"

            projects[i] = data
            return data   # 🔥 RETURN UPDATED PROJECT

    return {"error": "Project not found"}

@app.get("/projects")
def list_projects():
    return get_projects()


# @app.post("/assign-task")
# def assign_task(data: dict):
#     for project in get_projects():
#         if project["id"] == data["project_id"]:
#             project["assignments"][data["task_id"]] = data["developer_id"]
#             update_project(project)
#             return {"success": True}

#     return {"error": "Project not found"}