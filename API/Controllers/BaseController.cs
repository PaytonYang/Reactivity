using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator? _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>() ?? throw new InvalidOperationException("Mediator service not found");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }

            if (!result.IsSuccess && result.Code == 404)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}
