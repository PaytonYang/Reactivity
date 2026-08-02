using System;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace API.Controllers;

public class ActivitiesController : BaseController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken cancellationToken)
    {
        return await this.Mediator.Send(new GetActivityList.Query(), cancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id)
    {
        return this.HandleResult(await this.Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> AddActivity(CreateActivityDto activityDto)
    {
        return this.HandleResult(await this.Mediator.Send(new AddActivity.Command { ActivityDto = activityDto }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activityDto)
    {
        return this.HandleResult(await this.Mediator.Send(new EditActivity.Command { ActivityDto = activityDto }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return this.HandleResult(await this.Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
}
