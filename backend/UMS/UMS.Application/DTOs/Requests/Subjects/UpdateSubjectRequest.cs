using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Requests.Subjects
{
    public class UpdateSubjectRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Credits { get; set; }
    }
}
