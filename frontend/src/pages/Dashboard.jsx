import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, jobsRes] = await Promise.all([
          api.get('/skills'),
          api.get('/jobs')
        ]);
        setSkills(skillsRes.data);
        setJobs(jobsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAnalyze = async () => {
    if (!selectedJob) {
      alert('Please select a target job role');
      return;
    }
    
    try {
      // Save user skills
      await api.post('/analysis/user-skills', { skills: selectedSkills });
      
      // Navigate to analysis page
      navigate(`/analysis/${selectedJob}`);
    } catch (err) {
      console.error('Error analyzing skills', err);
      alert('An error occurred during analysis');
    }
  };

  if (loading) return <div className="container" style={{paddingTop: '2rem'}}>Loading...</div>;

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Skill Profiling</h1>
      
      <div className="flex flex-col gap-6" style={{ md: { flexDirection: 'row'} }}>
        {/* Skills Selection */}
        <div className="glass-panel" style={{ flex: 2 }}>
          <h2>1. What skills do you currently have?</h2>
          <p>Select all the technologies and skills you are proficient in.</p>
          
          <div className="input-group" style={{ marginTop: '1rem' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search skills (e.g. React, Cloud)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            {filteredSkills.map(skill => (
              <div 
                key={skill._id}
                onClick={() => toggleSkill(skill._id)}
                style={{
                  padding: '1rem',
                  border: `1px solid ${selectedSkills.includes(skill._id) ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  backgroundColor: selectedSkills.includes(skill._id) ? 'rgba(59, 130, 246, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                  transition: 'var(--transition)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: '500' }}>{skill.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{skill.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Role Selection */}
        <div className="glass-panel" style={{ flex: 1 }}>
          <h2>2. Choose Target Role</h2>
          <p>Select the job role you are aiming for.</p>
          
          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <select 
              className="input-field"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="">-- Select Job Role --</option>
              {jobs.map(job => (
                <option key={job._id} value={job._id}>{job.roleName}</option>
              ))}
            </select>
          </div>
          
          {selectedJob && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Role Description</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                {jobs.find(j => j._id === selectedJob)?.description}
              </p>
            </div>
          )}

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1rem' }}
            onClick={handleAnalyze}
            disabled={!selectedJob}
          >
            Analyze Skill Gap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
