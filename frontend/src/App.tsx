import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shopping-list' element={<ShoppingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
