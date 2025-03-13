from pymongo import MongoClient
from collections import Counter

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.career_counseling
career_paths = db.career_paths

def get_career_recommendations(user_skills, user_interests, num_recommendations=3):
    """
    A simple recommendation system that matches users to career paths based on their skills and interests.
    
    Args:
        user_skills (list): List of user's skills
        user_interests (list): List of user's interests
        num_recommendations (int, optional): Number of recommendations to return. Defaults to 3.
        
    Returns:
        list: List of recommended career paths with scores
    """
    # Get all career paths from the database
    all_paths = list(career_paths.find())
    recommendations = []
    
    # Convert user skills and interests to lowercase for case-insensitive matching
    user_skills_lower = [skill.lower() for skill in user_skills]
    user_interests_lower = [interest.lower() for interest in user_interests]
    
    for path in all_paths:
        # Calculate skill match score (out of 100)
        path_skills_lower = [skill.lower() for skill in path.get('required_skills', [])]
        skill_matches = sum(1 for skill in user_skills_lower if any(path_skill in skill or skill in path_skill for path_skill in path_skills_lower))
        total_skills = max(len(path_skills_lower), 1)  # Avoid division by zero
        skill_score = (skill_matches / total_skills) * 100
        
        # Calculate interest match score (out of 100)
        path_interests_lower = [interest.lower() for interest in path.get('related_interests', [])]
        interest_matches = sum(1 for interest in user_interests_lower if any(path_interest in interest or interest in path_interest for path_interest in path_interests_lower))
        total_interests = max(len(path_interests_lower), 1)  # Avoid division by zero
        interest_score = (interest_matches / total_interests) * 100
        
        # Calculate overall match score (weighted average)
        # Skills have slightly higher weight than interests
        overall_score = (skill_score * 0.6) + (interest_score * 0.4)
        
        recommendations.append({
            'career_path_id': str(path['_id']),
            'title': path['title'],
            'description': path['description'],
            'match_score': round(overall_score, 2),
            'job_prospects': path.get('job_prospects', []),
            'required_skills': path.get('required_skills', []),
            'skill_gap': [skill for skill in path.get('required_skills', []) 
                          if skill.lower() not in user_skills_lower and 
                          not any(user_skill in skill.lower() for user_skill in user_skills_lower)]
        })
    
    # Sort recommendations by match score (highest first)
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)
    
    # Return top N recommendations
    return recommendations[:num_recommendations]

def get_skill_recommendations(user_skills, recommended_career_paths):
    """
    Recommends skills to learn based on the user's recommended career paths.
    
    Args:
        user_skills (list): List of user's current skills
        recommended_career_paths (list): List of recommended career paths
        
    Returns:
        list: List of skills to learn
    """
    # Collect all required skills from recommended career paths
    all_required_skills = []
    for path in recommended_career_paths:
        all_required_skills.extend(path.get('required_skills', []))
    
    # Count occurrences of each skill
    skill_counter = Counter(all_required_skills)
    
    # Filter out skills the user already has
    user_skills_lower = [skill.lower() for skill in user_skills]
    skills_to_learn = []
    
    for skill, count in skill_counter.items():
        if skill.lower() not in user_skills_lower:
            skills_to_learn.append({
                'skill': skill,
                'frequency': count
            })
    
    # Sort by frequency (most common skills first)
    skills_to_learn.sort(key=lambda x: x['frequency'], reverse=True)
    
    return skills_to_learn