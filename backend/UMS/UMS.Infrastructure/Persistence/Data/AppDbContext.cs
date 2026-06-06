using Microsoft.EntityFrameworkCore; 
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Infrastructure.Persistence.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).HasMaxLength(50).IsRequired();
                entity.Property(e => e.PasswordHash).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Role).HasMaxLength(20).HasConversion<string>();
                entity.HasIndex(e => e.Username).IsUnique();
            });

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FullName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Gender).HasMaxLength(10).HasConversion<string>();
                entity.Property(e => e.Faculty).HasMaxLength(50).HasConversion<string>();
                entity.HasIndex(e => e.AccountId).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.HasOne(e => e.Account)
                      .WithOne(e => e.Teacher)
                      .HasForeignKey<Teacher>(e => e.AccountId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id);

                entity.Property(e => e.FullName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Major).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Gender).HasMaxLength(10).HasConversion<string>();
                entity.HasIndex(e => e.AccountId).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.HasOne(e => e.Account)
                      .WithOne(e => e.Student)
                      .HasForeignKey<Student>(e => e.AccountId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id);
                entity.Property(e => e.FullName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Department).HasMaxLength(50).HasConversion<string>();
                entity.Property(e => e.Gender).HasMaxLength(10).HasConversion<string>();
                entity.HasIndex(e => e.AccountId).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.HasOne(e => e.Account)
                      .WithOne(e => e.Staff)
                      .HasForeignKey<Staff>(e => e.AccountId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            SeedAdmin(modelBuilder);
        }
        private void SeedAdmin(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasData(new
            {
                Id = Guid.Parse("a86b9e40-529a-43cf-bf24-749ea3626fa3"),
                Username = "admin",
                PasswordHash = "$2a$11$R9h/l9yWdfA9p9bY7IqgUeY6lXjL8tUe3gW7.M.B7Pj4Yp.f7U2Z.",
                Role = Roles.Admin,
                IsActive = true,
                RefreshToken = (string?)null,
                RefreshTokenExpiry = DateTime.MinValue,
                CreatedAt = new DateTime(2026, 6, 6, 0, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 6, 6, 0, 0, 0, DateTimeKind.Utc)
            });
        }
    }
}
