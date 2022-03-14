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
    public class PositionsController : ControllerBase
    {
        private readonly ILogger<PositionsController> logger;
        private PositionService _positionService;

        public PositionsController(ILogger<PositionsController> logger, PositionService positionService)
        {
            this.logger = logger;
            _positionService = positionService;
        }

        [HttpGet]
        public ActionResult<List<PositionDto>> GetAll()
        {
            try
            {
                return Ok(_positionService.GetPositions());
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<PositionDto> Get(int id)
        {
            try
            {
                return Ok(_positionService.GetPosition(id));
            }
            catch (KeyNotFoundException)
            {
                return PositionNotFound(id);
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        [HttpPost]
        public ActionResult<PositionDto> Insert([FromBody] PositionCreateRequestDto position)
        {
            try
            {
                return Ok(_positionService.InsertPosition(position));
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<PositionDto> Update(int id, [FromBody] PositionCreateRequestDto position)
        {
            try
            {
                return Ok(_positionService.UpdatePosition(id, position));
            }
            catch (KeyNotFoundException)
            {
                return PositionNotFound(id);
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
                _positionService.ClosePosition(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalErrorResult(ex.InnerException);
            }
        }

        private ActionResult PositionNotFound(int id)
        {
            var error = new ErrorDto
            {
                Code = "NotFound",
                Message = $"Position with id {id} not found",
                Target = "PositionId",
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
