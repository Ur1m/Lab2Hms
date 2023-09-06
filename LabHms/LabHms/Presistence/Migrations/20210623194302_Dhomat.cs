using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Dhomat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dhomat",
                columns: table => new
                {
                    Dhoma_Id = table.Column<Guid>(nullable: false),
                    nrDhomes = table.Column<int>(nullable: false),
                    Pershkrimi = table.Column<string>(nullable: true),
                    llojiDhomes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dhomat", x => x.Dhoma_Id);
                });

            migrationBuilder.CreateTable(
                name: "ShtreteritNeDhome",
                columns: table => new
                {
                    ShtreteritNeDhome_Id = table.Column<Guid>(nullable: false),
                    Dhoma_Id = table.Column<Guid>(nullable: false),
                    Shtrat_Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShtreteritNeDhome", x => x.ShtreteritNeDhome_Id);
                    table.ForeignKey(
                        name: "FK_ShtreteritNeDhome_Dhoma_Id",
                        column: x => x.Dhoma_Id,
                        principalTable: "Dhomat",
                        principalColumn: "Dhoma_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShtreteritNeDhome_Shtrat_Id",
                        column: x => x.Shtrat_Id,
                        principalTable: "Shtreter",
                        principalColumn: "Shtrat_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShtreteritNeDhome_Dhoma_Id",
                table: "ShtreteritNeDhome",
                column: "Dhoma_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ShtreteritNeDhome_Shtrat_Id",
                table: "ShtreteritNeDhome",
                column: "Shtrat_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShtreteritNeDhome");

            migrationBuilder.DropTable(
                name: "Dhomat");
        }
    }
}
