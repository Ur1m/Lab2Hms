using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Therapy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Therapies",
                columns: table => new
                {
                    Therapy_Id = table.Column<Guid>(nullable: false),
                    terapia = table.Column<string>(nullable: true),
                    OnGoing = table.Column<string>(nullable: true),
                    Pacient_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Therapies", x => x.Therapy_Id);
                    table.ForeignKey(
                        name: "FK_Therapy_Pacient_id",
                        column: x => x.Pacient_id,
                        principalTable: "pacientet",
                        principalColumn: "Pacient_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Therapies_Pacient_id",
                table: "Therapies",
                column: "Pacient_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Therapies");
        }
    }
}
