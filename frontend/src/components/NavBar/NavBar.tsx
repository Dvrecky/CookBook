import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to="/shopping-list" className="nav-link">Shopping List</Link>
            </li>
          </ul>
        </nav>
      );
}

export default NavBar;
