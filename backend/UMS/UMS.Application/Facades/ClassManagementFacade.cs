using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Requests.Subjects;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.DTOs.Responses.Subject;
using UMS.Application.UseCases.ClassManagement.Commands;
using UMS.Application.UseCases.ClassManagement.Queries;
using UMS.Application.UseCases.Subjects.Commands;
using UMS.Application.UseCases.Subjects.Queries;

namespace UMS.Application.Facades
{
    internal class ClassManagementFacade : IClassManagementFacade
    {
        // Subject
        private readonly CreateSubjectUseCase _createSubject;
        private readonly UpdateSubjectUseCase _updateSubject;
        private readonly DeleteSubjectUseCase _deleteSubject;
        private readonly GetSubjectByIdUseCase _getSubjectById;
        private readonly GetAllSubjectsUseCase _getAllSubjects;

        // Class
        private readonly CreateClassUseCase _createClass;
        private readonly UpdateClassUseCase _updateClass;
        private readonly DeleteClassUseCase _deleteClass;
        private readonly GetClassByIdUseCase _getClassById;
        private readonly GetAllClassesUseCase _getAllClasses;
        private readonly GetClassesByTeacherUseCase _getClassesByTeacher;
        private readonly GetClassesBySubjectUseCase _getClassesBySubject;
        private readonly ChangeClassStatusUseCase _changeClassStatus;

        // ClassSchedule
        private readonly CreateClassScheduleUseCase _createClassSchedule;
        private readonly UpdateClassScheduleUseCase _updateClassSchedule;
        private readonly DeleteClassScheduleUseCase _deleteClassSchedule;
        private readonly GetClassSchedulesByClassIdUseCase _getClassSchedulesByClassId;
        private readonly CreateEnrollmentUseCase _createEnrollment;
        private readonly DeleteEnrollmentUseCase _deleteEnrollment;
        private readonly GetEnrollmentsByClassUseCase _getEnrollmentsByClass;

        public ClassManagementFacade(
            // Subject
            CreateSubjectUseCase createSubject,
            UpdateSubjectUseCase updateSubject,
            DeleteSubjectUseCase deleteSubject,
            GetSubjectByIdUseCase getSubjectById,
            GetAllSubjectsUseCase getAllSubjects,
            // Class
            CreateClassUseCase createClass,
            UpdateClassUseCase updateClass,
            DeleteClassUseCase deleteClass,
            GetClassByIdUseCase getClassById,
            GetAllClassesUseCase getAllClasses,
            GetClassesByTeacherUseCase getClassesByTeacher,
            GetClassesBySubjectUseCase getClassesBySubject,
            ChangeClassStatusUseCase changeClassStatus,
            // ClassSchedule
            CreateClassScheduleUseCase createClassSchedule,
            UpdateClassScheduleUseCase updateClassSchedule,
            DeleteClassScheduleUseCase deleteClassSchedule,
            GetClassSchedulesByClassIdUseCase getClassSchedulesByClassId,
            CreateEnrollmentUseCase createEnrollment,
            DeleteEnrollmentUseCase deleteEnrollment,
            GetEnrollmentsByClassUseCase getEnrollmentsByClass)
        {
            // Subject
            _createSubject = createSubject;
            _updateSubject = updateSubject;
            _deleteSubject = deleteSubject;
            _getSubjectById = getSubjectById;
            _getAllSubjects = getAllSubjects;
            // Class
            _createClass = createClass;
            _updateClass = updateClass;
            _deleteClass = deleteClass;
            _getClassById = getClassById;
            _getAllClasses = getAllClasses;
            _getClassesByTeacher = getClassesByTeacher;
            _getClassesBySubject = getClassesBySubject;
            _changeClassStatus = changeClassStatus;
            // ClassSchedule
            _createClassSchedule = createClassSchedule;
            _updateClassSchedule = updateClassSchedule;
            _deleteClassSchedule = deleteClassSchedule;
            _getClassSchedulesByClassId = getClassSchedulesByClassId;
            //Enrollments
            _createEnrollment = createEnrollment;
            _deleteEnrollment = deleteEnrollment;
            _getEnrollmentsByClass = getEnrollmentsByClass;
        }

