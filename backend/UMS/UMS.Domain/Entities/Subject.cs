using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Domain.Entities
{
    public class Subject
    {
        public Guid Id { get; private set; }
        public string Code { get; private set; } = string.Empty;
        public string Name { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public int Credits { get; private set; }

        private Subject() { }

        public Subject(string code, string name, string? description, int credits)
        {
            Id = Guid.NewGuid();
            Code = code;
            Name = name;
            Description = description;
            Credits = credits;
        }

        public void UpdateDetails(string name, string? description, int credits)
        {
            Name = name;
            Description = description;
            Credits = credits;
        }

    }
}
