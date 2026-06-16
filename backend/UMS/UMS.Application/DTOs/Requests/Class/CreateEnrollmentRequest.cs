using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Requests.Class
{
    public class CreateEnrollmentRequest
    {
        public Guid ClassId { get; set; }
        public Guid StudentId { get; set; }
    }
}
