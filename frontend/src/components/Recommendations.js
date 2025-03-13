import React, { useState, useEffect } from 'react';

const Recommendations = ({ user }) => {
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
      <h2 className="mb-4">Career Recommendations</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {recommendations.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No recommendations available yet. Please update your profile with more skills and interests.
        </div>
      ) : (
        <div className="row">
          {recommendations.map((recommendation, index) => (
            <div className="col-md-4 mb-4" key={recommendation.career_path_id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    {index + 1}. {recommendation.title}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-success fs-6">
                      {recommendation.match_score}% Match
                    </span>
                  </div>
                  
                  <p className="card-text">{recommendation.description}</p>
                  
                  <h6>Potential Job Roles:</h6>
                  <ul className="mb-3">
                    {recommendation.job_prospects.map((job, jobIndex) => (
                      <li key={jobIndex}>{job}</li>
                    ))}
                  </ul>
                  
                  <h6>Required Skills:</h6>
                  <div className="mb-3">
                    {recommendation.required_skills.map((skill, skillIndex) => {
                      const hasSkill = user.skills.some(
                        userSkill => userSkill.toLowerCase() === skill.toLowerCase() ||
                        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                        skill.toLowerCase().includes(userSkill.toLowerCase())
                      );
                      
                      return (
                        <span 
                          key={skillIndex}
                          className={`badge ${hasSkill ? 'bg-success' : 'bg-secondary'} me-2 mb-2`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                  
                  {recommendation.skill_gap.length > 0 && (
                    <>
                      <h6>Skills to Develop:</h6>
                      <div>
                        {recommendation.skill_gap.map((skill, gapIndex) => (
                          <span 
                            key={gapIndex}
                            className="badge bg-warning text-dark me-2 mb-2"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;