using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Department, Department>();
            CreateMap<Infermierja, Infermierja>();
            CreateMap<Therapy ,Therapy>();
            CreateMap<Barna,Barna>();
            CreateMap<Paisjet,Paisjet>();
             CreateMap<Terminet,Terminet>();
        }
    }
}
