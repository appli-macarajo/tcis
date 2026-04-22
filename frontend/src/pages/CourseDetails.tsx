import { useState, useEffect } from "react"; // Added useEffect
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Added axios
import "./courseDetails.css";

// Define the interface to match your new C# Models
interface Lesson {
  id: number;
  title: string;
  video: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Update port to match your VS 2022 running API
        const response = await axios.get(`https://localhost:7080/api/courses/${id}`);
        const data = response.data;
        
        setCourse(data);
        
        // Set initial video if data exists
        if (data.modules?.[0]?.lessons?.[0]) {
          setSelectedVideo(data.modules[0].lessons[0].video);
          setActiveLesson(data.modules[0].lessons[0].id);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading Course Content...</div>;
  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="course-layout">
      {/* SIDEBAR */}
      <div className="course-sidebar">
        <h3 className="sidebar-title">{course.title}</h3>

        {course.modules.map((module, i) => (
          <div key={i} className="module">
            <h4>{module.title}</h4>
            <ul>
              {module.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  onClick={() => {
                    setSelectedVideo(lesson.video);
                    setActiveLesson(lesson.id);
                  }}
                  style={{
                    cursor: "pointer",
                    color: activeLesson === lesson.id ? "#38bdf8" : "white",
                    fontWeight: activeLesson === lesson.id ? "bold" : "normal",
                  }}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="course-main">
        <div className="top-bar">
          <Link to="/" className="back-btn">← Back</Link>
          <h2>{course.title}</h2>
        </div>

        {/* VIDEO PLAYER */}
        <div className="video-container">
          {selectedVideo ? (
            <iframe
              width="100%"
              height="450"
              src={selectedVideo}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="no-video-placeholder">
              <p>No video selected</p>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="content-box">
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <div className="lesson-preview">
            <h3>Start Learning</h3>
            <p>Select a lesson from the left panel to begin the training.</p>
          </div>
        </div>
      </div>
    </div>
  );
}