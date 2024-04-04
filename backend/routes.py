from flask import request, jsonify, Flask
from Users import User
from Projects import Project

app= Flask(__name__)

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

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    project_id = data.get('projectID')
    amount = data.get('amount')
    set_number = data.get('set')
    
    if amount < 0:
        return jsonify({"message": "Invalid amount"}), 400
    
    project = Project.objects(projectID=project_id).first()
    if not project:
        return jsonify({"message": "Project Not Found"}), 400
    
    main_project = Project.objects(ID="main").first()
    if not main_project:
        return jsonify({"message": "Main Project Set not found"}), 400
    
    if set_number == 1:
        if main_project.availability1 - amount < 0:
            return jsonify({"message": "No More availability in set 1"}), 400
        main_project.update(dec__availability1=amount)
    elif set_number == 2:
        if main_project.availability2 - amount < 0:
            return jsonify({"message": "No More availability in set 2"}), 400
        main_project.update(dec__availability2=amount)
    else:
        return jsonify({"message": "Invalid set number"}), 400
    
    return jsonify({"message": "Checkout successful"}), 200

@app.route('/adduser', methods=['POST'])
def add_user():
    data = request.json
    email = data.get('email')
    user_id = data.get('userId')
    password = data.get('password')
    
    # Check if the email or userId already exists
    if User.objects(email=email).first() or User.objects(userId=user_id).first():
        return jsonify({"message": "User already exists"}), 400
    
    new_user = User(email=email, userId=user_id)
    new_user.encrypt(password)
    new_user.save()
    
    return jsonify({"message": "User added successfully"}), 201
