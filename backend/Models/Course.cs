using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Course
    {

        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? Description { get; set; }

        // Relationship: One Course has many Modules
        public List<Module> Modules { get; set; } = new();



    }
}
