
import { Search, ChevronDown } from 'lucide-react'; // Optional: Install lucide-react for icons
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="main-nav">
      <div className="nav-left">
        <div className="logo">Training Course<span>System</span></div>
        
        <button className="nav-dropdown">
          Explore <ChevronDown size={16} />
        </button>
        
        <a href="#degrees" className="nav-link">Degrees</a>
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
  );
}