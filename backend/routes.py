from flask import request, jsonify
from models import User, Project
from app import app, db, bcrypt

@app.route('/getuserdata', methods=['POST'])
def get_user_data():
    user_id = request.json.get('userId')
    user = User.objects(userId=user_id).first()
    if user:
        return jsonify(user.to_json())
    else:
        return jsonify({"message": "Account Not Found"}), 400

@app.route('/createproject', methods=['POST'])
def create_project():
    data = request.json
    if Project.objects(projectID=data.get('projectID')).first():
        return jsonify({"message": "projectID already exists"}), 400
    new_project = Project(
        projectName=data.get('projectName'),
        owner=data.get('owner'),
        description=data.get('description'),
        projectID=data.get('projectID'),
    ).save()
    # Update the user's joinedProjects list
    User.objects(email=data.get('owner')).update_one(push__joinedProjects=data.get('projectID'))
    return jsonify(new_project.to_json()), 201

@app.route('/viewallprojects', methods=['POST'])
def view_all_projects():
    projects = Project.objects()
    if projects:
        return jsonify(projects.to_json())
    else:
        return jsonify({"message": "Projects Not Found"}), 400

@app.route('/joinproject', methods=['POST'])
def join_project():
    data = request.json
    user = User.objects(email=data.get('email')).first()
    if not user:
        return jsonify({"message": "Account Not Found"}), 400
    project = Project.objects(projectID=data.get('projectID')).first()
    if not project:
        return jsonify({"message": "Project Not Found"}), 400
    if data.get('projectID') in user.joinedProjects:
        return jsonify({"message": "Project Already Joined"}), 400
    user.update(push__joinedProjects=data.get('projectID'))
    return jsonify({"message": "Joined project successfully"}), 200

# Additional route implementations will follow the patterns established here.
