namespace Domain.Models
{
    using Domain.Enums;
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Candidate
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int? PositionId { get; set; }

        public Position Position { get; set; }

        public int? RecruiterId { get; set; }

        public User Recruiter { get; set; }

        [MaxLength(25)]
        public string City { get; set; }

        [MaxLength(16)]
        public string Phone { get; set; }

        [MaxLength(25)]
        public string Skype { get; set; }

        public Seniority Seniority { get; set; }
        
        public int Experience { get; set; }

        public string TechStack { get; set; }

        public EnglishLevel English { get; set; }

        public string Comments { get; set; }

        public CandidateStatus Status { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;
    }
}
