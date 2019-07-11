﻿using System;
using Instagram.Common.Models;

namespace Instagram.DBProviders.Interfaces
{
    public interface IProfileProvider
    {
        void Create(UserProfile item);

        UserProfile GetProfileByUserId(int userId);

        UserProfile GetProfileByUserName(string useName);

        void Update(UserProfile item);
    }
}