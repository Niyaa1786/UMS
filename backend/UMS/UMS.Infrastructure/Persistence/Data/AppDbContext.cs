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

        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<ClassSchedule> ClassSchedules { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }

        public DbSet<Grade> Grades { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

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

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Code).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Credits).IsRequired();

                entity.HasIndex(e => e.Code).IsUnique();
            });

            modelBuilder.Entity<Class>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Code).HasMaxLength(30).IsRequired();
                entity.Property(e => e.SchoolYear).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Semester).IsRequired();
                entity.Property(e => e.StartDate).IsRequired();
                entity.Property(e => e.EndDate).IsRequired();
                entity.Property(e => e.MaxStudents).IsRequired();
                entity.Property(e => e.Status).HasMaxLength(20).HasConversion<string>().IsRequired();

                entity.HasIndex(e => e.Code).IsUnique();

                entity.HasOne(e => e.Subject)
                    .WithMany()
                    .HasForeignKey(e => e.SubjectId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Teacher)
                    .WithMany()
                    .HasForeignKey(e => e.TeacherId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ClassSchedule>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DayOfWeek).IsRequired();
                entity.Property(e => e.StartTime).IsRequired();
                entity.Property(e => e.EndTime).IsRequired();
                entity.Property(e => e.Room).HasMaxLength(50).IsRequired();

                entity.HasIndex(e => new { e.ClassId, e.DayOfWeek, e.StartTime }).IsUnique().HasDatabaseName("UNQ_Class_Schedule_Conflict_Prevent");

                entity.HasOne(e => e.Class)
                    .WithMany(c => c.ClassSchedules)
                    .HasForeignKey(e => e.ClassId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Enrollment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status).HasMaxLength(20).IsRequired();
                entity.HasOne(e => e.Class)
                      .WithMany()
                      .HasForeignKey(e => e.ClassId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Student)
                      .WithMany()
                      .HasForeignKey(e => e.StudentId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(e => new { e.ClassId, e.StudentId })
                      .IsUnique()
                      .HasDatabaseName("UNQ_Enrollment_ClassStudent");
            });

            modelBuilder.Entity<Grade>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.GradeType).HasMaxLength(30).HasConversion<string>().IsRequired();
                entity.Property(e => e.Score).IsRequired();
                entity.Property(e => e.MaxScore).IsRequired().HasDefaultValue(10);
                entity.Property(e => e.Weight).IsRequired().HasDefaultValue(1.0f);
                entity.Property(e => e.Note).HasMaxLength(500);

                entity.HasOne(e => e.Enrollment)
                      .WithMany()
                      .HasForeignKey(e => e.EnrollmentId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.EnrollmentId, e.GradeType })
                      .IsUnique()
                      .HasDatabaseName("UNQ_Enrollment_GradeType");
            });

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status).HasMaxLength(20).HasConversion<string>().IsRequired();
                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.HasOne(e => e.Enrollment)
                      .WithMany()
                      .HasForeignKey(e => e.EnrollmentId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.EnrollmentId, e.CheckDate })
                      .IsUnique()
                      .HasDatabaseName("UNQ_Attendance_EnrollmentDate");
            });

            SeedAdmin(modelBuilder);
        }
        private void SeedAdmin(ModelBuilder modelBuilder)
        {
            const string passwordHash = "$2a$11$E3RGRhjfkGzTz5J42JIOXe3dpiCEGaiZZxLIYfm0qdwnc/xFU/w.u";
            modelBuilder.Entity<Account>().HasData(new
            {
                Id = Guid.Parse("a86b9e40-529a-43cf-bf24-749ea3626fa3"),
                Username = "admin",
                PasswordHash = passwordHash,
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
