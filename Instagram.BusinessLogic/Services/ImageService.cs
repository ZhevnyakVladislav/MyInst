using System;
using System.IO;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Instagram.BusinessLogic.Interfaces;

namespace Instagram.BusinessLogic.Services
{
    public class ImageService : IImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService()
        {
            var userName = "luxorik";
            var password = "531764713868471";
            var secretKey = "lGDzTO16-xZsb1F1Vryfjam-R0M";
            //var userName = Environment.GetEnvironmentVariable("CLOUDINARY_USER_NAME");
            //var password = Environment.GetEnvironmentVariable("CLOUDINARY_PASSWORD");
            //var secretKey = Environment.GetEnvironmentVariable("CLOUDINARY_SECRET_KEY");
            var account = new Account(userName, password, secretKey);
            _cloudinary = new Cloudinary(account);
        }
        public string Upload(Stream content)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription("userImage", content),
            };

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.Error != null)
            {
                throw new BusinessLogicException(uploadResult.Error.Message);
            }

            return uploadResult.Uri.AbsoluteUri;
        }
    }
}