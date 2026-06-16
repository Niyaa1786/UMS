using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Responses.Class
{
    public class EnrollmentResponse
    {
        public Guid Id { get; set; }
        public Guid ClassId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public string StudentCode { get; set; } = string.Empty;
        public string StudentEmail { get; set; } = string.Empty;
        public DateTime EnrolledAt { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
