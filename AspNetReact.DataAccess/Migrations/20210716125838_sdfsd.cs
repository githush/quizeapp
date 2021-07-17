using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetReact.DataAccess.Migrations
{
    public partial class sdfsd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuoteText",
                table: "GameHistories",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuoteText",
                table: "GameHistories");
        }
    }
}
