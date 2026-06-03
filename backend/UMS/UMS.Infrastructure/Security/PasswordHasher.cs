using BCrypt.Net;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Shared;

namespace UMS.Infrastructure.Security
{
    public class PasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
        public bool VerifyPassword(string password, string passwordHash) => BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}
