using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Laboratoret : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Laboratoret",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Emri = table.Column<string>(nullable: true),
                    NrId = table.Column<string>(nullable: true),
                    Mosha = table.Column<string>(nullable: true),
                    Pershkrimi = table.Column<string>(nullable: true),
                    Rezultati = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    City = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratoret", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laboratoret");
        }
    }
}
