using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Account
    {
        public Guid Id { get; private set; }
        public string Username { get; private set; } = string.Empty;
        public string PasswordHash { get; private set; } = string.Empty;
        public Roles Role { get; private set; }
        public bool IsActive { get; private set; }
        public string? RefreshToken { get; private set; }
        public DateTime RefreshTokenExpiry { get; private set; }

        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        public Staff? Staff { get; private set; }
        public Teacher? Teacher { get; private set; }
        public Student? Student { get; private set; }

        private Account() { }

        public Account(string username, string passwordHash, Roles role)
        {
            Id = Guid.NewGuid();
            Username = username;
            PasswordHash = passwordHash;
            Role = role;
            IsActive =  true;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdatePassword(string newPasswordHash)
        {
            PasswordHash = newPasswordHash;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetRefreshToken(string refreshToken, DateTime expiry)
        {
            RefreshToken = refreshToken;
            RefreshTokenExpiry = expiry;
            UpdatedAt = DateTime.UtcNow;
        }

        public void RevokeRefreshToken()
        {
            RefreshToken = null;
            RefreshTokenExpiry = DateTime.MinValue;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Activate()
        {
            IsActive = true;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
            UpdatedAt = DateTime.UtcNow;

            RevokeRefreshToken();
        }
    }
}
