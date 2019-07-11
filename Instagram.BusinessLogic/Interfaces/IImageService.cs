using System.IO;
using System.Reflection.Emit;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IImageService
    {
        string Upload(Stream content);
    }
}