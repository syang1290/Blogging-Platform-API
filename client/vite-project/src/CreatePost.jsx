import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(() => navigate('/')) 
    .catch(err => console.error(err));
  };

  return (
    <div className="container" style={{ background: 'transparent', minHeight: 'auto', paddingTop: '60px' }}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>new zot-post</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>post title</label>
            <input 
              type="text" 
              placeholder="Give it a catchy name..." 
              required
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              style={styles.input}
            />
          </div>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>category</label>
            <select 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={styles.select}
            >
              <option value="General">general</option>
              <option value="Research">research</option>
              <option value="Campus Life">campus life</option>
              <option value="ICS">ics</option>
            </select>
          </div>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>content</label>
            <textarea 
              placeholder="What's the latest at Aldrich Park?" 
              required 
              rows="8"
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={styles.textarea}
            />
          </div>
          
          <button type="submit" style={styles.submitBtn}>
            publish
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  formWrapper: {
    maxWidth: '550px',
    margin: '0 auto',
  },
  title: { 
    color: '#0064a4', 
    fontWeight: '400', 
    fontSize: '1.6rem',
    marginBottom: '40px',
    textAlign: 'left'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  },
  label: {
    fontSize: '0.8rem',
    color: '#0064a4',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  input: { 
    padding: '12px 16px', 
    fontSize: '1rem', 
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    background: '#ffffff', 
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 16px',
    fontSize: '1rem',
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    background: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer'
  },
  textarea: { 
    padding: '12px 16px', 
    fontSize: '1rem', 
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    background: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none'
  },
  submitBtn: { 
    marginTop: '10px',
    padding: '12px 30px',
    background: '#0064a4', 
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(0, 100, 164, 0.2)' 
  }
};

export default CreatePost;