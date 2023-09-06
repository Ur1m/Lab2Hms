using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Paisjets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Paisjets",
                columns: table => new
                {
                    Paisja_Id = table.Column<Guid>(nullable: false),
                    emertimi = table.Column<string>(nullable: true),
                    pershkrimi = table.Column<string>(nullable: true),
                    servisimi = table.Column<DateTime>(nullable: true),
                    Department_Id = table.Column<Guid>(nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paisjets", x => x.Paisja_Id);
                    table.ForeignKey(
                        name: "FK_Paisjets_Departmentet_Department_Id",
                        column: x => x.Department_Id,
                        principalTable: "Departmentet",
                        principalColumn: "Department_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Paisjets_Department_Id",
                table: "Paisjets",
                column: "Department_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Paisjets");
        }
    }
}
