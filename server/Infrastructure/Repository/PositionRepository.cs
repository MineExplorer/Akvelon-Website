using System.Linq;
using Domain.Enums;
using Domain.Models;
using Infrastructure.EF;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PositionRepository
    {
        private DatabaseContext context;

        public PositionRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public IQueryable<Position> GetPositions()
        {
            return context.Positions.AsNoTracking();
        }

        public Position InsertPosition(Position position)
        {
            var entity = context.Add(position);
            context.SaveChanges();
            return entity.Entity;
        }

        public Position GetPosition(int id)
        {
            Position position = context.Positions.Find(id);
            return position;
        }

        public Position UpdatePosition(int id, Position position)
        {
            Position entity = context.Positions.Find(id);
            if (entity != null)
            {
                entity.Title = position.Title;
                entity.Description = position.Description;
                entity.Capacity = position.Capacity;
                entity.Seniority = position.Seniority;
                entity.TechStack = position.TechStack;
                context.SaveChanges();
                return entity;
            }

            return null;
        }

        public void ClosePosition(int id)
        {
            Position entity = context.Positions.Find(id);
            if (entity != null)
            {
                entity.Active = false;
                context.SaveChanges();
            }
        }
    }
}
