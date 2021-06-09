using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class llojeteShtreterve : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "llojeteShtreterve",
                columns: table => new
                {
                    llojiShtratit_id = table.Column<Guid>(nullable: false),
                    emri = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_llojeteShtreterve", x => x.llojiShtratit_id);
                });

            migrationBuilder.CreateTable(
                name: "Shtreter",
                columns: table => new
                {
                    Shtrat_id = table.Column<Guid>(nullable: false),
                    nrShtratit = table.Column<int>(nullable: false),
                    Statusi = table.Column<string>(nullable: true),
                    Pershkrimi = table.Column<string>(nullable: true),
                    llojiShtratit_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shtreter", x => x.Shtrat_id);
                    table.ForeignKey(
                        name: "FK_Shtrat_llojiShtratit_id",
                        column: x => x.llojiShtratit_id,
                        principalTable: "llojeteShtreterve",
                        principalColumn: "llojiShtratit_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shtreter_llojiShtratit_id",
                table: "Shtreter",
                column: "llojiShtratit_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shtreter");

            migrationBuilder.DropTable(
                name: "llojeteShtreterve");
        }
    }
}
