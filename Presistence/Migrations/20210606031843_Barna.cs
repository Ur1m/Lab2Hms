using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Barna : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Barnat",
                columns: table => new
                {
                    Barnat_Id = table.Column<Guid>(nullable: false),
                    BName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DataRegjistrimit = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Barnat", x => x.Barnat_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Barnat");
        }
    }
}
