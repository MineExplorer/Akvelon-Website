using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Position
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public Seniority Seniority { get; set; }

        public string TechStack { get; set; }

        public bool Active { get; set; } = true;
    }
}
