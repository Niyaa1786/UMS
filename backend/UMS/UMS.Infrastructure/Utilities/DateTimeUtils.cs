using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Infrastructure.Utilities
{
    internal static class DateTimeUtils
    {
        public static string GetYearSuffix()
        {
            return DateTime.Now.Year.ToString("yy");
        }
    }
}
