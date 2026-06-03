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

        public Guid AccountId { get; private set; }
        public Account? Account { get; private set; }

        private Student() { }

        public Student(Guid accountId, string fullName, string email, DateTime dateOfBirth, string phone, string address, string major, Gender gender)
        {
            Id = Guid.NewGuid();
            AccountId = accountId;
            FullName = fullName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            Email = email;
            Phone = phone;
            Address = address;
            Major = major;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateProfile(Gender gender, string phone, string address)
        {
            Gender = gender;
            Phone = phone;
            Address = address;
        }

        public void UpdateDetails(string fullName, string email, string phone, string address, string major, DateTime dateOfBirth, Gender gender)
        {
            FullName = fullName;
            Email = email;
            Phone = phone;
            Address = address;
            Major = major;
            DateOfBirth = dateOfBirth;
            Gender = gender;
        }
    }
}
