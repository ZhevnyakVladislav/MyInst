using System;
using System.Collections.Generic;
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
                cfg.CreateMap<ProfileDto, UserProfile>()
                    .ReverseMap()
                    .ForMember(m => m.UserName, x => x.MapFrom(p => p.User.UserName))
                    .ForMember(m => m.Email, x => x.MapFrom(p => p.User.Email))
                    .ForMember(m => m.Followers, x => x.Ignore())
                    .ForMember(m => m.Following, x => x.Ignore());
                cfg.CreateMap<ProfileDto, ViewProfileVm>()
                    .ForMember(m => m.FollowersCount, x => x.MapFrom(p => p.Followers.Count))
                    .ForMember(m => m.FollowingCount, x => x.MapFrom(p => p.Following.Count))
                    .ReverseMap();
                cfg.CreateMap<EditProfileVm, ProfileDto>()
                    .ReverseMap()
                    .ForMember(m => m.Website, x => x.NullSubstitute(string.Empty))
                    .ForMember(m => m.Bio, x => x.NullSubstitute(string.Empty))
                    .ForMember(m => m.PhoneNumber, x => x.NullSubstitute(string.Empty))
                    .ForMember(m => m.ImageUrl, x => x.NullSubstitute(string.Empty));
            });

            var mapper = config.CreateMapper();
            IoContainer.RegisterSingleton(mapper);
        }
    }
}