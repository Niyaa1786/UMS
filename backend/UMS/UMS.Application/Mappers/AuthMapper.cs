using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Application.Mappers
{
    internal static class AuthMapper
    {
        public static AuthResponse ToResponse(Account account, TokenResult tokenResult)
        {
            var response = new AuthResponse
            {
                AccessToken = tokenResult.AccessToken,
                RefreshToken = tokenResult.RefreshToken,
                AccessTokenExpiration = tokenResult.AccessTokenExpiration,
                RefreshTokenExpiration = tokenResult.RefreshTokenExpiration,
                User = new UserDto
                {
                    Id = account.Id,
                    Username = account.Username,
                    Role = account.Role
                }
            };

            response.User.Email = account.Role switch
            {
                Roles.Student => account.Student?.Email ?? string.Empty,
                Roles.Teacher => account.Teacher?.Email ?? string.Empty,
                Roles.Staff => account.Staff?.Email ?? string.Empty,
                _ => string.Empty
            };

            return response;
        }
    }
}
