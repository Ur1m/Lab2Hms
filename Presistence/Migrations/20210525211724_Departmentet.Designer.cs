﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Presistence;

namespace Presistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210525211724_Departmentet")]
    partial class Department
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1");

            modelBuilder.Entity("Domain.Department", b =>
                {
                    b.Property<Guid>("Department_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Department_id");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("Domain.prov", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("prova2")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("prova");
                });
#pragma warning restore 612, 618
        }
    }
}
