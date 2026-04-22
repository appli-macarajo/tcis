using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Module
    {

        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;

        public int CourseId { get; set; }

        // Relationship: One Module has many Lessons
        public List<Lesson> Lessons { get; set; } = new();

    }
}
