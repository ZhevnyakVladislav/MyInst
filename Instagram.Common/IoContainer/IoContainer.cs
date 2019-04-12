using System;
using System.Configuration;
using Microsoft.Practices.Unity.Configuration;
using Unity;
using Unity.Injection;
using Unity.Resolution;

namespace Instagram.Common.IoContainer
{
    public class IoContainer
    {
        private static readonly UnityContainer Container;

        static IoContainer()
        {
            Container = new UnityContainer();

            var section = ConfigurationManager.GetSection("unity") as UnityConfigurationSection;

            section?.Configure(Container);
        }

        public static T Resolve<T>()
        {
            return Container.Resolve<T>();
        }

        public static T ResolveWithParams<T>(params ResolverOverride[] overrides)
        {
            return Container.Resolve<T>(overrides);
        }

        public static void RegisterType<TFrom, TTo>() where TTo : TFrom
        {
            Container.RegisterType<TFrom, TTo>();
        }

        public static void RegisterType<TFrom, TTo>(InjectionConstructor constructor) where TTo : TFrom
        {
            Container.RegisterType<TFrom, TTo>(constructor);
        }

        public static void RegisterSingleton(Type type, object instance)
        {
            Container.RegisterInstance(type, instance);
        }

        public static void RegisterSingleton<TInterface>(TInterface instance)
        {
            Container.RegisterInstance(instance);
        }
    }
}