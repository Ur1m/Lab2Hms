using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class Mjeket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mjeket",
                columns: table => new
                {
                    Mjeku_Id = table.Column<Guid>(nullable: false),
                    Emri = table.Column<string>(nullable: true),
                    Mbimeri = table.Column<string>(nullable: true),
                    Ditlindja = table.Column<DateTime>(nullable: false),
                    Specializimi = table.Column<string>(nullable: true),
                    depName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mjeket", x => x.Mjeku_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mjeket");
        }
    }
}
