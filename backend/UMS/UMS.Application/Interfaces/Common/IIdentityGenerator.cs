using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.Interfaces.Common
{
    public interface IIdentityGenerator
    {
        public void GenerateStaffId();
        public void GenerateTeacherId();
        public void GenerateStudentId();
    }
}
