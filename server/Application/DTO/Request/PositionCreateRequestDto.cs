namespace Application.DTO.Request
{
    using Application.Interfaces;
    using Domain.Enums;
    using Domain.Models;
    using System;

    public class PositionCreateRequestDto : IDtoMapper<Position>
    {

        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public Seniority Seniority { get; set; }

        public string TechStack { get; set; }

        public Position ToModel()
        {
            return new Position()
            {
                Title = this.Title,
                Description = this.Description,
                Capacity = this.Capacity,
                Seniority = this.Seniority,
                TechStack = this.TechStack
            };
        }
    }
}
