using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal class EnrollmentMapper
    {
        public static EnrollmentResponse ToResponse(Enrollment enrollment)
        {
            return new EnrollmentResponse
            {
                Id = enrollment.Id,
                ClassId = enrollment.ClassId,
                StudentId = enrollment.StudentId,
                StudentFullName = enrollment.Student?.FullName ?? string.Empty,
                StudentCode = enrollment.Student?.Account?.Username ?? string.Empty,
                StudentEmail = enrollment.Student?.Email ?? string.Empty,
                EnrolledAt = enrollment.EnrolledAt,
                Status = enrollment.Status
            };
        }
    }
}
