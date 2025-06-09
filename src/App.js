import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import logo from './logo.svg';
import NavBar from './components/sections/NavBar';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Tools from './pages/Tools';
import NotFound from './pages/404';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
