using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class caktoShtreter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "caktoShtreterit",
                columns: table => new
                {
                    caktoShtratin_id = table.Column<Guid>(nullable: false),
                    kohaHyrjes = table.Column<DateTime>(nullable: false),
                    kohaLeshimit = table.Column<DateTime>(nullable: false),
                    Pacient_id = table.Column<Guid>(nullable: false),
                    Shtrat_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_caktoShtreterit", x => x.caktoShtratin_id);
                    table.ForeignKey(
                        name: "FK_caktoShtratin_Pacient_id",
                        column: x => x.Pacient_id,
                        principalTable: "pacientet",
                        principalColumn: "Pacient_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_caktoShtratin_Shtrat_id",
                        column: x => x.Shtrat_id,
                        principalTable: "Shtreter",
                        principalColumn: "Shtrat_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_caktoShtreterit_Pacient_id",
                table: "caktoShtreterit",
                column: "Pacient_id");

            migrationBuilder.CreateIndex(
                name: "IX_caktoShtreterit_Shtrat_id",
                table: "caktoShtreterit",
                column: "Shtrat_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "caktoShtreterit");
        }
    }
}
