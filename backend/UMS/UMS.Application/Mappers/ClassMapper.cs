using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Responses.Class;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal class ClassMapper
    {
        public static Class ToEntity(CreateClassRequest request)
        {
            return new Class(
            code: request.Code,
            subjectId: request.SubjectId,
            teacherId: request.TeacherId,
            schoolYear: request.SchoolYear,
            semester: request.Semester,
            startDate: request.StartDate,
            endDate: request.EndDate,
            maxStudents: request.MaxStudents
            );
        }

        public static void ApplyUpdate(UpdateClassRequest request, Class classEntity)
        {
            classEntity.UpdateDetails(
                code: request.Code,
                subjectId: request.SubjectId,
                teacherId: request.TeacherId,
                schoolYear: request.SchoolYear,
                semester: request.Semester,
                startDate: request.StartDate,
                endDate: request.EndDate,
                maxStudents: request.MaxStudents
            );
        }

        public static ClassResponse ToResponse(Class classEntity, string subjectName, string teacherName)
        {
            return new ClassResponse
            {
                Id = classEntity.Id,
                Code = classEntity.Code,
                SubjectId = classEntity.SubjectId,
                SubjectName = subjectName ?? string.Empty,
                TeacherId = classEntity.TeacherId,
                TeacherName = teacherName ?? string.Empty,
                SchoolYear = classEntity.SchoolYear,
                Semester = classEntity.Semester,
                StartDate = classEntity.StartDate,
                EndDate = classEntity.EndDate,
                MaxStudents = classEntity.MaxStudents,
                Status = classEntity.Status
            };
        }

    }
}
