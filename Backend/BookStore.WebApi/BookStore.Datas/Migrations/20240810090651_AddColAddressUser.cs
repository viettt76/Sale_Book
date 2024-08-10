using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Datas.Migrations
{
    /// <inheritdoc />
    public partial class AddColAddressUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                table: "AspNetRoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_BookAuthors_Authors_AuthorId",
                table: "BookAuthors");

            migrationBuilder.DropForeignKey(
                name: "FK_BookAuthors_Books_BookId",
                table: "BookAuthors");

            migrationBuilder.DropForeignKey(
                name: "FK_Books_BookGroup_BookGroupId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Carts_AspNetUsers_UserId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Books_BookId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Books_BookId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_AspNetUsers_UserId",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Books_BookId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RefreshTokens",
                table: "RefreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Publisher",
                table: "Publisher");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Carts",
                table: "Carts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Books",
                table: "Books");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookGroup",
                table: "BookGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookAuthors",
                table: "BookAuthors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Authors",
                table: "Authors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserTokens",
                table: "AspNetUserTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "UserNameIndex",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserRoles",
                table: "AspNetUserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserClaims",
                table: "AspNetUserClaims");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetRoles",
                table: "AspNetRoles");

            migrationBuilder.DropIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetRoleClaims",
                table: "AspNetRoleClaims");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "reviews");

            migrationBuilder.RenameTable(
                name: "RefreshTokens",
                newName: "refreshtokens");

            migrationBuilder.RenameTable(
                name: "Publisher",
                newName: "publisher");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "orders");

            migrationBuilder.RenameTable(
                name: "OrderItems",
                newName: "orderitems");

            migrationBuilder.RenameTable(
                name: "Carts",
                newName: "carts");

            migrationBuilder.RenameTable(
                name: "Books",
                newName: "books");

            migrationBuilder.RenameTable(
                name: "BookGroup",
                newName: "bookgroup");

            migrationBuilder.RenameTable(
                name: "BookAuthors",
                newName: "bookauthors");

            migrationBuilder.RenameTable(
                name: "Authors",
                newName: "authors");

            migrationBuilder.RenameTable(
                name: "AspNetUserTokens",
                newName: "usertokens");

            migrationBuilder.RenameTable(
                name: "AspNetUsers",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "AspNetUserRoles",
                newName: "userroles");

            migrationBuilder.RenameTable(
                name: "AspNetUserLogins",
                newName: "userlogins");

            migrationBuilder.RenameTable(
                name: "AspNetUserClaims",
                newName: "userclaims");

            migrationBuilder.RenameTable(
                name: "AspNetRoles",
                newName: "roles");

            migrationBuilder.RenameTable(
                name: "AspNetRoleClaims",
                newName: "roleclaims");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "reviews",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "reviews",
                newName: "rate");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "reviews",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "reviews",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "reviews",
                newName: "bookid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "reviews",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_UserId",
                table: "reviews",
                newName: "ix_reviews_userid");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_BookId",
                table: "reviews",
                newName: "ix_reviews_bookid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "refreshtokens",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "refreshtokens",
                newName: "token");

            migrationBuilder.RenameColumn(
                name: "JwtId",
                table: "refreshtokens",
                newName: "jwtid");

            migrationBuilder.RenameColumn(
                name: "IsRevoked",
                table: "refreshtokens",
                newName: "isrevoked");

            migrationBuilder.RenameColumn(
                name: "DateExpire",
                table: "refreshtokens",
                newName: "dateexpire");

            migrationBuilder.RenameColumn(
                name: "DateAdded",
                table: "refreshtokens",
                newName: "dateadded");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "refreshtokens",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_RefreshTokens_UserId",
                table: "refreshtokens",
                newName: "ix_refreshtokens_userid");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "publisher",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "publisher",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "orders",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "orders",
                newName: "totalamount");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "orders",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "orders",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "orders",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserId",
                table: "orders",
                newName: "ix_orders_userid");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "orderitems",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "orderitems",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "orderitems",
                newName: "orderid");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "orderitems",
                newName: "bookid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "orderitems",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_OrderId",
                table: "orderitems",
                newName: "ix_orderitems_orderid");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_BookId",
                table: "orderitems",
                newName: "ix_orderitems_bookid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "carts",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "carts",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "carts",
                newName: "bookid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "carts",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Carts_UserId",
                table: "carts",
                newName: "ix_carts_userid");

            migrationBuilder.RenameIndex(
                name: "IX_Carts_BookId",
                table: "carts",
                newName: "ix_carts_bookid");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "books",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "books",
                newName: "rate");

            migrationBuilder.RenameColumn(
                name: "PublishedAt",
                table: "books",
                newName: "publishedat");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "books",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "books",
                newName: "image");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "books",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "BookGroupId",
                table: "books",
                newName: "bookgroupid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "books",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Books_BookGroupId",
                table: "books",
                newName: "ix_books_bookgroupid");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "bookgroup",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "bookgroup",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "bookauthors",
                newName: "authorid");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "bookauthors",
                newName: "bookid");

            migrationBuilder.RenameIndex(
                name: "IX_BookAuthors_AuthorId",
                table: "bookauthors",
                newName: "ix_bookauthors_authorid");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "authors",
                newName: "fullname");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "authors",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "usertokens",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "usertokens",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "LoginProvider",
                table: "usertokens",
                newName: "loginprovider");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "usertokens",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "users",
                newName: "username");

            migrationBuilder.RenameColumn(
                name: "TwoFactorEnabled",
                table: "users",
                newName: "twofactorenabled");

            migrationBuilder.RenameColumn(
                name: "SecurityStamp",
                table: "users",
                newName: "securitystamp");

            migrationBuilder.RenameColumn(
                name: "PhoneNumberConfirmed",
                table: "users",
                newName: "phonenumberconfirmed");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "users",
                newName: "phonenumber");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "users",
                newName: "passwordhash");

            migrationBuilder.RenameColumn(
                name: "NormalizedUserName",
                table: "users",
                newName: "normalizedusername");

            migrationBuilder.RenameColumn(
                name: "NormalizedEmail",
                table: "users",
                newName: "normalizedemail");

            migrationBuilder.RenameColumn(
                name: "LockoutEnd",
                table: "users",
                newName: "lockoutend");

            migrationBuilder.RenameColumn(
                name: "LockoutEnabled",
                table: "users",
                newName: "lockoutenabled");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "users",
                newName: "isactive");

            migrationBuilder.RenameColumn(
                name: "EmailConfirmed",
                table: "users",
                newName: "emailconfirmed");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyStamp",
                table: "users",
                newName: "concurrencystamp");

            migrationBuilder.RenameColumn(
                name: "AccessFailedCount",
                table: "users",
                newName: "accessfailedcount");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "users",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "EmailIndex",
                table: "users",
                newName: "emailindex");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "userroles",
                newName: "roleid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "userroles",
                newName: "userid");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "userroles",
                newName: "ix_userroles_roleid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "userlogins",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "ProviderDisplayName",
                table: "userlogins",
                newName: "providerdisplayname");

            migrationBuilder.RenameColumn(
                name: "ProviderKey",
                table: "userlogins",
                newName: "providerkey");

            migrationBuilder.RenameColumn(
                name: "LoginProvider",
                table: "userlogins",
                newName: "loginprovider");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "userlogins",
                newName: "ix_userlogins_userid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "userclaims",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "ClaimValue",
                table: "userclaims",
                newName: "claimvalue");

            migrationBuilder.RenameColumn(
                name: "ClaimType",
                table: "userclaims",
                newName: "claimtype");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "userclaims",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "userclaims",
                newName: "ix_userclaims_userid");

            migrationBuilder.RenameColumn(
                name: "NormalizedName",
                table: "roles",
                newName: "normalizedname");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "roles",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyStamp",
                table: "roles",
                newName: "concurrencystamp");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "roles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "roleclaims",
                newName: "roleid");

            migrationBuilder.RenameColumn(
                name: "ClaimValue",
                table: "roleclaims",
                newName: "claimvalue");

            migrationBuilder.RenameColumn(
                name: "ClaimType",
                table: "roleclaims",
                newName: "claimtype");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "roleclaims",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "roleclaims",
                newName: "ix_roleclaims_roleid");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_reviews",
                table: "reviews",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_refreshtokens",
                table: "refreshtokens",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_publisher",
                table: "publisher",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_orders",
                table: "orders",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_orderitems",
                table: "orderitems",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_carts",
                table: "carts",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_books",
                table: "books",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_bookgroup",
                table: "bookgroup",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_bookauthors",
                table: "bookauthors",
                columns: new[] { "bookid", "authorid" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_authors",
                table: "authors",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_usertokens",
                table: "usertokens",
                columns: new[] { "userid", "loginprovider", "name" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_userroles",
                table: "userroles",
                columns: new[] { "userid", "roleid" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_userlogins",
                table: "userlogins",
                columns: new[] { "loginprovider", "providerkey" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_userclaims",
                table: "userclaims",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_roles",
                table: "roles",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_roleclaims",
                table: "roleclaims",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "usernameindex",
                table: "users",
                column: "normalizedusername",
                unique: true,
                filter: "[normalizedusername] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "rolenameindex",
                table: "roles",
                column: "normalizedname",
                unique: true,
                filter: "[normalizedname] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "fk_bookauthors_authors_authorid",
                table: "bookauthors",
                column: "authorid",
                principalTable: "authors",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_bookauthors_books_bookid",
                table: "bookauthors",
                column: "bookid",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_books_bookgroup_bookgroupid",
                table: "books",
                column: "bookgroupid",
                principalTable: "bookgroup",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_carts_books_bookid",
                table: "carts",
                column: "bookid",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_carts_users_userid",
                table: "carts",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_orderitems_books_bookid",
                table: "orderitems",
                column: "bookid",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_orderitems_orders_orderid",
                table: "orderitems",
                column: "orderid",
                principalTable: "orders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_orders_users_userid",
                table: "orders",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_refreshtokens_users_userid",
                table: "refreshtokens",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_reviews_books_bookid",
                table: "reviews",
                column: "bookid",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_reviews_users_userid",
                table: "reviews",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_roleclaims_roles_roleid",
                table: "roleclaims",
                column: "roleid",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userclaims_users_userid",
                table: "userclaims",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userlogins_users_userid",
                table: "userlogins",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userroles_roles_roleid",
                table: "userroles",
                column: "roleid",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userroles_users_userid",
                table: "userroles",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_usertokens_users_userid",
                table: "usertokens",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_bookauthors_authors_authorid",
                table: "bookauthors");

            migrationBuilder.DropForeignKey(
                name: "fk_bookauthors_books_bookid",
                table: "bookauthors");

            migrationBuilder.DropForeignKey(
                name: "fk_books_bookgroup_bookgroupid",
                table: "books");

            migrationBuilder.DropForeignKey(
                name: "fk_carts_books_bookid",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "fk_carts_users_userid",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "fk_orderitems_books_bookid",
                table: "orderitems");

            migrationBuilder.DropForeignKey(
                name: "fk_orderitems_orders_orderid",
                table: "orderitems");

            migrationBuilder.DropForeignKey(
                name: "fk_orders_users_userid",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "fk_refreshtokens_users_userid",
                table: "refreshtokens");

            migrationBuilder.DropForeignKey(
                name: "fk_reviews_books_bookid",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "fk_reviews_users_userid",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "fk_roleclaims_roles_roleid",
                table: "roleclaims");

            migrationBuilder.DropForeignKey(
                name: "fk_userclaims_users_userid",
                table: "userclaims");

            migrationBuilder.DropForeignKey(
                name: "fk_userlogins_users_userid",
                table: "userlogins");

            migrationBuilder.DropForeignKey(
                name: "fk_userroles_roles_roleid",
                table: "userroles");

            migrationBuilder.DropForeignKey(
                name: "fk_userroles_users_userid",
                table: "userroles");

            migrationBuilder.DropForeignKey(
                name: "fk_usertokens_users_userid",
                table: "usertokens");

            migrationBuilder.DropPrimaryKey(
                name: "pk_reviews",
                table: "reviews");

            migrationBuilder.DropPrimaryKey(
                name: "pk_refreshtokens",
                table: "refreshtokens");

            migrationBuilder.DropPrimaryKey(
                name: "pk_publisher",
                table: "publisher");

            migrationBuilder.DropPrimaryKey(
                name: "pk_orders",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "pk_orderitems",
                table: "orderitems");

            migrationBuilder.DropPrimaryKey(
                name: "pk_carts",
                table: "carts");

            migrationBuilder.DropPrimaryKey(
                name: "pk_books",
                table: "books");

            migrationBuilder.DropPrimaryKey(
                name: "pk_bookgroup",
                table: "bookgroup");

            migrationBuilder.DropPrimaryKey(
                name: "pk_bookauthors",
                table: "bookauthors");

            migrationBuilder.DropPrimaryKey(
                name: "pk_authors",
                table: "authors");

            migrationBuilder.DropPrimaryKey(
                name: "pk_usertokens",
                table: "usertokens");

            migrationBuilder.DropPrimaryKey(
                name: "pk_users",
                table: "users");

            migrationBuilder.DropIndex(
                name: "usernameindex",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_userroles",
                table: "userroles");

            migrationBuilder.DropPrimaryKey(
                name: "pk_userlogins",
                table: "userlogins");

            migrationBuilder.DropPrimaryKey(
                name: "pk_userclaims",
                table: "userclaims");

            migrationBuilder.DropPrimaryKey(
                name: "pk_roles",
                table: "roles");

            migrationBuilder.DropIndex(
                name: "rolenameindex",
                table: "roles");

            migrationBuilder.DropPrimaryKey(
                name: "pk_roleclaims",
                table: "roleclaims");

            migrationBuilder.DropColumn(
                name: "address",
                table: "users");

            migrationBuilder.RenameTable(
                name: "reviews",
                newName: "Reviews");

            migrationBuilder.RenameTable(
                name: "refreshtokens",
                newName: "RefreshTokens");

            migrationBuilder.RenameTable(
                name: "publisher",
                newName: "Publisher");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "Orders");

            migrationBuilder.RenameTable(
                name: "orderitems",
                newName: "OrderItems");

            migrationBuilder.RenameTable(
                name: "carts",
                newName: "Carts");

            migrationBuilder.RenameTable(
                name: "books",
                newName: "Books");

            migrationBuilder.RenameTable(
                name: "bookgroup",
                newName: "BookGroup");

            migrationBuilder.RenameTable(
                name: "bookauthors",
                newName: "BookAuthors");

            migrationBuilder.RenameTable(
                name: "authors",
                newName: "Authors");

            migrationBuilder.RenameTable(
                name: "usertokens",
                newName: "AspNetUserTokens");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "userroles",
                newName: "AspNetUserRoles");

            migrationBuilder.RenameTable(
                name: "userlogins",
                newName: "AspNetUserLogins");

            migrationBuilder.RenameTable(
                name: "userclaims",
                newName: "AspNetUserClaims");

            migrationBuilder.RenameTable(
                name: "roles",
                newName: "AspNetRoles");

            migrationBuilder.RenameTable(
                name: "roleclaims",
                newName: "AspNetRoleClaims");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "Reviews",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "rate",
                table: "Reviews",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Reviews",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "Reviews",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "bookid",
                table: "Reviews",
                newName: "BookId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Reviews",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_reviews_userid",
                table: "Reviews",
                newName: "IX_Reviews_UserId");

            migrationBuilder.RenameIndex(
                name: "ix_reviews_bookid",
                table: "Reviews",
                newName: "IX_Reviews_BookId");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "RefreshTokens",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "token",
                table: "RefreshTokens",
                newName: "Token");

            migrationBuilder.RenameColumn(
                name: "jwtid",
                table: "RefreshTokens",
                newName: "JwtId");

            migrationBuilder.RenameColumn(
                name: "isrevoked",
                table: "RefreshTokens",
                newName: "IsRevoked");

            migrationBuilder.RenameColumn(
                name: "dateexpire",
                table: "RefreshTokens",
                newName: "DateExpire");

            migrationBuilder.RenameColumn(
                name: "dateadded",
                table: "RefreshTokens",
                newName: "DateAdded");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "RefreshTokens",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_refreshtokens_userid",
                table: "RefreshTokens",
                newName: "IX_RefreshTokens_UserId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Publisher",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Publisher",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "totalamount",
                table: "Orders",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Orders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Orders",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Orders",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_orders_userid",
                table: "Orders",
                newName: "IX_Orders_UserId");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "OrderItems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "OrderItems",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "orderid",
                table: "OrderItems",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "bookid",
                table: "OrderItems",
                newName: "BookId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "OrderItems",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_orderitems_orderid",
                table: "OrderItems",
                newName: "IX_OrderItems_OrderId");

            migrationBuilder.RenameIndex(
                name: "ix_orderitems_bookid",
                table: "OrderItems",
                newName: "IX_OrderItems_BookId");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "Carts",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "Carts",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "bookid",
                table: "Carts",
                newName: "BookId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Carts",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_carts_userid",
                table: "Carts",
                newName: "IX_Carts_UserId");

            migrationBuilder.RenameIndex(
                name: "ix_carts_bookid",
                table: "Carts",
                newName: "IX_Carts_BookId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Books",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "rate",
                table: "Books",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "publishedat",
                table: "Books",
                newName: "PublishedAt");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Books",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "Books",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Books",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "bookgroupid",
                table: "Books",
                newName: "BookGroupId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Books",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_books_bookgroupid",
                table: "Books",
                newName: "IX_Books_BookGroupId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "BookGroup",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "BookGroup",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "authorid",
                table: "BookAuthors",
                newName: "AuthorId");

            migrationBuilder.RenameColumn(
                name: "bookid",
                table: "BookAuthors",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "ix_bookauthors_authorid",
                table: "BookAuthors",
                newName: "IX_BookAuthors_AuthorId");

            migrationBuilder.RenameColumn(
                name: "fullname",
                table: "Authors",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Authors",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "AspNetUserTokens",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "AspNetUserTokens",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "loginprovider",
                table: "AspNetUserTokens",
                newName: "LoginProvider");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "AspNetUserTokens",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "AspNetUsers",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "twofactorenabled",
                table: "AspNetUsers",
                newName: "TwoFactorEnabled");

            migrationBuilder.RenameColumn(
                name: "securitystamp",
                table: "AspNetUsers",
                newName: "SecurityStamp");

            migrationBuilder.RenameColumn(
                name: "phonenumberconfirmed",
                table: "AspNetUsers",
                newName: "PhoneNumberConfirmed");

            migrationBuilder.RenameColumn(
                name: "phonenumber",
                table: "AspNetUsers",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "passwordhash",
                table: "AspNetUsers",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "normalizedusername",
                table: "AspNetUsers",
                newName: "NormalizedUserName");

            migrationBuilder.RenameColumn(
                name: "normalizedemail",
                table: "AspNetUsers",
                newName: "NormalizedEmail");

            migrationBuilder.RenameColumn(
                name: "lockoutend",
                table: "AspNetUsers",
                newName: "LockoutEnd");

            migrationBuilder.RenameColumn(
                name: "lockoutenabled",
                table: "AspNetUsers",
                newName: "LockoutEnabled");

            migrationBuilder.RenameColumn(
                name: "isactive",
                table: "AspNetUsers",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "emailconfirmed",
                table: "AspNetUsers",
                newName: "EmailConfirmed");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "AspNetUsers",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "concurrencystamp",
                table: "AspNetUsers",
                newName: "ConcurrencyStamp");

            migrationBuilder.RenameColumn(
                name: "accessfailedcount",
                table: "AspNetUsers",
                newName: "AccessFailedCount");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "AspNetUsers",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "emailindex",
                table: "AspNetUsers",
                newName: "EmailIndex");

            migrationBuilder.RenameColumn(
                name: "roleid",
                table: "AspNetUserRoles",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "AspNetUserRoles",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "ix_userroles_roleid",
                table: "AspNetUserRoles",
                newName: "IX_AspNetUserRoles_RoleId");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "AspNetUserLogins",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "providerdisplayname",
                table: "AspNetUserLogins",
                newName: "ProviderDisplayName");

            migrationBuilder.RenameColumn(
                name: "providerkey",
                table: "AspNetUserLogins",
                newName: "ProviderKey");

            migrationBuilder.RenameColumn(
                name: "loginprovider",
                table: "AspNetUserLogins",
                newName: "LoginProvider");

            migrationBuilder.RenameIndex(
                name: "ix_userlogins_userid",
                table: "AspNetUserLogins",
                newName: "IX_AspNetUserLogins_UserId");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "AspNetUserClaims",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "claimvalue",
                table: "AspNetUserClaims",
                newName: "ClaimValue");

            migrationBuilder.RenameColumn(
                name: "claimtype",
                table: "AspNetUserClaims",
                newName: "ClaimType");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "AspNetUserClaims",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_userclaims_userid",
                table: "AspNetUserClaims",
                newName: "IX_AspNetUserClaims_UserId");

            migrationBuilder.RenameColumn(
                name: "normalizedname",
                table: "AspNetRoles",
                newName: "NormalizedName");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "AspNetRoles",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "concurrencystamp",
                table: "AspNetRoles",
                newName: "ConcurrencyStamp");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "AspNetRoles",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "roleid",
                table: "AspNetRoleClaims",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "claimvalue",
                table: "AspNetRoleClaims",
                newName: "ClaimValue");

            migrationBuilder.RenameColumn(
                name: "claimtype",
                table: "AspNetRoleClaims",
                newName: "ClaimType");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "AspNetRoleClaims",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_roleclaims_roleid",
                table: "AspNetRoleClaims",
                newName: "IX_AspNetRoleClaims_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RefreshTokens",
                table: "RefreshTokens",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Publisher",
                table: "Publisher",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Carts",
                table: "Carts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Books",
                table: "Books",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookGroup",
                table: "BookGroup",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookAuthors",
                table: "BookAuthors",
                columns: new[] { "BookId", "AuthorId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Authors",
                table: "Authors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserTokens",
                table: "AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserRoles",
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserClaims",
                table: "AspNetUserClaims",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetRoles",
                table: "AspNetRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetRoleClaims",
                table: "AspNetRoleClaims",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookAuthors_Authors_AuthorId",
                table: "BookAuthors",
                column: "AuthorId",
                principalTable: "Authors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookAuthors_Books_BookId",
                table: "BookAuthors",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Books_BookGroup_BookGroupId",
                table: "Books",
                column: "BookGroupId",
                principalTable: "BookGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_AspNetUsers_UserId",
                table: "Carts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Books_BookId",
                table: "Carts",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Books_BookId",
                table: "OrderItems",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderId",
                table: "OrderItems",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_AspNetUsers_UserId",
                table: "RefreshTokens",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Books_BookId",
                table: "Reviews",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
