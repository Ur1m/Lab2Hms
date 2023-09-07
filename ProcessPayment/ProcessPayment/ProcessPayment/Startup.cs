using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using ProcessPayment.Consumer;
using ProcessPayment.Models;
using ProcessPayment.Repositories;
using ProcessPayment.Repositories.DbConfig;
using ProcessPayment.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProcessPayment
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();


            services.AddTransient<IPaymentService, PaymentService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProcessPayment", Version = "v1" });
            });


            services.AddMassTransit(config =>
            {
                config.AddConsumer<OrderConsumer>();

                config.UsingRabbitMq((ctx, cfg) =>
                {
                    cfg.Host("amqp://guest:guest@localhost:5672");

                    cfg.ReceiveEndpoint("ProcessPayment", c =>
                    {
                        c.ConfigureConsumer<OrderConsumer> (ctx);
                    });
                });
            });
            services.AddMassTransitHostedService();
            services.Configure<PaymentDbConfig>(Configuration.GetSection("PaymentDbConfig"));
            services.AddScoped<IDbClient, DbClient>();

            //services.AddDbContext<PaymentDbContext>(options =>
            //  options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IPaymentRepository,PaymentRepository>();

            services.AddScoped<IPaymentService, PaymentService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProcessPayment v1"));
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}