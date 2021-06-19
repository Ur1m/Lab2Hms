using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Paisjet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "paisjet",
                columns: table => new
                {
                    Paisja_Id = table.Column<Guid>(nullable: false),
                    emertimi = table.Column<string>(nullable: true),
                    pershkrimi = table.Column<string>(nullable: true),
                    servisimi = table.Column<DateTime>(nullable: true),
                    Department_Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paisjet", x => x.Paisja_Id);
                    table.ForeignKey(
                        name: "FK_paisjet_Departmentet_Department_Id",
                        column: x => x.Department_Id,
                        principalTable: "Departmentet",
                        principalColumn: "Department_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_paisjet_Department_Id",
                table: "paisjet",
                column: "Department_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "paisjet");
        }
    }
}
