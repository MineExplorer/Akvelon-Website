namespace WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using Application.DTO.Request;
    using Application.Services;
    using Application.ViewModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly ILogger<CandidatesController> logger;
        private CandidateService _candidateService;

        public CandidatesController(ILogger<CandidatesController> logger, CandidateService candidateService)
        {
            this.logger = logger;
            _candidateService = candidateService;
        }

        [HttpGet]
        public ActionResult<List<CandidateDto>> GetAll()
        {
            try
            {
                return Ok(_candidateService.GetCandidates());
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex);
            }
        }
        
        [HttpGet("status/{status}")]
        public ActionResult<List<CandidateDto>> GetAllByStatus(int status)
        {
            try
            {
                return Ok(_candidateService.GetCandidatesByStatus(status));
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<CandidateDto> Get(int id)
        {
            try
            {
                return Ok(_candidateService.GetCandidate(id));
            }
            catch (KeyNotFoundException)
            {
                return CandidateNotFound(id);
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        [HttpPost]
        public ActionResult<CandidateDto> Insert([FromBody] CandidateCreateRequestDto candidate)
        {
            try
            {
                return Ok(_candidateService.InsertCandidate(candidate));
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<CandidateDto> Update(int id, [FromBody] CandidateCreateRequestDto candidate)
        {
            try
            {
                return Ok(_candidateService.UpdateCandidate(id, candidate));
            }
            catch (KeyNotFoundException)
            {
                return CandidateNotFound(id);
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _candidateService.DeleteCandidate(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        private ActionResult CandidateNotFound(int id)
        {
            var error = new ErrorDto
            {
                Code = "NotFound",
                Message = $"Candidate with id {id} not found",
                Target = "CandidateId",
            };

            return NotFound(error);
        }

        private ActionResult InternalErrorResult(Exception ex)
        {
            var error = new ErrorDto
            {
                Code = "InternalError",
                Message = ex.Message,
            };

            return StatusCode(500, error);
        }
    }
}
