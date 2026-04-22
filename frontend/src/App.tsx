import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import { Search, ChevronDown } from "lucide-react"; // npm install lucide-react
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      {/* IMPROVED TOP NAVBAR */}
      <nav className="main-nav">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <div className="logo">TCi<span>System</span></div>
          </Link>
          
          <button className="nav-dropdown">
            Explore <ChevronDown size={16} />
          </button>
          
          <Link to="/" className="nav-link">Catalog</Link>
        </div>

        <div className="nav-center">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              className="search-input"
            />
            <button className="search-btn">
              <Search size={18} color="white" />
            </button>
          </div>
        </div>

        <div className="nav-right">
          <button className="login-btn">Log In</button>
          <button className="join-btn">Join for Free</button>
        </div>
      </nav>

      {/* MAIN APP CONTAINER */}
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;