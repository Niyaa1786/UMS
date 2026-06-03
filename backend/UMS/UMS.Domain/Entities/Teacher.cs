using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Teacher
    {
        public Guid Id { get; private set; }
        public string FullName { get; private set; } = string.Empty;
        public DateTime DateOfBirth { get; private set; }
        public Gender Gender { get; private set; }
        public string Email { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public string Address { get; private set; } = string.Empty;
        public Faculty Faculty { get; private set; } 
        
        public DateTime CreatedAt { get; private set; }

        private Teacher() { }   

        public Teacher(string fullName, string email, DateTime dateOfBirth, string phone,string address, Faculty faculty, Gender gender = Gender.Unknown)
        {
            Id = Guid.NewGuid();
            FullName = fullName;
            Gender = gender;
            DateOfBirth = dateOfBirth;
            Address = address;
            Email = email;
            Phone = phone;
            Faculty = faculty;
            CreatedAt = DateTime.UtcNow;
        }

        public void Update(string fullName, string email, DateTime dateOfBirth, Gender gender, string phone,string address, Faculty faculty)
        {
            FullName = fullName;
            Gender = gender;
            DateOfBirth = dateOfBirth;
            Email = email;
            Phone = phone;
            Address = address;
            Faculty = faculty;
        }
    }
}
