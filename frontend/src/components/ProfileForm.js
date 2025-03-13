import React, { useState } from 'react';

const ProfileForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: '',
    interests: '',
    careerGoals: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Convert comma-separated strings to arrays
    const processedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      interests: formData.interests.split(',').map(interest => interest.trim())
    };
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(processedData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create profile');
      }
      
      // Login the user
      onLogin(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Create Your Profile</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="education" className="form-label">Educational Background</label>
            <textarea
              className="form-control"
              id="education"
              name="education"
              rows="2"
              value={formData.education}
              onChange={handleChange}
              required
              placeholder="e.g., Bachelor's in Computer Science, MBA, etc."
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="skills" className="form-label">Skills</label>
            <textarea
              className="form-control"
              id="skills"
              name="skills"
              rows="2"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="e.g., Python, Data Analysis, Project Management, etc. (comma-separated)"
            ></textarea>
            <div className="form-text">Enter your skills separated by commas.</div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="interests" className="form-label">Interests</label>
            <textarea
              className="form-control"
              id="interests"
              name="interests"
              rows="2"
              value={formData.interests}
              onChange={handleChange}
              required
              placeholder="e.g., Machine Learning, Web Development, Business Strategy, etc. (comma-separated)"
            ></textarea>
            <div className="form-text">Enter your interests separated by commas.</div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="careerGoals" className="form-label">Career Goals</label>
            <textarea
              className="form-control"
              id="careerGoals"
              name="careerGoals"
              rows="3"
              value={formData.careerGoals}
              onChange={handleChange}
              required
              placeholder="Describe your short-term and long-term career goals..."
            ></textarea>
          </div>
          
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Profile...
                </>
              ) : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;