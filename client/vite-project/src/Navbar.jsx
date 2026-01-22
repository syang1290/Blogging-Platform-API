import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>UCI Blog Admin</div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/create" style={styles.link}>New Post</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#ffffff',
    borderBottom: '1px solid #ddd',
    marginBottom: '2rem'
  },
  logo: { fontWeight: 'bold', fontSize: '1.2rem', color: '#2563eb' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '20px' },
  link: { textDecoration: 'none', color: '#4b5563', fontWeight: '500' }
};

export default Navbar;