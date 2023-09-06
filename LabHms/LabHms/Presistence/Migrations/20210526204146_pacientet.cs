using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Presistence.Migrations
{
    public partial class pacientet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pacientet",
                columns: table => new
                {
                    Pacient_Id = table.Column<Guid>(nullable: false),
                    emri = table.Column<string>(nullable: true),
                    mbimeri = table.Column<string>(nullable: true),
                    adresa = table.Column<string>(nullable: true),
                    qyteti = table.Column<string>(nullable: true),
                    ditlindja = table.Column<DateTime>(nullable: false),
                    grupigjakut = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pacientet", x => x.Pacient_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pacientet");
        }
    }
}
