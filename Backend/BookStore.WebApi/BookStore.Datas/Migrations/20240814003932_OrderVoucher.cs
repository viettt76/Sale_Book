using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Datas.Migrations
{
    /// <inheritdoc />
    public partial class OrderVoucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "Orders");
        }
    }
}
