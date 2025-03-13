from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import json
from recommendation import get_career_recommendations
from career_paths import get_career_paths  # Import career paths from separate file

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/career_counseling"
mongo = PyMongo(app)
CORS(app)

# MongoDB collections
users = mongo.db.users
career_paths = mongo.db.career_paths

# Helper function to convert MongoDB ObjectId to string
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# Initialize career paths from the imported module
@app.before_first_request
def initialize_career_paths():
    if career_paths.count_documents({}) == 0:
        # Get predefined paths from the separate module
        predefined_paths = get_career_paths()
        
        for path in predefined_paths:
            career_paths.insert_one(path)
        
        print("Initialized predefined career paths")

# User profile routes
@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = request.json
    
    # Validate required fields
    required_fields = ['name', 'email', 'education', 'skills', 'interests', 'careerGoals']
    for field in required_fields:
        if field not in user_data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Check if user already exists
    if users.find_one({"email": user_data['email']}):
        return jsonify({"error": "User with this email already exists"}), 409
    
    # Insert user data
    result = users.insert_one(user_data)
    
    # Generate initial recommendations
    recommendations = get_career_recommendations(user_data['skills'], user_data['interests'])
    
    # Update user with recommendations
    users.update_one(
        {"_id": result.inserted_id},
        {"$set": {"recommendations": recommendations}}
    )
    
    # Fetch updated user data
    user = users.find_one({"_id": result.inserted_id})
    
    return JSONEncoder().encode(user), 201

@app.route('/api/users/<email>', methods=['GET'])
def get_user(email):
    user = users.find_one({"email": email})
    if user:
        return JSONEncoder().encode(user)
    return jsonify({"error": "User not found"}), 404

@app.route('/api/users/<email>', methods=['PUT'])
def update_user(email):
    user_data = request.json
    
    # Update user information
    result = users.update_one({"email": email}, {"$set": user_data})
    
    if result.matched_count:
        updated_user = users.find_one({"email": email})
        
        # Re-generate recommendations if skills or interests were updated
        if 'skills' in user_data or 'interests' in user_data:
            updated_user_data = users.find_one({"email": email})
            recommendations = get_career_recommendations(
                updated_user_data['skills'], 
                updated_user_data['interests']
            )
            
            users.update_one(
                {"email": email},
                {"$set": {"recommendations": recommendations}}
            )
            
            updated_user = users.find_one({"email": email})
        
        return JSONEncoder().encode(updated_user)
    
    return jsonify({"error": "User not found"}), 404

# Career recommendation route
@app.route('/api/recommendations/<email>', methods=['GET'])
def get_recommendations(email):
    user = users.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if "recommendations" not in user or not user["recommendations"]:
        recommendations = get_career_recommendations(user['skills'], user['interests'])
        
        # Update user with recommendations
        users.update_one(
            {"email": email},
            {"$set": {"recommendations": recommendations}}
        )
        
        user = users.find_one({"email": email})
    
    return jsonify(user.get("recommendations", []))

# Career paths routes
@app.route('/api/career-paths', methods=['GET'])
def get_all_career_paths():
    all_paths = list(career_paths.find())
    return JSONEncoder().encode(all_paths)

@app.route('/api/career-paths/<path_id>', methods=['GET'])
def get_career_path(path_id):
    path = career_paths.find_one({"_id": ObjectId(path_id)})
    if path:
        return JSONEncoder().encode(path)
    return jsonify({"error": "Career path not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)