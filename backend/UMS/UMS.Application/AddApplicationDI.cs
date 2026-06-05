using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Shared;
using UMS.Application.UseCases.Auth;
using UMS.Application.Validator.Profiles;

namespace UMS.Application
{
    public static class AddApplicationDI
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<UpdateProfileRequestValidator>();

            services.Scan(scan => scan
                .FromAssemblyOf<IUnitOfWork>()
                .AddClasses(clasess => clasess.Where(c => c.Name.EndsWith("UseCase")), publicOnly: false)
                .AsSelf()
                .WithScopedLifetime());

            return services;
        }
    }
}
