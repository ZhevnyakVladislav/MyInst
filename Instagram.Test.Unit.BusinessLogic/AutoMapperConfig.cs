using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic
{
    public class AutoMapperConfig
    {
        public static void RegisterMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>().ForMember(x => x.Role, x => x.Ignore())
                    .ReverseMap().ForMember(x => x.Role, x => x.Ignore());

                cfg.CreateMap<ProfileDto, UserDto>().ReverseMap();
                cfg.CreateMap<UserDto, UserProfile>().ReverseMap();
                cfg.CreateMap<ProfileDto, UserProfile>().ReverseMap();
            });

            var mapper = config.CreateMapper();
            IoContainer.RegisterSingleton(mapper);
        }
    }
}