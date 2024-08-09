
using BookStore.Datas.DbContexts;
using BookStore.WebApi.Middlewares;
using Microsoft.EntityFrameworkCore;
using Serilog.Events;
using Serilog;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BookStore.Bussiness.ObjectMapping;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using BookStore.Datas.Interfaces;
using BookStore.Datas.Repositories;
using AutoMapper;

namespace BookStore.WebApi
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var loggerConfiguration = new LoggerConfiguration()
#if DEBUG
                .MinimumLevel.Debug()
#else
                .MinimumLevel.Information()
#endif
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
                .Enrich.FromLogContext()
                .WriteTo.Async(c => c.File("Logs/log_errors.txt", restrictedToMinimumLevel: LogEventLevel.Error))
                // .WriteTo.Async(c => c.File("Logs/logs_infos.txt", restrictedToMinimumLevel: LogEventLevel.Information))
                .WriteTo.Async(c => c.Console());
            //.WriteTo.MSSqlServer(
            //    connectionString: "Server=localhost,1433;Database=QuizApp;Trusted_Connection=True;MultipleActiveResultSets=true;",
            //    sinkOptions: new MSSqlServerSinkOptions { TableName = "Logs", AutoCreateSqlTable = true });

            Log.Logger = loggerConfiguration.CreateLogger();

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                builder.Services.AddSerilog();
                builder.Services.AddLogging();

                // Add services to the container.

                builder.Services.AddControllers();
                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo
                    {
                        Version = "v1",
                        Title = "BookStore API",
                        Description = "An ASP.NET Core Web API for managing books items",
                        TermsOfService = new Uri("https://example.com/terms"),
                        Contact = new OpenApiContact
                        {
                            Name = "Example Contact",
                            Url = new Uri("https://example.com/contact")
                        },
                        License = new OpenApiLicense
                        {
                            Name = "Example License",
                            Url = new Uri("https://example.com/license")
                        }
                    });

                    // using System.Reflection;
                    //var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    //options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

                    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                                    Enter 'Bearer' [space] and then your token in the text input below.
                                    \r\n\r\nExample: 'Bearer 12345abcdef'",
                        Name = "Authorization",
                        BearerFormat = "JWT",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });

                    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }

                            },
                            new string[]{}
                        }
                    });
                });

                builder.Services.AddApiVersioning(options =>
                {
                    options.ReportApiVersions = true;
                    options.AssumeDefaultVersionWhenUnspecified = true;
                    options.DefaultApiVersion = new ApiVersion(1, 0);
                    options.ApiVersionReader = new UrlSegmentApiVersionReader();
                });

                builder.Services.AddCors(p => p.AddPolicy("BookStoreAPIPolicy",
                build =>
                {
                    build.WithOrigins("*")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                }));

                builder.Services.AddDbContext<BookStoreDbContext>(options =>
                {
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultCOnnection"))
                    .EnableSensitiveDataLogging();
                });

                builder.Services.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Stores.MaxLengthForKeys = 128;
                    options.SignIn.RequireConfirmedAccount = false;
                }).AddEntityFrameworkStores<BookStoreDbContext>()
                    .AddDefaultTokenProviders();

                var key = Encoding.ASCII.GetBytes(builder.Configuration["JWT:Secret"]);
                builder.Services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["JWT:Issuer"],
                        ValidAudience = builder.Configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

                builder.Services.Configure<IdentityOptions>(options =>
                {
                    // Thiết lập về Password
                    options.Password.RequireDigit = false; // bắt phải có số
                    options.Password.RequireLowercase = false; // bắt phải có chữ thường
                    options.Password.RequireNonAlphanumeric = false; // bắt ký tự đặc biệt
                    options.Password.RequireUppercase = false; // bắt buộc chữ in
                    options.Password.RequiredLength = 6; // Số ký tự tối thiểu của password
                    options.Password.RequiredUniqueChars = 1; // Số ký tự riêng biệt

                    // Cấu hình Lockout - khóa user
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10); // Khóa 5 phút
                    options.Lockout.MaxFailedAccessAttempts = 5; // Thất bại 5 lầ thì khóa
                    options.Lockout.AllowedForNewUsers = true;

                    // Cấu hình về User.
                    options.User.AllowedUserNameCharacters = // các ký tự đặt tên user
                        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                    options.User.RequireUniqueEmail = true; // Email là duy nhất

                    // Cấu hình đăng nhập.
                    options.SignIn.RequireConfirmedEmail = false; // Cấu hình xác thực địa chỉ email (email phải tồn tại)
                    options.SignIn.RequireConfirmedPhoneNumber = false; // Xác thực số điện thoại
                });

                builder.Services.Configure<SecurityStampValidatorOptions>(options =>
                {
                    // Trên 5 giây truy cập lại sẽ nạp lại thông tin User (Role)
                    // SecurityStamp trong bảng User đổi -> nạp lại thông tinn Security
                    options.ValidationInterval = TimeSpan.FromSeconds(5);
                });

                #region AutoMapper configuration
                var mapperConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new AutoMapperProfile());
                });
                IMapper mapper = mapperConfig.CreateMapper();
                builder.Services.AddSingleton(mapper);
                #endregion

                builder.Services.AddOptions();                                        // Kích hoạt Options
                builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
                builder.Services.AddTransient<IEmailSender, SendMailService>();        // Đăng ký dịch vụ Mail

                builder.Services.AddScoped<IAuthService, AuthService>();
                builder.Services.AddScoped<IPublisherRepository, PublisherRepository>();
                builder.Services.AddScoped<IPublisherService, PublisherService>();
                builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
                builder.Services.AddScoped<IAuthorService, AuthorService>();
                builder.Services.AddScoped<IBookRepository, BookRepository>();
                builder.Services.AddScoped<IBookService, BookService>();
                builder.Services.AddScoped<IBookAuthorRepository, BookAuthorRepository>();
                builder.Services.AddScoped<IBookAuthorService, BookAuthorService>();
                builder.Services.AddScoped<IBookGroupRepository, BookGroupRepository>();
                builder.Services.AddScoped<IBookGroupService, BookGroupService>();

                var app = builder.Build();

                Log.Information("Start app!");

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseSerilogRequestLogging();

                app.UseHttpsRedirection();

                app.UseCors(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });

                app.UseAuthentication();
                app.UseAuthorization();

                app.MapControllers();

                // app.UseMiddleware<ErrorHandlingMiddleware>();

                using var scope = app.Services.CreateScope();
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    await BookStoreSeedData.Initalize(services);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"An error occured during migration: {ex.Message}");
                }

                app.Run();
            }
            catch (Exception ex)
            {
                if (ex is HostAbortedException)
                {
                    Log.Information(ex.ToString());
                }

                Log.Information(ex.ToString());
            }
            finally
            {
                Log.Information("Closing app.");
                Log.Information("Closed app.");
                Log.CloseAndFlush();
            }
        }
    }
}
