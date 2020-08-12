using Ebooking_screening.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebooking_screening.Controllers
{
    public class Booking_ScreeningController : Controller
    {
        // GET: booking_Screening
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Screening()
        {
            return View();
        }

        [ValidateInput(false)]
        public JsonResult GetTableData(BookingDetail objBookingDetail)
        {
            string jsondata = "";
            try
            {
                objBookingDetail.ApiName = Utility.ApiBasePath + objBookingDetail.ApiName;
                jsondata = Utility.CallApi(objBookingDetail);
            }
            catch (Exception ex)
            {
                Utility.ReportError("", ex);
            }
            return Json(jsondata);
        }

        [ValidateInput(false)]
        public JsonResult Logout()
        {
            try
            {
                Session.Abandon();
                Session.Clear();
            }
            catch (Exception ex)
            {
            }
            return Json('1');
        }

    }
}