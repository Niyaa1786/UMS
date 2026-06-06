using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UMS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminPasswordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: new Guid("a86b9e40-529a-43cf-bf24-749ea3626fa3"),
                column: "PasswordHash",
                value: "$2a$11$E3RGRhjfkGzTz5J42JIOXe3dpiCEGaiZZxLIYfm0qdwnc/xFU/w.u");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: new Guid("a86b9e40-529a-43cf-bf24-749ea3626fa3"),
                column: "PasswordHash",
                value: "$2a$11$R9h/l9yWdfA9p9bY7IqgUeY6lXjL8tUe3gW7.M.B7Pj4Yp.f7U2Z.");
        }
    }
}
