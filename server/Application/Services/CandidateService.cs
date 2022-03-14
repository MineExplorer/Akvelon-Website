namespace Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Application.DTO.Request;
    using Application.ViewModels;
    using Domain.Enums;
    using Domain.Models;
    using Infrastructure.Repositories;

    public class CandidateService
    {
        private CandidateRepository _candidateRepository;

        public CandidateService(CandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }

        public List<CandidateDto> GetCandidates()
        {
            return _candidateRepository.GetCandidates().Select(x => new CandidateDto(x)).ToList();
        }
        
        public List<CandidateDto> GetCandidatesByStatus(int status)
        {
            return _candidateRepository.GetCandidatesByStatus((CandidateStatus)status).
                Select(x => new CandidateDto(x)).
                ToList();
        }

        public CandidateDto InsertCandidate(CandidateCreateRequestDto candidate)
        {
            return new CandidateDto(_candidateRepository.InsertCandidate(candidate.ToModel()));
        }

        public CandidateDto GetCandidate(int id)
        {
            Candidate result = _candidateRepository.GetCandidate(id);
            if (result == null)
            {
                throw new KeyNotFoundException();
            }

            return new CandidateDto(result);
        }

        public CandidateDto UpdateCandidate(int id, CandidateCreateRequestDto candidate)
        {
            Candidate result = _candidateRepository.UpdateCandidate(id, candidate.ToModel());
            if (result == null)
            {
                throw new KeyNotFoundException();
            }

            return new CandidateDto(result);
        }

        public void DeleteCandidate(int id)
        {
            _candidateRepository.DeleteCandidate(id);
        }
    }
}
