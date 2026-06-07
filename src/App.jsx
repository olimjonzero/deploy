import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Infrastructure from './pages/Infrastructure';
import Comparison from './pages/Comparison';
import Systems from './pages/Systems';
import Security from './pages/Security';
import DevOps from './pages/DevOps';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/security" element={<Security />} />
            <Route path="/devops" element={<DevOps />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-slate-600">
            <p>© 2026 Bulutli Tarmoq Texnologiyalari - BTEC Assignment</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
