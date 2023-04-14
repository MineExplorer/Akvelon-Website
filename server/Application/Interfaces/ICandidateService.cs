using Application.DTO.Request;
using Application.ViewModels;
using System.Collections.Generic;

namespace Application.Interfaces
{
    public interface ICandidateService
    {
        List<CandidateDto> GetCandidates();

        List<CandidateDto> GetCandidatesByStatus(int status);

        CandidateDto InsertCandidate(CandidateCreateRequestDto candidate);

        CandidateDto GetCandidate(int id);

        CandidateDto UpdateCandidate(int id, CandidateCreateRequestDto candidate);

        void DeleteCandidate(int id);
    }
}
