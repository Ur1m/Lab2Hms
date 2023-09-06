using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Laboratort : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Laboratort",
                columns: table => new
                {
                    Lab_Id = table.Column<Guid>(nullable: false),
                    Emri = table.Column<string>(nullable: true),
                    Pershkrimi = table.Column<string>(nullable: true),
                    Fotografia = table.Column<string>(nullable: true),
                    Department_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratort", x => x.Lab_Id);
                    table.ForeignKey(
                        name: "FK_Laboratori_Department_id",
                        column: x => x.Department_id,
                        principalTable: "Departmentet",
                        principalColumn: "Department_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Laboratort_Department_id",
                table: "Laboratort",
                column: "Department_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laboratort");
        }
    }
}
