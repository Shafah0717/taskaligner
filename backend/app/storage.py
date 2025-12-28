DEVELOPERS = {}
developers = []


projects = []

def save_project(project: dict):
    projects.append(project)

def get_projects():
    return projects

def update_project(updated_project: dict):
    for i, p in enumerate(projects):
        if p["id"] == updated_project["id"]:
            projects[i] = updated_project
            return True
    return False

def save_developer(dev_id, data):
    DEVELOPERS[dev_id] = data

def get_developers():
    return list(DEVELOPERS.values())
