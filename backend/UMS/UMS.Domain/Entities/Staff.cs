using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Staff
    {
        public Guid Id { get; private set; }
        public string FullName { get; private set; } = string.Empty;
        public DateTime DateOfBirth { get; private set; }
        public Gender Gender { get; private set; }
        public string Email { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public string Address { get; private set; } = string.Empty;
        public Department Department { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private Staff() { }

        public Staff(string fullName, string email, DateTime dateOfBirth, string phone, string address, Department department, Gender gender = Gender.Unknown)
        {
            Id = Guid.NewGuid();
            FullName = fullName;
            Email = email;
            DateOfBirth = dateOfBirth;
            Phone = phone;
            Address = address;
            Department = department;
            Gender = gender;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateProfile(Gender gender, string phone, string address)
        {
            Gender = gender;
            Phone = phone;
            Address = address;
        }

        public void UpdateDetails(string fullName, string email, string phone, string address, Department department, DateTime dateOfBirth, Gender gender)
        {
            FullName = fullName;
            Email = email;
            Phone = phone;
            Address = address;
            Department = department;
            DateOfBirth = dateOfBirth;
            Gender = gender;
        }
    }
}
