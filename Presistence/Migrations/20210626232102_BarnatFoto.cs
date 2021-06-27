using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class BarnatFoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Barnats",
                columns: table => new
                {
                    Barnat_Id = table.Column<Guid>(nullable: false),
                    BName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DataRegjistrimit = table.Column<DateTime>(nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Barnats", x => x.Barnat_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Barnats");
        }
    }
}
