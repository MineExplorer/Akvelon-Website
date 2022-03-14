namespace Application.DTO.Request
{
    using Application.Interfaces;
    using Domain.Enums;
    using Domain.Models;
    using System;

    public class CandidateCreateRequestDto : IDtoMapper<Candidate>
    {
        public string Email { get; set; }

        public string FullName { get; set; }

        public int? PositionId { get; set; }

        public Position Position { get; set; }

        public int? RecruiterId { get; set; }

        public User Recruiter { get; set; }

        public string City { get; set; }

        public string Phone { get; set; }

        public string Skype { get; set; }

        public int Seniority { get; set; }

        public int Experience { get; set; }

        public string TechStack { get; set; }

        public int English { get; set; }

        public string Comments { get; set; }

        public int Status { get; set; }

        public Candidate ToModel()
        {
            return new Candidate()
            {
                Email = this.Email,
                Name = this.FullName,
                PositionId = this.PositionId,
                RecruiterId = this.RecruiterId,
                City = this.City,
                Phone = this.Phone,
                Skype = this.Skype,
                Seniority = (Seniority) this.Seniority,
                Experience = this.Experience,
                TechStack = this.TechStack,
                English = (EnglishLevel) this.English,
                Comments = this.Comments,
                Status = (CandidateStatus) this.Status
            };
            
        }
    }
}
