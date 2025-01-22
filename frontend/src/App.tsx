import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home/Home.tsx';
import ShoppingList from './pages/ShoppingList';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails.tsx';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '50px' }}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/shopping-list' element={<ShoppingList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
