using System;

namespace Application.Core;

public class AppException(string message, int statusCode, string? details)
{
    public string Message { get; } = message;
    public int StatusCode { get; } = statusCode;
    public string? Details { get; } = details;
}
