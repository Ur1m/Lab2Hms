using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Ambulacat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ambulancat",
                columns: table => new
                {
                    Amb_Id = table.Column<Guid>(nullable: false),
                    Tipi = table.Column<string>(nullable: true),
                    Fotografia = table.Column<string>(nullable: true),
                    Department_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambulancat", x => x.Amb_Id);
                    table.ForeignKey(
                        name: "FK_Ambulanca_Department_id",
                        column: x => x.Department_id,
                        principalTable: "Departmentet",
                        principalColumn: "Department_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ambulancat_Department_id",
                table: "Ambulancat",
                column: "Department_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ambulancat");
        }
    }
}
