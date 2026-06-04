using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Responses.Users
{
    public class TeacherResponse
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public Faculty Faculty { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string TeacherId { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
