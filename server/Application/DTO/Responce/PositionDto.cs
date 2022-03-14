namespace Application.ViewModels
{
    using Domain.Enums;
    using Domain.Models;
    using System;

    public class PositionDto
    {
        public PositionDto(Position position)
        {
            Id = position.Id;
            Title = position.Title;
            Description = position.Description;
            Capacity = position.Capacity;
            Seniority = position.Seniority;
            TechStack = position.TechStack;
            Active = position.Active;
        }

        public PositionDto() { }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public Seniority Seniority { get; set; }

        public string TechStack { get; set; }

        public bool Active { get; set; }
    }
}
