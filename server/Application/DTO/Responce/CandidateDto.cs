namespace Application.ViewModels
{
    using Domain.Models;
    using System;

    public class CandidateDto
    {
        public CandidateDto(Candidate candidate)
        {
            Id = candidate.Id;
            Email = candidate.Email;
            FullName = candidate.Name;
            PositionId = candidate.PositionId;
            RecruiterId = candidate.RecruiterId;
            City = candidate.City;
            Phone = candidate.Phone;
            Skype = candidate.Skype;
            Seniority = (int)candidate.Seniority;
            Experience = candidate.Experience;
            TechStack = candidate.TechStack;
            English = (int)candidate.English;
            Comments = candidate.Comments;
            Status = (int)candidate.Status;
            Created = candidate.Created;
        }

        public CandidateDto()
        {
        }

        public int Id { get; set; }

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

        public DateTime Created { get; set; }
    }
}
