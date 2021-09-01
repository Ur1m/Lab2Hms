using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Raportet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Raportet",
                columns: table => new
                {
                    Raport_Id = table.Column<Guid>(nullable: false),
                    raporti = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Paisja_Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raportet", x => x.Raport_Id);
                    table.ForeignKey(
                        name: "FK_Raport_Paisja_Id",
                        column: x => x.Paisja_Id,
                        principalTable: "Paisjets",
                        principalColumn: "Paisja_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Raportet_Paisja_Id",
                table: "Raportet",
                column: "Paisja_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Raportet");
        }
    }
}
