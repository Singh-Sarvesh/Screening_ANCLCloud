using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ebooking_screening.Models
{
    public class BookingDetail
    {
        public string Parametername { get; set; }
        public string ParamValueStr { get; set; }
        public string ApiName { get; set; }
        public int IsValid { get; set; }
        public string ErrorMessage { get; set; }
        public int IsClassified { get; set; }
        public int AdtypeId { get; set; }
        public int ParentAdtypeId { get; set; }
        public int AdtypeId1 { get; set; }
        public int AdtypeId2 { get; set; }
        public int Adsizeid { get; set; }
        public double CardRate { get; set; }
        public double CardAmount { get; set; }
        public double PreVATAmount { get; set; }
        public double VATAmount { get; set; }
        public double Receivable { get; set; }
        public double VATPer { get; set; }
        public int RateCardID { get; set; }
        public int AdRateID { get; set; }

        public double AgreedRate { get; set; }
        public double AgreedAmount { get; set; }
        public int PEID { get; set; }
        public Int64 ROID { get; set; }
        public string RoidList { get; set; }
        public int InsNum { get; set; }
        public int ReleaseID { get; set; }
        public int OrderLevel { get; set; }
        public string PackageID { get; set; }
        public string PkgIDs { get; set; }
        public int RevenueCentreID { get; set; }
        public int BookingCentreID { get; set; }
        public int Premiaid { get; set; }
        public int Colorid { get; set; }
        public float AdsizeHeight { get; set; }
        public float AdsizeWidth { get; set; }
        public string DateSelected { get; set; }
        public int UserId { get; set; }
        public string UserMailID { get; set; }
        public string UserName { get; set; }
        public string CentreName { get; set; }
        public string UserMobile { get; set; }
        public int TotalOrders { get; set; }
        public string OrderNumber { get; set; }
        public string UniqueCode { get; set; }
        // public Int64 AdCartId { get; set; }
        //   public string TransactionID { get; set; }
        //   public string UserType { get; set; }
        public int AgencyID { get; set; }
        public int ClientID { get; set; }
        public string CasualClientName { get; set; }
        public int CanvassorID { get; set; }
        public int ProductID { get; set; }
        public int UOMID { get; set; }
        public int SMEID { get; set; }
        public int BrandID { get; set; }
        public int MaterialSource { get; set; }
        public int MaterialType { get; set; }
        public int ROType { get; set; }
        public int BillType { get; set; }
        public int BoxTypeID { get; set; }
        public string RONumber { get; set; }
        public int CustomerTypeID { get; set; }
        public int PaymentTypeID { get; set; }
        public double ReceiptAmount { get; set; }
        public double WriteoffAmount { get; set; }
        public int PaymentModeID { get; set; }
        public string ChequeNumber { get; set; }
        public string ChequeDate { get; set; }
        public double Amount { get; set; }
        public int BankID { get; set; }
        public string BankName { get; set; }
        public int BranchID { get; set; }
        public string BankBranchCode { get; set; }
        public string BranchName { get; set; }
        public string ScheduledDate { get; set; }
        public double ExtraChargesPer { get; set; }
        public double ExtraChargesAmount { get; set; }
        public double ExtraDiscPer { get; set; }
        public double ExtraDiscAmount { get; set; }
        public double ExtraBoxChargesPer { get; set; }
        public double ExtraBoxChargesAmount { get; set; }
        public double AgencyCommissionPer { get; set; }
        public double AgencyCommissionAmount { get; set; }
        public int ROStatus { get; set; }
        public int Status { get; set; }
        public int AuditStatus { get; set; }
        public int StatusID { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string DateFlag { get; set; }
        public string CcofficerID { get; set; }
        public string Flag { get; set; }
        public int LanguageID { get; set; }
        public int BookingID { get; set; }

        //Approve/Reject
        public int AcceptReject { get; set; }
        public int ReasonID { get; set; }
        public string StrReason { get; set; }
        public int ScreenType { get; set; }
    }
}