using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Password { get; set; }
    }
}
