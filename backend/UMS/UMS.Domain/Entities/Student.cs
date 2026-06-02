using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Student
    {
        public Guid Id { get; private set; }
        public string FullName { get; private set; } = string.Empty;
        public DateTime DateOfBirth { get; private set; }
        public Gender Gender { get; private set; }
        public string Email { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public string Address { get; private set; } = string.Empty;
        public string Major { get; private set; } = string.Empty;

        public DateTime CreatedAt { get; private set; }

        private Student() { }

        public Student(string fullName, string email, DateTime dateOfBirth, string phone, string address, Gender    gender, string major)
        {
            Id = Guid.NewGuid();
            FullName = fullName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            Email = email;
            Phone = phone;
            Address = address;
            Major = major;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateProfile(string fullName, DateTime dateOfBirth, Gender gender, string phone, string address)
        {
            DateOfBirth = dateOfBirth;
            Gender = gender;
            Phone = phone;
            Address = address;
        }

        public void ChangeMajor(string newMajor)
        {
            Major = newMajor;
        }

        public void ChangeEmail(string newEmail)
        {
            Email = newEmail;
        }
    }
}
