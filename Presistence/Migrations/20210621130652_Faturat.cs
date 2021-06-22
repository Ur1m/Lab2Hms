using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Faturat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Faturat",
                columns: table => new
                {
                    Fatura_Id = table.Column<Guid>(nullable: false),
                    Titulli = table.Column<string>(nullable: true),
                    Pershkrimi = table.Column<string>(nullable: true),
                    Shuma = table.Column<int>(nullable: false),
                    KrijuarMe = table.Column<DateTime>(nullable: true),
                    Statusi = table.Column<string>(nullable: true),
                    Pacient_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faturat", x => x.Fatura_Id);
                    table.ForeignKey(
                        name: "FK_Fatura_Pacient_id",
                        column: x => x.Pacient_id,
                        principalTable: "pacientet",
                        principalColumn: "Pacient_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Faturat_Pacient_id",
                table: "Faturat",
                column: "Pacient_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Faturat");
        }
    }
}
