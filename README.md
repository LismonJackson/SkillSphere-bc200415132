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
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
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
│   ├── career_paths.py        # Predefined career paths data
│   ├── recommendation.py      # Recommendation engine
│   ├── requirements.txt       # Python dependencies
│   └── config.py              # Configuration settings (optional)
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
- MongoDB Community Edition

### MongoDB Setup
1. Download and install MongoDB Community Edition from the [official MongoDB website](https://www.mongodb.com/try/download/community)

2. For Windows:
   - During installation, make sure to select "Install MongoDB as a Service"
   - Keep the default data directory path (C:\Program Files\MongoDB\Server\X.X\data) or set a custom path
   - After installation, MongoDB service should start automatically

3. For macOS (using Homebrew):
   ```
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

4. For Linux (Ubuntu/Debian):
   ```
   sudo apt update
   sudo apt install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

5. Verify MongoDB is running:
   - Open a command prompt/terminal and enter:
   ```
   mongo
   ```
   - If MongoDB is running, you should see the MongoDB shell

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

4. Start the Flask server:
   ```
   python app.py
   ```
   - The server will run on http://localhost:5000

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
   - The application will open in your browser at http://localhost:3000

## Troubleshooting MongoDB

### MongoDB Connection Issues
If you encounter MongoDB connection errors:

1. Check if MongoDB service is running:
   - Windows: Open Services (services.msc) and check MongoDB service status
   - Linux/macOS: `sudo systemctl status mongodb` or `brew services list`

2. Manual MongoDB startup:
   ```
   mongod --dbpath C:\data\db  # Windows (create this directory if it doesn't exist)
   mongod --dbpath /data/db    # Linux/macOS (create with sudo mkdir -p /data/db)
   ```

3. Connection string issues:
   - Check the connection string in app.py: `mongodb://localhost:27017/career_counseling`
   - If MongoDB runs on a different port, update accordingly

4. If you still can't connect to MongoDB, consider using SQLite as a fallback (see alternative implementation in the code).

## Usage

1. Create a user profile by filling out the form with:
   - Name
   - Email
   - Educational background
   - Skills (comma-separated)
   - Interests (comma-separated)
   - Career goals

2. View your career recommendations on the dashboard:
   - Top recommendation with match score
   - Potential job roles
   - Skills to develop

3. Explore detailed recommendations in the Recommendations section:
   - All matching career paths
   - Color-coded skill matching
   - Skill gaps to address

## Future Enhancements

- Implement advanced AI algorithms for more personalized recommendations
- Add skills gap analysis and course recommendations
- Integrate job market analysis and trend reporting
- Implement interactive career guidance with a chatbot interface
- Develop more comprehensive career planning tools