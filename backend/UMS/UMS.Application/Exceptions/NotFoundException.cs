using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }
}
