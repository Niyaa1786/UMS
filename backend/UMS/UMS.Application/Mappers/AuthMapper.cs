using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal static class AuthMapper
    {
        public static AuthResponse ToResponse(Student student, TokenResult tokenResult)
        {
            return new AuthResponse
            {
                AccessToken = tokenResult.AccessToken,
                RefreshToken = tokenResult.RefreshToken,
                AccessTokenExpiration = tokenResult.AccessTokenExpiration,
                RefreshTokenExpiration = tokenResult.RefreshTokenExpiration,
                User = new UserDto
                {
                    Id = student.Id,
                    Username = student.Account!.Username,
                    Email = student.Email,
                    Role = student.Account.Role
                }
            };
        }

        public static AuthResponse ToResponse(Teacher teacher, TokenResult tokenResult)
        {
            return new AuthResponse
            {
                AccessToken = tokenResult.AccessToken,
                RefreshToken = tokenResult.RefreshToken,
                AccessTokenExpiration = tokenResult.AccessTokenExpiration,
                RefreshTokenExpiration = tokenResult.RefreshTokenExpiration,
                User = new UserDto
                {
                    Id = teacher.Id,
                    Username = teacher.Account!.Username,
                    Email = teacher.Email,
                    Role = teacher.Account.Role
                }
            };
        }

        public static AuthResponse ToResponse(Staff staff, TokenResult tokenResult)
        {
            return new AuthResponse
            {
                AccessToken = tokenResult.AccessToken,
                RefreshToken = tokenResult.RefreshToken,
                AccessTokenExpiration = tokenResult.AccessTokenExpiration,
                RefreshTokenExpiration = tokenResult.RefreshTokenExpiration,
                User = new UserDto
                {
                    Id = staff.Id,
                    Username = staff.Account!.Username,
                    Email = staff.Email,
                    Role = staff.Account.Role
                }
            };
        }
    }
}
