import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        zot<span style={styles.accent}>blog</span> 🐜
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>home</Link></li>
        <li><Link to="/create" style={styles.createLink}>new post</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 10%', 
    background: '#0064a4',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  brand: { 
    fontSize: '1.4rem', 
    fontWeight: '400',
    color: '#ffffff',
    letterSpacing: '0.5px',
    fontFamily: '"Public Sans", sans-serif'
  },
  accent: { 
    color: '#ffd200', 
    fontWeight: '300' 
  },
  navLinks: { 
    display: 'flex', 
    listStyle: 'none', 
    gap: '40px', 
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  link: { 
    textDecoration: 'none', 
    color: 'rgba(255, 255, 255, 0.85)', 
    fontWeight: '400',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease'
  },
  createLink: {
    textDecoration: 'none',
    color: '#ffd200', 
    border: '1px solid #ffd200', 
    padding: '5px 15px',
    borderRadius: '4px',
    fontWeight: '400',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease'
  }
};

export default Navbar;