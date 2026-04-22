import { useState, useEffect } from "react"; // Added hooks
import { Link } from "react-router-dom";
import axios from "axios"; // Added axios
import "./Courses.css";

// Interface for type safety
interface Course {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Using your backend port 7080
        const response = await axios.get("https://localhost:7080/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses from TCIS API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="training-page">
      {/* INTERNAL ANNOUNCEMENT HERO */}
      <section className="internal-hero">
        <div className="hero-content">
          <span className="dept-badge">SKILL UP 2026</span>
          <h1>Elevate Your Expertise</h1>
          <p>
            Access our company’s internal training course videos, designed specifically for our development workflow. Learn specialized techniques and earn internal certifications to advance your career within the company.
          </p>
          <div className="hero-actions">
            <button className="primary-cta">Explore Catalog</button>
            <button className="secondary-cta">My Learning Path</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="glass-card">
            {/* Dynamically show the count from the DB */}
            <strong>{courses.length}+</strong>
            <span>Active Courses</span>
          </div>
          <div className="glass-card">
            <strong>Level Up</strong>
            <span>Skill Certification</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION STRIP */}
      <div className="benefit-strip">
        <div className="benefit-track">
          <div className="benefit-item">
            <span className="icon">🚀</span>
            <div>
              <strong>Career Growth</strong>
              <p>Aligned with internal promotion tracks</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="icon">🛠️</span>
            <div>
              <strong>Modern Tech Stack</strong>
              <p>Focus on .NET, React, and SQL best practices</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="icon">🏆</span>
            <div>
              <strong>Recognized Certification</strong>
              <p>Earn badges for your internal profile</p>
            </div>
          </div>
          {/* Duplicates for infinite loop animation */}
          <div className="benefit-item">
            <span className="icon">🚀</span>
            <div>
              <strong>Career Growth</strong>
              <p>Aligned with internal promotion tracks</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="icon">🛠️</span>
            <div>
              <strong>Modern Tech Stack</strong>
              <p>Focus on .NET, React, and SQL best practices</p>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE DIRECTORY */}
      <section className="catalog-section">
        <div className="section-header">
          <h2 style={{ color: "#1a1a1b", fontWeight: "700" }}>Available Learning Modules</h2>
          <div className="filter-group">
            <button className="filter-btn active">All Modules</button>
            <button className="filter-btn">Technical</button>
            <button className="filter-btn">Leadership</button>
            <button className="filter-btn">Compliance</button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">Loading courses...</div>
        ) : (
          <div className="training-grid">
            {courses.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id} className="training-card">
                <div className="card-banner">
                  <img 
                    src={course.image || "https://via.placeholder.com/300x150"} 
                    alt={course.title} 
                    className="card-image" 
                  />
                  <span className="level-tag">{course.category || "General"}</span>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-desc">{course.description}</p>
                  <div className="card-footer">
                    <span className="duration">Self-Paced</span>
                    <span className="enroll-link">View Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}