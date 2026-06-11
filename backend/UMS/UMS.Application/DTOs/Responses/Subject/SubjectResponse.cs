using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Responses.Subject
{
    public class SubjectResponse
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Credits { get; set; }
    }
}
