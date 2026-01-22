import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Education' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(() => navigate('/')) // Redirect to home after success
    .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" placeholder="Title" required
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <textarea 
          placeholder="Content" required rows="5"
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;