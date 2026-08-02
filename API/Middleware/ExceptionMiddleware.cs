using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationExceptionAsync(context, ex);
        }
        catch (Exception ex)
        {
            await this.HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        var appException = env.IsDevelopment() ? new AppException(ex.Message, 500, ex.StackTrace) : new AppException("Server Error", 500, null);
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        JsonSerializerOptions options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        await context.Response.WriteAsJsonAsync(appException, options);
    }

    private static async Task HandleValidationExceptionAsync(HttpContext context, ValidationException ex)
    {
        if (ex.Errors == null) return;

        var validationErrors = new Dictionary<string, string[]>();

        foreach (var error in ex.Errors)
        {
            if (validationErrors.ContainsKey(error.PropertyName))
            {
                var errors = validationErrors[error.PropertyName];
                validationErrors[error.PropertyName] = errors.Append(error.ErrorMessage).ToArray();
            }
            else
            {
                validationErrors.Add(error.PropertyName, new[] { error.ErrorMessage });
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        ValidationProblemDetails problemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation Error",
            Type = "ValidationFailure",
            Detail = "One or more validation errors occurred. Please check the 'errors' property for details.",
            Errors = validationErrors
        };

        await context.Response.WriteAsJsonAsync(problemDetails);
    }
}
