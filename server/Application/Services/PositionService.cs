using Application.DTO.Request;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Models;
using Infrastructure.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public class PositionService : IPositionService
    {
        private PositionRepository _positionRepository;

        public PositionService(PositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public List<PositionDto> GetPositions()
        {
            return _positionRepository.GetPositions().Select(x => new PositionDto(x)).ToList();
        }
        

        public PositionDto InsertPosition(PositionCreateRequestDto position)
        {
            return new PositionDto(_positionRepository.InsertPosition(position.ToModel()));
        }

        public PositionDto GetPosition(int id)
        {
            Position result = _positionRepository.GetPosition(id);
            if (result == null)
            {
                throw new KeyNotFoundException();
            }

            return new PositionDto(result);
        }

        public PositionDto UpdatePosition(int id, PositionCreateRequestDto position)
        {
            Position result = _positionRepository.UpdatePosition(id, position.ToModel());
            if (result == null)
            {
                throw new KeyNotFoundException();
            }

            return new PositionDto(result);
        }

        public void ClosePosition(int id)
        {
            _positionRepository.ClosePosition(id);
        }
    }
}
