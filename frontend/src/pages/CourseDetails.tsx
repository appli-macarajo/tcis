import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import "./courseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === Number(id));

  const [selectedVideo, setSelectedVideo] = useState(
    course?.modules[0]?.lessons[0]?.video || ""
  );

  const [activeLesson, setActiveLesson] = useState<number | null>(null);

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
                    fontWeight: activeLesson === lesson.id ? "bold" : "normal"
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
              allowFullScreen
            />
          ) : (
            <p>No video selected</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="content-box">
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <div className="lesson-preview">
            <h3>Start Learning</h3>
            <p>Select a lesson from the left panel</p>
          </div>
        </div>

      </div>
    </div>
  );
}