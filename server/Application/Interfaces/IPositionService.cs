using Application.DTO.Request;
using Application.ViewModels;
using System.Collections.Generic;

namespace Application.Interfaces
{
    public interface IPositionService
    {
        List<PositionDto> GetPositions();

        PositionDto InsertPosition(PositionCreateRequestDto position);

        PositionDto GetPosition(int id);

        PositionDto UpdatePosition(int id, PositionCreateRequestDto position);

        void ClosePosition(int id);
    }
}
