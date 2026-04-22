using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Lesson
    {

        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;

        // Add this line for your YouTube links!
        public string? Video { get; set; }

        public int ModuleId { get; set; }


    }
}
