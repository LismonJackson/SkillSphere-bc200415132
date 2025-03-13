import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch recommendations on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations/${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user.email]);
  
  // Get the top recommendation
  const topRecommendation = recommendations.length > 0 ? recommendations[0] : null;
  
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Welcome, {user.name}!</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Profile</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Education:</strong> {user.education}
                </li>
                <li className="list-group-item">
                  <strong>Skills:</strong> {user.skills.join(', ')}
                </li>
                <li className="list-group-item">
                  <strong>Interests:</strong> {user.interests.join(', ')}
                </li>
                <li className="list-group-item">
                  <strong>Career Goals:</strong> {user.careerGoals}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Top Career Recommendation</h5>
              
              {topRecommendation ? (
                <>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {topRecommendation.title} 
                    <span className="badge bg-success ms-2">
                      {topRecommendation.match_score}% Match
                    </span>
                  </h6>
                  <p className="card-text">{topRecommendation.description}</p>
                  
                  <h6>Potential Job Roles:</h6>
                  <ul>
                    {topRecommendation.job_prospects.map((job, index) => (
                      <li key={index}>{job}</li>
                    ))}
                  </ul>
                  
                  {topRecommendation.skill_gap.length > 0 && (
                    <>
                      <h6>Skills to Develop:</h6>
                      <ul>
                        {topRecommendation.skill_gap.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <p className="card-text">No recommendations available yet.</p>
              )}
            </div>
            <div className="card-footer">
              <Link to="/recommendations" className="btn btn-primary">
                View All Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;