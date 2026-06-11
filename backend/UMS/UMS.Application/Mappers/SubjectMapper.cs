using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Subjects;
using UMS.Application.DTOs.Responses.Subject;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal class SubjectMapper
    {
        public static Subject ToEntity(CreateSubjectRequest request)
        {
            return new Subject(request.Code, request.Name, request.Description, request.Credits);
        }

        public static SubjectResponse ToResponse(Subject subject)
        {
            return new SubjectResponse
            {
                Id = subject.Id,
                Code = subject.Code,
                Name = subject.Name,
                Description = subject.Description,
                Credits = subject.Credits
            };
        }

        public static void ApplyUpdate(UpdateSubjectRequest request, Subject subject)
        {
            subject.UpdateDetails(request.Name, request.Description, request.Credits);
        }
    }
}
