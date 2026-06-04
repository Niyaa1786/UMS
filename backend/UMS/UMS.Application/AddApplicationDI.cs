using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Validator.Profiles;

namespace UMS.Application
{
    public static class AddApplicationDI
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<UpdateProfileRequestValidator>();

            return services;
        }
    }
}
