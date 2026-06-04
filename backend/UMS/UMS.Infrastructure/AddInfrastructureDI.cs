using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Infrastructure.Persistence.Data;
using UMS.Infrastructure.Persistence.Repositories;
using UMS.Infrastructure.Security;
using UMS.Infrastructure.Services;

namespace UMS.Infrastructure
{
    public static class AddInfrastructureDI
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IPasswordHasher, PasswordHasher>();
            services.AddScoped<IIdentityGenerator, IdentityGenerator>();
            return services;
        }
    }
}
