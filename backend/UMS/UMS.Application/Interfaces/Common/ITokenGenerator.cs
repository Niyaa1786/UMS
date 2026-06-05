using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Domain.Entities;

namespace UMS.Application.Interfaces.Common
{
    public interface ITokenGenerator
    {
        public TokenResult GenerateToken(Account account);

    }
}
