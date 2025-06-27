using Microsoft.AspNetCore.Mvc;

namespace RecurrenteCheckout.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Success(string checkoutId)
        {
            ViewBag.CheckoutId = checkoutId;
            return View();
        }

        public IActionResult Failure()
        {
            return View();
        }
    }
}
