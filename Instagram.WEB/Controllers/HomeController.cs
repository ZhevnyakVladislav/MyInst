using System.Web.Mvc;

namespace Instagram.WEB.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Response.Cookies["userName"].Value = User.Identity.Name;
            return View();
        }
    }
}
