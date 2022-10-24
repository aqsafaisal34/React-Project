import './App.css';
import Home from './components/home';
import Products from './components/products';
import Navbar from './components/navbar';
import Signup from './components/signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
