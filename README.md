# AI Career Counseling Platform - Prototype

This is the prototype implementation for an AI-powered Career Counseling Platform. This prototype fulfills the basic requirements for the CS619 Prototype Phase Assignment.

## Features Implemented

### 1. User Profile Creation
- Web-based form for creating user profiles
- Collection of personal information, educational background, skills, interests, and career goals
- Data storage in MongoDB

### 2. Basic Career Path Recommendation
- Simple recommendation system that suggests career paths based on user input
- Predefined career paths (Data Science, Web Development, Cybersecurity, etc.)
- Matching users to career paths based on their skills and interests
- Display of career recommendations on the user dashboard

### 3. Basic Frontend and Backend Development
- React for the frontend
- Flask for the backend
- Basic UI for profile creation and recommendation display
- Proper data flow between frontend and backend

## Project Structure

```
career-counseling-platform/
├── frontend/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileForm.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Recommendations.js
│   │   │   └── Navigation.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── package.json
│   └── README.md
├── backend/                   # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database models
│   ├── recommendation.py      # Recommendation engine
│   ├── config.py              # Configuration settings
│   └── requirements.txt       # Python dependencies
└── README.md
```

## Technologies Used

### Frontend
- React
- React Router DOM
- Bootstrap
- Axios

### Backend
- Flask
- Flask-CORS
- Flask-PyMongo
- MongoDB

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.7+
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Make sure MongoDB is running on your local machine on the default port (27017).

5. Start the Flask server:
   ```
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`.

## Usage

1. Create a user profile by filling out the form.
2. View your career recommendations on the dashboard.
3. Explore detailed recommendations in the Recommendations section.

## Future Enhancements

- Implement advanced AI algorithms for more personalized recommendations
- Add skills gap analysis and course recommendations
- Integrate job market analysis and trend reporting
- Implement interactive career guidance with a chatbot interface
- Develop more comprehensive career planning tools