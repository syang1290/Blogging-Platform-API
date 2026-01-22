import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './navbar'; 
import CreatePost from './CreatePost';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setPosts(posts.filter(post => post.id !== id));
        } else {
          alert("Failed to delete the post.");
        }
      })
      .catch(err => console.error("Error deleting post:", err));
    }
  };

  if (loading) {
    return <div className="container">Loading posts...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Blogging Platform</h1>
        <p>A full-stack project with Flask and React</p>
      </header>

      <main className="post-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="post-card">
              <span className="category">{post.category || 'General'}</span>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              
              <button 
                onClick={() => handleDelete(post.id)}
                className="delete-btn"
              >
                Delete Post
              </button>
            </article>
          ))
        ) : (
          <p>No posts found. Use the 'New Post' page to create one!</p>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;