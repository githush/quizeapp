using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetReact.DataAccess.Migrations
{
    public partial class extandUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "K",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "K",
                table: "AspNetUsers");
        }
    }
}