        // Subject
        public Task<SubjectResponse> CreateSubjectAsync(CreateSubjectRequest request, CancellationToken ct)
            => _createSubject.ExecuteAsync(request, ct);
        public Task<SubjectResponse> UpdateSubjectAsync(Guid id, UpdateSubjectRequest request, CancellationToken ct)
            => _updateSubject.ExecuteAsync(id, request, ct);
        public Task<bool> DeleteSubjectAsync(Guid id, CancellationToken ct)
            => _deleteSubject.ExecuteAsync(id, ct);
        public Task<SubjectResponse> GetSubjectByIdAsync(Guid id, CancellationToken ct)
            => _getSubjectById.ExecuteAsync(id, ct);
        public Task<IEnumerable<SubjectResponse>> GetAllSubjectsAsync(CancellationToken ct)
            => _getAllSubjects.ExecuteAsync(ct);

        // Class
        public Task<ClassResponse> CreateClassAsync(CreateClassRequest request, CancellationToken ct)
            => _createClass.ExecuteAsync(request, ct);
        public Task<ClassResponse> UpdateClassAsync(Guid id, UpdateClassRequest request, CancellationToken ct)
            => _updateClass.ExecuteAsync(id, request, ct);
        public Task<bool> DeleteClassAsync(Guid id, CancellationToken ct)
            => _deleteClass.ExecuteAsync(id, ct);
        public Task<ClassResponse> GetClassByIdAsync(Guid id, CancellationToken ct)
            => _getClassById.ExecuteAsync(id, ct);
        public Task<IEnumerable<ClassResponse>> GetAllClassesAsync(CancellationToken ct)
            => _getAllClasses.ExecuteAsync(ct);
        public Task<IEnumerable<ClassResponse>> GetClassesByTeacherAsync(Guid teacherId, CancellationToken ct)
            => _getClassesByTeacher.ExecuteAsync(teacherId, ct);
        public Task<IEnumerable<ClassResponse>> GetClassesBySubjectAsync(Guid subjectId, CancellationToken ct)
            => _getClassesBySubject.ExecuteAsync(subjectId, ct);
        public Task<bool> ChangeClassStatusAsync(Guid id, bool isActive, CancellationToken ct)
            => _changeClassStatus.ExecuteAsync(id, isActive, ct);

        // ClassSchedule
        public Task<ClassScheduleResponse> CreateClassScheduleAsync(CreateClassScheduleRequest request, CancellationToken ct)
            => _createClassSchedule.ExecuteAsync(request, ct);
        public Task<ClassScheduleResponse> UpdateClassScheduleAsync(Guid scheduleId, UpdateClassScheduleRequest request, CancellationToken ct)
            => _updateClassSchedule.ExecuteAsync(scheduleId, request, ct);
        public Task<bool> DeleteClassScheduleAsync(Guid scheduleId, CancellationToken ct)
            => _deleteClassSchedule.ExecuteAsync(scheduleId, ct);
        public Task<IEnumerable<ClassScheduleResponse>> GetClassSchedulesByClassIdAsync(Guid classId, CancellationToken ct)
            => _getClassSchedulesByClassId.ExecuteAsync(classId, ct);

        public Task<EnrollmentResponse> CreateEnrollmentAsync(CreateEnrollmentRequest request, CancellationToken ct = default)
            => _createEnrollment.ExecuteAsync(request, ct);
        public Task<bool> DeleteEnrollmentAsync(Guid enrollmentId, CancellationToken ct = default)
            => _deleteEnrollment.ExecuteAsync(enrollmentId, ct);
        public Task<IEnumerable<EnrollmentResponse>> GetEnrollmentsByClassAsync(Guid classId, CancellationToken ct = default)
            => _getEnrollmentsByClass.ExecuteAsync(classId, ct);
    }

}
