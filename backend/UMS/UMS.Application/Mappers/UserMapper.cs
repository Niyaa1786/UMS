using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Profile;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal class UserMapper
    {
        public static Student ToEntity(CreateStudentRequest request, Guid accountId)
        {
            return new Student(
                accountId: accountId,
                fullName: request.FullName,
                email: request.Email,
                dateOfBirth: request.DateOfBirth,
                phone: request.Phone,
                address: request.Address,
                major: request.Major,
                gender: request.Gender
            );
        }

        public static Teacher ToEntity(CreateTeacherRequest request, Guid accountId)
        {
            return new Teacher(
                accountId: accountId,
                fullName: request.FullName,
                email: request.Email,
                dateOfBirth: request.DateOfBirth,
                phone: request.Phone,
                address: request.Address,
                faculty: request.Faculty,
                gender: request.Gender
            );
        }

        public static Staff ToEntity(CreateStaffRequest request, Guid accountId)
        {
            return new Staff(
                accountId: accountId,
                fullName: request.FullName,
                email: request.Email,
                dateOfBirth: request.DateOfBirth,
                phone: request.Phone,
                address: request.Address,
                department: request.Department,
                gender: request.Gender
            );
        }

        public static StudentResponse ToResponse(Student student)
        {
            return new StudentResponse
            {
                Id = student.Id,
                FullName = student.FullName,
                Email = student.Email,
                DateOfBirth = student.DateOfBirth,
                Phone = student.Phone,
                Gender = student.Gender,
                Address = student.Address,
                Major = student.Major,

                StudentId = student.Account!.Username,
                IsActive = student.Account.IsActive
            };
        }

        public static TeacherResponse ToResponse(Teacher teacher)
        {
            return new TeacherResponse
            {
                Id = teacher.Id,
                FullName = teacher.FullName,
                Email = teacher.Email,
                DateOfBirth = teacher.DateOfBirth,
                Phone = teacher.Phone,
                Gender = teacher.Gender,
                Address = teacher.Address,
                Faculty = teacher.Faculty,

                TeacherId = teacher.Account!.Username,
                IsActive = teacher.Account.IsActive
            };
        }

        public static StaffResponse ToResponse(Staff staff)
        {
            return new StaffResponse
            {
                Id = staff.Id,
                FullName = staff.FullName,
                Email = staff.Email,
                DateOfBirth = staff.DateOfBirth,
                Phone = staff.Phone,
                Gender = staff.Gender,
                Address = staff.Address,
                Department = staff.Department,

                StaffId = staff.Account!.Username,
                IsActive = staff.Account.IsActive
            };
        }

        //UpdateProfile
        public static void ApplyProfileUpdate(UpdateStudentRequest request, Student student)
        {
            student.UpdateProfile(
                address: request.Address,
                phone: request.Phone,
                gender: request.Gender
            );
        }

        public static void ApplyProfileUpdate(UpdateProfileRequest request, Teacher teacher)
        {
            teacher.UpdateProfile(
                address: request.Address,
                phone: request.Phone,
                gender: request.Gender
            );
        }

        public static void ApplyProfileUpdate(UpdateStaffRequest request, Staff staff)
        {
            staff.UpdateProfile(
                address: request.Address,
                phone: request.Phone,
                gender: request.Gender
            );
        }

        //UpdateDetails
        public static void ApplyDetailsUpdate(UpdateStudentRequest request, Student student)
        {
            student.UpdateDetails(
                fullName: request.FullName,
                email: request.Email,
                phone: request.Phone,
                address: request.Address,
                dateOfBirth: request.DateOfBirth,
                major: request.Major,
                gender: request.Gender
            );
        }

        public static void ApplyDetailsUpdate(UpdateTeacherRequest request, Teacher teacher)
        {
            teacher.UpdateDetails(
                fullName: request.FullName,
                email: request.Email,
                phone: request.Phone,
                address: request.Address,
                dateOfBirth: request.DateOfBirth,
                faculty: request.Faculty,
                gender: request.Gender
            );
        }

        public static void ApplyDetailsUpdate(UpdateStaffRequest request, Staff staff)
        {
            staff.UpdateDetails(
                fullName: request.FullName,
                email: request.Email,
                phone: request.Phone,
                address: request.Address,
                dateOfBirth: request.DateOfBirth,
                department: request.Department,
                gender: request.Gender
            );
        }
    }
}

