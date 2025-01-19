import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
          <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px' }}>
            <li>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            </li>
            <li>
                <Link to="/shopping-list" style={{ color: '#fff', textDecoration: 'none' }}>Shopping list</Link>
            </li>
          </ul>
        </nav>
      );
}

export default NavBar;