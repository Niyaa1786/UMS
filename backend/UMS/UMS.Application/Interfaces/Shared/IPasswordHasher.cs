using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.Interfaces.Shared
{
    public interface IPasswordHasher
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string password, string passwordHash);
    }
}
