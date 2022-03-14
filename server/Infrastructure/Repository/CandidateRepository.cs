using System.Linq;
using Domain.Enums;
using Domain.Models;
using Infrastructure.EF;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CandidateRepository
    {
        private DatabaseContext context;

        public CandidateRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public IQueryable<Candidate> GetCandidates()
        {
            return context.Candidates.
                AsNoTracking().
                Include(p => p.Recruiter).
                Include(p => p.Position);
        }
        
        public IQueryable<Candidate> GetCandidatesByStatus(CandidateStatus status)
        {
            return GetCandidates().Where(c => c.Status == status);
        }

        public Candidate InsertCandidate(Candidate candidate)
        {
            var entity = context.Add(candidate);
            context.SaveChanges();
            return entity.Entity;
        }

        public Candidate GetCandidate(int id)
        {
            Candidate candidate = context.Candidates.Find(id);
            return candidate;
        }

        public Candidate UpdateCandidate(int id, Candidate candidate)
        {
            Candidate entity = context.Candidates.Find(id);
            if (entity != null)
            {
                entity.Email = candidate.Email;
                entity.Name = candidate.Name;
                entity.PositionId = candidate.PositionId;
                //entity.Position = candidate.Position;
                entity.RecruiterId = candidate.RecruiterId;
                //entity.Recruiter = candidate.Recruiter;
                entity.City = candidate.City;
                entity.Phone = candidate.Phone;
                entity.Skype = candidate.Skype;
                entity.Seniority = candidate.Seniority;
                entity.Experience = candidate.Experience;
                entity.TechStack = candidate.TechStack;
                entity.English = candidate.English;
                entity.Comments = candidate.Comments;
                entity.Status = candidate.Status;
                context.SaveChanges();
                return entity;
            }

            return null;
        }

        public bool SetCandidateStatus(int id, CandidateStatus status)
        {
            Candidate entity = context.Candidates.Find(id);
            if (entity != null)
            {
                entity.Status = status;
                context.SaveChanges();
                return true;
            }

            return false;
        }

        public void DeleteCandidate(int id)
        {
            Candidate entity = context.Candidates.Find(id);
            if (entity != null)
            {
                context.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}
