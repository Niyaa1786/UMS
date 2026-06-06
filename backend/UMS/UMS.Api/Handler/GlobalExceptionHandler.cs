using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;
using UMS.Api.Reponses;
using UMS.Application.Exceptions;

namespace UMS.Api.Handler
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            int statusCode = (int)HttpStatusCode.InternalServerError;
            string message = "An unexpected error occurred.";
            object? errors = null;

            if(exception is ValidationException valEx)
            {
                statusCode = (int)HttpStatusCode.BadRequest;
                message = "Validation failed.";
                errors = valEx.Errors.GroupBy(e => e.PropertyName)
                    .ToDictionary(e => JsonNamingPolicy.CamelCase.ConvertName(e.Key), e => e.Select(e => e.ErrorMessage));
            }
            else if (exception is NotFoundException nfEx)
            {
                statusCode = (int)HttpStatusCode.NotFound;
                message = nfEx.Message;
            }
            else if (exception is UnauthorizedAccessException authEx)
            {
                statusCode = (int)HttpStatusCode.Unauthorized;
                message = "Unauthorized access. Please log in to continue";
            }

            var response = ApiResponse<object>.Failure(errors ?? string.Empty, message);

            httpContext.Response.StatusCode = statusCode;
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
            return true;
        }
    }
}
