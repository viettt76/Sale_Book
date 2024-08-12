using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Datas.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalPageNumber",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPageNumber",
                table: "Books");
        }
    }
}
