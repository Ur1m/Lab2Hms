using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Infermierja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Infermieret",
                columns: table => new
                {
                    Infermierja_Id = table.Column<Guid>(nullable: false),
                    Emri = table.Column<string>(nullable: true),
                    Mbiemri = table.Column<string>(nullable: true),
                    Koeficienti = table.Column<int>(nullable: false),
                    Departamenti = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infermieret", x => x.Infermierja_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Infermieret");
        }
    }
}
