using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Terminmjeksor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Terminet",
                columns: table => new
                {
                    termini_ID = table.Column<Guid>(nullable: false),
                    Pacient_Id = table.Column<Guid>(nullable: false),
                    Mjeku_Id = table.Column<Guid>(nullable: false),
                    orari = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminet", x => x.termini_ID);
                    table.ForeignKey(
                        name: "FK_Terminat_Doktoret",
                        column: x => x.Mjeku_Id,
                        principalTable: "Mjeket",
                        principalColumn: "Mjeku_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Temrinet_Pacinetat",
                        column: x => x.Pacient_Id,
                        principalTable: "pacientet",
                        principalColumn: "Pacient_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_Mjeku_Id",
                table: "Terminet",
                column: "Mjeku_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_Pacient_Id",
                table: "Terminet",
                column: "Pacient_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Terminet");
        }
    }
}
