using System;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.WEB.Models;
using Unity.Injection;

namespace Instagram.WEB
{
    public static class AutoMapperConfig
    {
        public static void RegisterAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>().ForMember(x => x.Role, x => x.Ignore())
                    .ReverseMap().ForMember(x => x.Role, x=> x.Ignore());
                cfg.CreateMap<UserDto, UserVm>().ReverseMap();
                cfg.CreateMap<LoginVm, UserDto>().ReverseMap();
                cfg.CreateMap<RegisterVm, UserDto>().ReverseMap();

                cfg.CreateMap<ProfileDto, UserDto>().ReverseMap();
                cfg.CreateMap<UserDto, UserProfile>().ReverseMap();
                cfg.CreateMap<ProfileDto, UserProfile>().ReverseMap();
                cfg.CreateMap<ProfileDto, ProfileVm>().ReverseMap();
            });

            var mapper = config.CreateMapper();
            IoContainer.RegisterSingleton(mapper);
        }
    }
}