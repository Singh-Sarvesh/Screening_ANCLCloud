var ROID = 0;
var Reasonid = 0;
var AcceptReject = 0;
var StrReason = "";
var param = {};
var StrScreenType = 2;//1-for So Screen 2- for CC screen 
var roidlst = "";
var packagecount = 0;
var agencyidvalue = 0;
var clientidvalue = 0;
var canvassoridvalue = 0;
var qStr;
var userid;

$(document).ready(function () {
    var offset = $('#divpackage').offset();
    $('#packagelst').css({ 'position': 'absolute', 'left': offset.left, 'top': offset.top + 24 });
    $("#HeadCheck_all").click(function () {
        if ($(this).is(':checked')) {

            $('input:checkbox', $("#DSScreeningGrid")).each(function () {
                if ($(this).attr('cloudstatus') == 1) {
                    $(this).prop('checked', true);
                }
                else {
                    $(this).prop('checked', false);
                }
                // result.push($(this).parent().next().text());
            });

            //if ($(".itemChk:checkbox").attr('cloudstatus') == 1) {
            //    $(".itemChk:checkbox").prop('checked', true);
            //}
            //else {
            //    if ($(".itemChk").length != $(".itemChk:checked").length) {
            //        $("#HeadCheck_all").prop("checked", false);
            //    }
            //}
        }
        else {
            $(".itemChk:checkbox").prop('checked', false);
        }
    });
    $('.itemChk').click(function () {
        if ($(".itemChk").length == $(".itemChk:checked").length) {
            $("#HeadCheck_all").prop("checked", true);
        } else {
            $("#HeadCheck_all").prop("checked", false);
        }
    });

    LoginDetail();

    $('#DateFrom').datepicker({
        numberOfMonths: 1,
        //   maxDate: 0,
        inline: true,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        onSelect: function (selected) {
            $('#DateTo').val(selected);
            var dt = new Date(selected);
            dt.setDate(dt.getDate() + 1);
            $('#DateTo').datepicker("option", "minDate", selected);
        }
    }).datepicker("setDate", defaultdate);
    $('#DateTo').datepicker({
        numberOfMonths: 1,
        // maxDate: 0,
        inline: true,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", defaultdate);


    AutoFilleAgencyCientCanvassorList(appRoot);
    GetLanguage();
    GetPECode();
    //GetPackage();
    Getstatus();
    GetAdType();
    //GetUserType();
    $('#packagelst').hide();
    $('#divpackage').click(function (e) {
        e.stopPropagation();
        $('.custom-overlay').show();
        $('#packagelst').show();
        CheckedBoxValues();
    });

    $('.custom-overlay').click(function (e) {
        e.stopPropagation();
        $('.custom-overlay').hide();
        $('#packagelst').hide();
    });

    $("#PackageCheck_all").click(function () {
        if ($(this).is(':checked')) {
            GetStatusVal(0, packagecount);
            $(".PackageitemChk:checkbox").prop('checked', true).parents("li").css('background-color', 'orange');
        }
        else {
            //GetStatusVal(1, -1);
            $('#txtpackage').val('');
            $(".PackageitemChk:checkbox").prop('checked', false).parents("li").css('background-color', 'white');
        }

    });
    $('.PackageitemChk').click(function () {
        if ($(".PackageitemChk").length == $(".PackageitemChk:checked").length) {

            $("#PackageCheck_all").prop("checked", true);
        } else {
            $("#PackageCheck_all").prop("checked", false);
        }
    });


    $("#AgencyName").focus(function () { $(this).select(); }).addClass('form-control height23px width24per');
    $("#ClientName").focus(function () { $(this).select(); }).addClass('form-control height23px width24per');
    $("#CanvassorName").focus(function () { $(this).select(); }).addClass('form-control height23px width24per');


    $("#btnCCsubmit").click(function () {
        if ($("#hdnIsClassified").val() != 0) {
            $("#DisplayDetails").hide();
            $("#ClassifiedDetails").show();
            BindClassifiedGridControl();
        }
        else {
            $("#ClassifiedDetails").hide();
            $("#DisplayDetails").show();
            BindDisplayGridControl();
        }
        //if (Ispackage())
        //    return true;
        //else
        //    return false;
    });

    $('#bookingid').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            var bookingid = $("#bookingid").val();
            if (bookingid != '' && (isNaN(parseInt(bookingid))) || (bookingid.toString().length > 6 && bookingid.toString().length < 10)) {
                alert('Invalid BookingID!');
                return false;
            }
            else if (bookingid.toString().length >= 1 && bookingid.toString().length <= 7) {
                var n = serverDate.getFullYear() - 1000;
                bookingid = parseInt(n) * 1000000 + parseInt(bookingid);
                $("#bookingid").val(bookingid);
            }
            if ($("#hdnIsClassified").val() != 0) {
                BindClassifiedGridControl();
            }
            else {
                BindDisplayGridControl();
            }
        }
    });

    $("#ordertypeid").change(function () {
        $("#hdnIsClassified").val($("#ordertypeid").val());
        if ($("#hdnIsClassified").val() != 0) {
            $("#btnopen").show();
            $("#category1").show();
            $("#category2").show();
            $(".page_content_footer").hide();
            $("#DisplayDetails").hide();
            $("#ClassifiedDetails").show();
            $('#btnopen').css('pointer-events', 'none');
            $("#btnopen").css("opacity", '0.5');
            $('#LanguageID').removeAttr('disabled');
        }
        else {
            $("#btnopen").hide();
            $("#category1").hide();
            $("#category2").hide();
            $(".page_content_footer").show();
            $("#DisplayDetails").show();
            $("#ClassifiedDetails").hide();
            $('#LanguageID').attr('disabled', 'disabled');
        }
        $("#agencyid").val('');
        $("#clientid").val('');
        $("#bookingid").val('');
        agencyidvalue = 0;
        AutoFilleAgencyCientCanvassorList(appRoot);
        GetLanguage();
        GetPECode();
        Getstatus();
        GetAdType();
        $("#AdtypeID").change();
        $(".innerBox").hide();
        $("#txtDSmsg").html('');
        $("#txtCLmsg").html('');
    });

    $("#AdtypeID").change(function () {
        if ($("#hdnIsClassified").val() != 0) {
            $("#Cat2ID").empty();
            $("#Cat1ID").val(-1);
            GetChildAdType1();
        }
    });

    $("#Cat1ID").change(function () {
        $("#Cat2ID").val(-1);
        GetChildAdType2();
    });

    $("#btnopen").click(function () {
        OpenClassifiedData();
    });

    $("#openreasonid").change(function () {
        DisabledCLAcceptALL();
    });

    $('#txtopenremarks').on("keyup", function () {
        DisabledCLAcceptALL();
    });

});

function AutoFilleAgencyCientCanvassorList(appRoot) {
    //$("#clientid").autocomplete({
    //    source: function (request, response) {
    //        var parametername = $("#clientid").attr("parameter");
    //        var paramValue = $("#clientid").val();
    //        if (paramValue == null)
    //            paramValue = 0;
    //        var url = appRoot + "Booking_Screening/GetTableData";
    //        var param = {};
    //        param.ApiName = "/FillClientControlData";
    //        param.Parametername = parametername;
    //        param.ParamValueStr = paramValue.replace('&', '&amp;');
    //        var result = getresult(url, param);
    //        result = jQuery.parseJSON(result);
    //        response($.map(result, function (item, aa) {
    //            return {
    //                key: item.ID,
    //                value: item.Value
    //            };
    //        }));
    //    },
    //    minLength: 1,
    //    maxHeight: 200,
    //    select: function (event, ui) {
    //        $("#clientid").val(ui.item.value);
    //        clientidvalue = ui.item.key;
    //    },
    //    change: function (event, ui) {
    //    }
    //}).keyup(function (e) { if (e.keyCode !== 13 && e.keyCode !== 9 && !e.ctrlKey && e.keyCode !== 27) clientidvalue = 0; });

    //$('#clientid').click(function () {
    //    $(this).select();
    //});
    //$("#clientid").change(function () { if ($(this).val() === '') if (this.id === 'clientid') clientidvalue = 0; });

    $("#agencyid").autocomplete({
        source: function (request, response) {
            var parametername = $("#agencyid").attr("parameter");
            var paramValue = $("#agencyid").val();
            if (paramValue == null)
                paramValue = 0;
            var url = appRoot + "Booking_Screening/GetTableData";
            var param = {};
            param.ApiName = "/FillAgencyControlData";
            param.Parametername = parametername;
            param.ParamValueStr = paramValue.replace('&', '&amp;');
            var result = getresult(url, param);
            result = jQuery.parseJSON(result);
            response($.map(result, function (item, aa) {
                return {
                    value: item.Value,
                    key: item.ID
                };
            }));
        },
        minLength: 1,
        select: function (event, ui) {
            $("#agencyid").val(ui.item.value);
            agencyidvalue = ui.item.key;
        },
    }).keyup(function (e) { if (e.keyCode !== 13 && e.keyCode !== 9 && !e.ctrlKey && e.keyCode !== 27) agencyidvalue = 0; });
    $('#agencyid').click(function () {
        $(this).select();
    });
    $("#agencyid").change(function () { if ($(this).val() === '') if (this.id === 'agencyid') agencyidvalue = 0; });

    $("#canvassorid").autocomplete({
        source: function (request, response) {
            var parametername = $("#canvassorid").attr("parameter");
            var paramValue = $("#canvassorid").val();
            if (paramValue == null)
                paramValue = 0;
            var url = appRoot + "Booking_Screening/GetTableData";
            var param = {};
            param.ApiName = "/FillCanvassorControlData";
            param.Parametername = parametername;
            param.ParamValueStr = paramValue.replace('&', '&amp;');
            var result = getresult(url, param);
            result = jQuery.parseJSON(result);
            response($.map(result, function (item, aa) {
                return {
                    key: item.ID,
                    value: item.Value
                };
            }));
        },
        minLength: 1,
        maxHeight: 200,
        select: function (event, ui) {
            $("#canvassorid").val(ui.item.value);
            canvassoridvalue = ui.item.key;
        },
    }).keyup(function (e) { if (e.keyCode !== 13 && e.keyCode !== 9 && !e.ctrlKey && e.keyCode !== 27) canvassoridvalue = 0; });
    $('#canvassorid').click(function () {
        $(this).select();
    });
    $("#canvassorid").change(function () { if ($(this).val() === '') if (this.id === 'canvassorid') canvassoridvalue = 0; });
}



function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}


function Ispackage() {
    errorMsg = "";
    var packageid = $('#txtpackage').val();
    if (packageid == "") {
        errorMsg += 'Please select any one package.';
        //errorMsg += '<br />- Please select any one package.';
    }
    if (errorMsg != "") {
        //  errorMsg = 'Mandatory Fields' + errorMsg;
        alert(errorMsg);
        //ShowMsg(errorMsg);
        return false;
    }
    else { return true; }

}

function GetLanguage() {
    $("#LanguageID").empty();
    var parametername = $("#LanguageID").attr("parameter");
    var paramValue = $("#LanguageID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++)
            $("#LanguageID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetPECode() {
    $("#Peid").empty();
    var parametername = $("#Peid").attr("parameter");
    var paramValue = $("#Peid").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++)
            $("#Peid").append(new Option(result[m].Value, result[m].ID));
    }
}

function Getstatus() {
    $("#StatusID").empty();
    var parametername = $("#StatusID").attr("parameter");
    var paramValue = $("#StatusID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++)
            $("#StatusID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetAdType() {
    $("#AdtypeID").empty();
    var parametername = $("#AdtypeID").attr("parameter");
    var paramValue = $("#AdtypeID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        $("#AdtypeID").append(new Option('', '-1'));
        for (var m = 0; m < result.length; m++)
            $("#AdtypeID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetChildAdType1() {
    $("#Cat1ID").empty();
    var parametername = $("#Cat1ID").attr("parameter");
    var paramValue = $("#Cat1ID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillChildAdtypeData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    param.ParentAdtypeId = $("#AdtypeID").val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        $("#Cat1ID").append(new Option('', '-1'));
        for (var m = 0; m < result.length; m++)
            $("#Cat1ID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetChildAdType2() {
    $("#Cat2ID").empty();
    var parametername = $("#Cat2ID").attr("parameter");
    var paramValue = $("#Cat2ID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillChildAdtypeData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    param.ParentAdtypeId = $("#Cat1ID").val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        $("#Cat2ID").append(new Option('', '-1'));
        for (var m = 0; m < result.length; m++)
            $("#Cat2ID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetUserType() {
    $("#CcOfficerID").empty();
    var parametername = $("#CcOfficerID").attr("parameter");
    var paramValue = $("#CcOfficerID").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++)
            $("#CcOfficerID").append(new Option(result[m].Value, result[m].ID));
    }
}

function GetPackage() {
    $("#packagelst").empty();
    var parametername = $("#packagelst").attr("parameter");
    var paramValue = $("#packagelst").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    var statuslist = PackageTable(result);
    $('#packagelst').append(statuslist);
}

function GetReasons() {
    $("#BookingNo").empty();
    // $("#CcReasonID").empty();
    var parametername = $("#BookingNo").attr("parameter");
    var paramValue = $("#BookingNo").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++) {
            $("#BookingNo").append(new Option(result[m].Value, result[m].ID));
            //  $("#CcReasonID").append(new Option(result[m].Value, result[m].ID));
        }
    }
}


function PackageTable(data) {
    packagecount = data.length;
    var ul = '<ul style="padding:0; margin:0;">';
    ul += '<li style="cursor:pointer"><label><input style="cursor:pointer;margin: 5px; width: auto;" type="checkbox" id="PackageCheck_all" style="width:10px"  name="PackageCheck_all"/><span style="cursor:pointer">ALL</span></label></li>';
    for (i = 0; i < data.length; i++) {
        if (i > 0)
            ul += '<li style="cursor:pointer"><label>' + '<input style="cursor:pointer;margin: 5px; width: auto;" type="checkbox" class="PackageitemChk" name="PackageitemChk"  onchange="GetStatusVal(' + data[i].ID + ',' + data.length + ')" value="' + data[i].ID + '"><span style="cursor:pointer">' + data[i].Value + '</span></label></li>';
    }
    ul += '</ul>';
    return ul;
}

function BindDisplayGridControl() {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    $("#HeadCheck_all").prop("checked", false);
    $("#DSScreeningGrid").html('');
    $("#txtDSmsg").html('');
    var parametername = "screenorder";
    var paramValue = 0;
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillDisplayGridControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    param.LanguageID = $('#LanguageID').val();
    param.PEID = $('#Peid').val();
    param.AdtypeId = $('#AdtypeID').val();
    param.ROID = "0";
    param.StatusID = $('#StatusID').val();
    param.DateFrom = $('#DateFrom').val();
    param.DateTo = $('#DateTo').val();
    param.DateFlag = $("#Dateflag").val();
    param.PackageID = $('#txtpackage').val();
    param.UserId = userid;
    param.AgencyID = agencyidvalue;
    param.CasualClientName = $("#clientid").val();
    param.CanvassorID = canvassoridvalue;
    param.CcofficerID = $('#CcOfficerID').val();
    param.Flag = "1";
    var bookingid = $("#bookingid").val();
    if (bookingid != '' && (isNaN(parseInt(bookingid))) || (bookingid.toString().length > 6 && bookingid.toString().length < 10)) {
        alert('Invalid BookingID!');
        return false;
    }
    else if (bookingid.toString().length >= 1 && bookingid.toString().length <= 7) {
        var n = serverDate.getFullYear() - 1000;
        bookingid = parseInt(n) * 1000000 + parseInt(bookingid);
        $("#bookingid").val(bookingid);
    }
    param.BookingID = $('#bookingid').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    var strxml = '';
    if (result.length > 0) {
        GetReasons();
        for (var i = 0; i < result.length; i++) {
            if (result[i].SourceROID == 0) {
                result[i].SourceROID = "";
            }
            strxml = '';
            strxml += '<tr style="color:black;">';
            if (result[i].CloudOrderStatus == 1) {
                strxml += '<td class="txtAlignCenter" style="width: 28px;"><input class="itemChk" cloudstatus="' + result[i].CloudOrderStatus + '" id="item_check_all" name="item.check_all" type="checkbox" value="true">'
                    + '<input name="item.check_all" type="hidden" value="false"></td>'
            }
            else {
                strxml += '<td class="txtAlignCenter" style="width: 28px;"><input class="itemChk" cloudstatus="' + result[i].CloudOrderStatus + '" id="item_check_all" name="item.check_all" type="checkbox" value="true" disabled="disabled">'
                    + '<input name="item.check_all" type="hidden" value="false"></td>'
            }
            strxml += '<td>' + result[i].Roid + '</td><td><span class="spntitle" title="' + result[i].AgencyName + '">' + result[i].AgencyName + '</span></td>'
                + '<td><span class="spntitle" title="' + result[i].ClientName + '">' + result[i].ClientName + '</span></td>'
                + '<td title="' + result[i].InsDates + '">' + result[i].ScheduledDate.substring(0, 10).replace('-', '/').replace('-', '/') + '</td>'
                + '<td>' + result[i].PackageName + '</td>'
                + '<td><span class="spntitle" title="' + result[i].RONumber + '">' + result[i].RONumber + '</span></td>'
                + '<td>' + result[i].Rate + '</td><td>' + result[i].CurrentAdVal + '</td><td>' + result[i].AdtypeName + '</td>'
                + '<td>' + result[i].ColorName + '</td><td>' + result[i].BookingCentreName + '</td>';
            if (result[i].CloudOrderStatus == 1) {
                strxml += '<td title="approved" style="width: 49px;" align="center"><img src="../Content/images/Appr.png" onclick="Approved(' + result[i].Roid + ',this)"></td>'
                    + '<td style="width: 45px;" align="center"><img src="../Content/images/Rjct.png" onclick="Rejected(' + result[i].Roid + ',this)"></td>'
                    + '<td><select class="form-control width125" id="CcReasonID' + i + '" name="CcReasonID" onchange="DisabledAccept(this)" title="Rejection Reason"></select></td>'
                    + '<td style="width: 137px;"><input type="text" class="form-control width125"></td>';
            }
            else {
                strxml += '<td title="approved" style="width: 49px;" align="center"></td>'
                    + '<td style="width: 45px;" align="center"></td>'
                    + '<td><select class="form-control width125" id="CcReasonID' + i + '" name="CcReasonID" title="Rejection Reason" disabled></select></td>'
                    + '<td style="width: 137px;"><input type="text" class="form-control width125" value="' + result[i].RejectedNote + '" disabled ></td>';
            }
            strxml += '<td>' + result[i].SourceROID + '</td>'
                + '<td>' + result[i].PremiaName + '</td><td>' + result[i].AdSize + '</td>'
                + '<td>' + result[i].No_of_Insertions + '</td><td></td>'
                + '<td>' + result[i].BookingExecName + '</td><td>' + result[i].BookingDate + '</td><td>' + result[i].ApprovalDate + '</td>';
            $("#DSScreeningGrid").append(strxml);
            if (result[i].CloudOrderStatus == 1) {
                GetGridReasons("CcReasonID" + i, 0);
            }
            else {
                GetGridReasons("CcReasonID" + i, result[i].RejectedReasonID);
            }
        }
        // $("#DSScreeningGrid").append(strxml);
        $('.innerBox').show();
        $('#txtdsrejectnote').val('');
        // $("select[name = CcReasonID]").load();
    }
    else {
        $("#txtDSmsg").html("No Record Found");
        $('.innerBox').hide();
        return false;
    }
}


function BindClassifiedGridControl() {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    $("#CLScreeningGrid").html('');
    $("#txtCLmsg").html('');
    var parametername = "screenorder";
    var paramValue = 0;
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillClassifiedGridControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    param.LanguageID = $('#LanguageID').val();
    param.PEID = $('#Peid').val();
    param.AdtypeId = $('#AdtypeID').val();
    param.AdtypeId1 = $('#Cat1ID').val();
    param.AdtypeId2 = $('#Cat2ID').val();
    param.ROID = "0";
    param.StatusID = $('#StatusID').val();
    param.DateFrom = $('#DateFrom').val();
    param.DateTo = $('#DateTo').val();
    param.DateFlag = $("#Dateflag").val();
    param.PackageID = $('#txtpackage').val();
    param.UserId = userid;
    param.AgencyID = agencyidvalue;
    param.CasualClientName = $("#clientid").val();
    param.CanvassorID = canvassoridvalue;
    param.CcofficerID = $('#CcOfficerID').val();
    param.Flag = "1";
    var bookingid = $("#bookingid").val();
    if (bookingid != '' && (isNaN(parseInt(bookingid))) || (bookingid.toString().length > 6 && bookingid.toString().length < 10)) {
        alert('Invalid BookingID!');
        return false;
    }
    else if (bookingid.toString().length >= 1 && bookingid.toString().length <= 7) {
        var n = serverDate.getFullYear() - 1000;
        bookingid = parseInt(n) * 1000000 + parseInt(bookingid);
        $("#bookingid").val(bookingid);
    }
    param.BookingID = $('#bookingid').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    var strxml = '';
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].SourceROID == 0) {
                result[i].SourceROID = "";
            }
            strxml += '<tr style="color:black;" disabled="disabled" onclick="OpenCLRowData(this)">'
                + '<td>' + result[i].Roid + '</td><td>' + result[i].Edition + '</td><td style="display:none;">' + result[i].OtherPE + '</td>'
                + '<td style="display:none;">' + result[i].Language + '</td>'
                + '<td><span class="spntitle" title="' + result[i].AdText + '">' + result[i].AdText + '</span></td>'
                + '<td><span class="spntitle" title="' + result[i].AgencyName + '">' + result[i].AgencyName + '</span></td>'
                + '<td>' + result[i].PackageName + '</td><td>' + result[i].OrderStatusName + '</td><td>' + result[i].AdtypeName + '</td>'
                + '<td>' + result[i].Class1 + '</td><td>' + result[i].Class2 + '</td>'
                + '<td title="' + result[i].InsDates + '">' + result[i].ScheduledDate.substring(0, 10).replace('-', '/').replace('-', '/') + '</td>'
                + '<td style="display:none;">' + result[i].PEID + '</td>'
                + '<td style="display:none;">' + result[i].InsDates + '</td>'
                + '<td style="display:none;">' + result[i].CloudOrderStatus + '</td>'
                + '<td style="display:none;">' + result[i].RejectedReasonID + '</td>'
                + '<td style="display:none;">' + result[i].RejectedNote + '</td>'
                + '<td>' + result[i].SourceROID + '</td>'
                + '<td>' + result[i].ApprovalDate + '</td>';

        }
        $("#CLScreeningGrid").append(strxml);
        $('.innerBox').show();
        $('#txtopenremarks').val('');
        $('#txtclrejectnote').val('');
        // $("select[name = CcReasonID]").load();
        GetCLReasons();
    }
    else {
        $("#txtCLmsg").html("No Record Found");
        $('.innerBox').hide();
        return false;
    }
}

function OpenCLRowData(th) {
    $('#btnopen').css('pointer-events', 'auto');
    $("#btnopen").css("opacity", '');
    $('#CLScreeningGrid tr').removeClass('rowSelected');
    $(th).addClass('rowSelected');
}

function GetCLReasons() {
    $("#openreasonid").empty();
    // $("#CcReasonID").empty();
    var parametername = $("#openreasonid").attr("parameter");
    var paramValue = $("#openreasonid").val();
    if (paramValue === null)
        paramValue = 0;
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++) {
            $("#openreasonid").append(new Option(result[m].Value, result[m].ID));
        }
    }
}

function OpenClassifiedData() {
    $('#divScreeningPopUp').dialog('open');
    FillCLSelectedRowData();
    if ($('#CLScreeningGrid tr.rowSelected').next().text() == "") {
        $("#btnskip").css("pointer-events", 'none');
        $("#btnskip").css("opacity", '0.5');
    }
    else {
        $("#btnskip").css("pointer-events", 'auto');
        $("#btnskip").css("opacity", '');
    }
}

function FillCLSelectedRowData() {
    var bookingid = $('#CLScreeningGrid tr.rowSelected').find('td:eq(0)')[0].textContent;
    var editionname = $('#CLScreeningGrid tr.rowSelected').find('td:eq(1)')[0].textContent;
    var othereditionname = $('#CLScreeningGrid tr.rowSelected').find('td:eq(2)')[0].textContent;
    var language = $('#CLScreeningGrid tr.rowSelected').find('td:eq(3)')[0].textContent;
    var material = $('#CLScreeningGrid tr.rowSelected').find('td:eq(4)')[0].textContent;
    var agencyname = $('#CLScreeningGrid tr.rowSelected').find('td:eq(5)')[0].textContent;
    var adtypename = $('#CLScreeningGrid tr.rowSelected').find('td:eq(8)')[0].textContent;
    var cat1 = $('#CLScreeningGrid tr.rowSelected').find('td:eq(9)')[0].textContent;
    var cat2 = $('#CLScreeningGrid tr.rowSelected').find('td:eq(10)')[0].textContent;
    var peid = $('#CLScreeningGrid tr.rowSelected').find('td:eq(12)')[0].textContent;
    var insertdate = $('#CLScreeningGrid tr.rowSelected').find('td:eq(13)')[0].textContent;
    var cloudorderstatus = $('#CLScreeningGrid tr.rowSelected').find('td:eq(14)')[0].textContent;
    var rejectedreasonid = $('#CLScreeningGrid tr.rowSelected').find('td:eq(15)')[0].textContent;
    var rejectednote = $('#CLScreeningGrid tr.rowSelected').find('td:eq(16)')[0].textContent;
    $('#txtedition').val(editionname);
    $('#txtotheredition').val(othereditionname);
    $('#txtlanguage').val(language);
    $('#txtadtype').val(adtypename);
    $('#txtcat1').val(cat1);
    $('#txtcat2').val(cat2);
    $('#txtinsertdate').val(insertdate);
    $('#spnbookingid').text(bookingid);
    $('#spnagencyname').text(agencyname);
    $('#spnclpeid').val(peid);
    $('#txtclrejectnote').val(material);
    if (rejectedreasonid > 0) {
        $('#openreasonid').val(rejectedreasonid);
        $("#openreasonid").css("pointer-events", 'none');
        $("#openreasonid").css("opacity", '0.5');
    }
    else {
        $("#openreasonid").css("pointer-events", 'auto');
        $("#openreasonid").css("opacity", '');
    }
    if (rejectednote != "") {
        $('#txtopenremarks').val(rejectednote);
        $("#txtopenremarks").css("pointer-events", 'none');
        $("#txtopenremarks").css("opacity", '0.5');
    }
    else {
        $("#txtopenremarks").css("pointer-events", 'auto');
        $("#txtopenremarks").css("opacity", '');
    }
    DisabledCLAcceptALL();
    DisabledCLAcceptReject(cloudorderstatus);
}

function DisabledCLAcceptALL() {
    var reasonid = $("#openreasonid").val();
    var remaks = $("#txtopenremarks").val();
    if (reasonid > 0 || remaks != "") {
        $('#btnclaccept').addClass('hidden');
    }
    else {
        $('#btnclaccept').removeClass('hidden');
    }
};

function DisabledCLAcceptReject(cloudorderstatus) {
    if (cloudorderstatus == 1) {
        $('#btnclaccept').removeClass('hidden');
        $('#btnclreject').removeClass('hidden');
    }
    else {
        $('#btnclaccept').addClass('hidden');
        $('#btnclreject').addClass('hidden');
    }
};

function AcceptAllCLData() {
    if (!confirm("Are you sure you want to accept order?")) {
        return false;
    }
    else {
        qStr = window.location.href.split('#')[0];
        userid = qStr.split('?')[1].split('=')[1].split('&')[0];
        var url = appRoot + "Booking_Screening/GetTableData";
        var param = {};
        param.ApiName = "/AcceptRejectCLData";
        param.AcceptReject = 1;
        param.ReasonID = $("#openreasonid").val();
        param.StrReason = $("#txtopenremarks").val();
        param.ROID = $("#spnbookingid").text();
        param.PEID = $("#spnclpeid").val();
        param.IsClassified = $('#hdnIsClassified').val();
        param.UserId = userid;
        var result = getresult(url, param);
        result = jQuery.parseJSON(result);
        if (result.length > 0) {
            if (result[0].ID == 1) {
                alert(result[0].Value);
                SkipRow();
                //BindClassifiedGridControl();
                //$('#divScreeningPopUp').dialog('close');
            }
            else {
                alert(result[0].Value);
                return false;
            }
        }
        else {
            alert("This PE not Approved.");
            return false;
        }
    }
}

function RejectAllCLData() {
    if ($("#openreasonid").val() == "0") {
        alert("Please select reason.");
        return false;
    }
    if ($("#txtopenremarks").val().trim() == "") {
        alert("'Please enter rejection note.");
        return false;
    }
    if (!confirm("Are you sure you want to reject order?")) {
        return false;
    }
    else {
        qStr = window.location.href.split('#')[0];
        userid = qStr.split('?')[1].split('=')[1].split('&')[0];
        var url = appRoot + "Booking_Screening/GetTableData";
        var param = {};
        param.ApiName = "/AcceptRejectCLData";
        param.AcceptReject = 0;
        param.ReasonID = $("#openreasonid").val();
        param.StrReason = $("#txtopenremarks").val();
        param.ROID = $("#spnbookingid").text();
        param.PEID = $("#spnclpeid").val();
        param.IsClassified = $('#hdnIsClassified').val();
        param.UserId = userid;
        var result = getresult(url, param);
        result = jQuery.parseJSON(result);
        if (result.length > 0) {
            if (result[0].ID == 1) {
                alert(result[0].Value);
                SkipRow();
                //BindClassifiedGridControl();
                //$('#divScreeningPopUp').dialog('close');
            }
            else {
                alert(result[0].Value);
                return false;
            }
        }
        else {
            alert("This PE not Rejected.");
            return false;
        }
    }
}

function SkipRow() {
    $('#CLScreeningGrid tr.rowSelected').removeClass('rowSelected').next().addClass('rowSelected');
    $('#txtopenremarks').val('');
    $('#txtclrejectnote').val('');
    $("#openreasonid").val(0);
    if ($('#CLScreeningGrid tr.rowSelected').length > 0) {
        FillCLSelectedRowData();
    }
    else {
        ScreeningPopUpClose();
        return false;
    }
    if ($('#CLScreeningGrid tr.rowSelected').next().text() == "") {
        $("#btnskip").css("pointer-events", 'none');
        $("#btnskip").css("opacity", '0.5');
    }
    else {
        $("#btnskip").css("pointer-events", 'auto');
        $("#btnskip").css("opacity", '');
    }
    return false;
}

function ScreeningPopUpClose() {
    $('#divScreeningPopUp').dialog('close');
    BindClassifiedGridControl();
    $('#btnopen').css('pointer-events', 'none');
    $("#btnopen").css("opacity", '0.5');
}

function GetGridReasons(id, value) {
    var Reasonid = id;
    var ReasonidValue = value;
    if (ReasonidValue == "") {
        ReasonidValue = 0;
    }
    $("#" + Reasonid + "").empty();
    var parametername = "CCReason";
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillControlData";
    param.Parametername = parametername;
    param.IsClassified = $('#hdnIsClassified').val();
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        for (var m = 0; m < result.length; m++) {
            $("#" + Reasonid + "").append(new Option(result[m].Value, result[m].ID));
        }
        $("#" + Reasonid + "").val(ReasonidValue);
    }
}


function DisabledAccept(th) {
    var reasonid = $("#" + th.id + "").val();
    if (reasonid > 0) {
        $(th).closest('tr').find('td[title="approved"],#btnaccept').addClass('hidden');
        $('#btnaccept').addClass('hidden');
        //$(th).closest('tr').find('td[title="approved"],#btnaccept').attr("disabled", true);
        //$('#btnaccept').attr("disabled", true);
    }
    else {
        $(th).closest('tr').find('td[title="approved"]').removeClass('hidden');
        $('#btnaccept').removeClass('hidden');
        //$(th).closest('tr').find('td[title="approved"]').removeAttr('disabled');
        //$('#btnaccept').removeAttr('disabled');
    }
}


function DisabledAcceptALL(th) {
    var reasonid = $(th).closest('tr').find('select[id="BookingNo"]').val();
    if (reasonid > 0) {
        $(th).closest('tr').find('td[title="approved"],#btnaccept').addClass('hidden');
        $('#btnaccept').addClass('hidden');
    }
    else {
        $(th).closest('tr').find('td[title="approved"]').removeClass('hidden');
        $('#btnaccept').removeClass('hidden');
    }
};


//function CheckedBoxValues() {
//    var Ivalue = $('#txtpackage').val();
//    var Iarray = Ivalue.split(",");
//    $('#packagelst li').css('background-color', 'white');
//    for (i = 0; i < Iarray.length; i++) {
//        $('#packagelst input:checkbox[Value=' + Iarray[i] + ']').prop('checked', true).parents("li").css('background-color', 'orange');
//    }
//}

function CheckedBoxValues() {
    var Ivalue = $('#txtpackage').val();
    var Iarray = Ivalue.split(",");
    $('#packagelst li').css('background-color', 'white');
    if (Ivalue == '-1') {
        $('#PackageCheck_all').prop('checked', true).parents("li").css('background-color', 'orange');
        $('#packagelst input:checkbox').prop('checked', true).parents("li").css('background-color', 'orange');
    }
    for (i = 0; i < Iarray.length; i++) {
        $('#packagelst input:checkbox[Value=' + Iarray[i] + ']').prop('checked', true).parents("li").css('background-color', 'orange');
    }
}


function GetStatusVal(flag, totalcount) {
    var selected = [];
    var charselected = [];
    var selectlen = [];
    if (flag == 0) {
        $('#txtpackage').val(-1);
        $('#packagelst input:checkbox[name=PackageitemChk]').prop('checked', true);
        bbttext = " -- " + "All" + " Selected--";
        $('#packagelst input:checkbox[name=PackageitemChk]:checked').each(function (e) {
            selected.push($(this).val());
        });
    }
    else {

        $('#packagelst input:checkbox[value=0]').prop('checked', false);
        bbttext = "Select Package";
        $('#packagelst input:checkbox[name=PackageitemChk]:checked').each(function () {
            charselected.push($(this).parents("label").text())
            selectlen.push($(this).parents("label").text().length)
            var lenghtchecked = (selected.length + 1);
            if (lenghtchecked == totalcount - 1) {
                bbttext = " -- " + "All" + " Selected--";
                $('#packagelst input:checkbox[value=0]').prop('checked', true);
                //$('#PackageCheck_all').prop('checked', true).parents("li").css('background-color', 'orange');
            }
            else if ((lenghtchecked == 1) && (selectlen < 25))
                bbttext = " -- " + charselected + " Selected--";
            else
                bbttext = " -- " + lenghtchecked + " Selected--";
            if (totalcount == -1)
                bbttext = bbttext = "Select Package";
            selected.push($(this).val());

        });
        $('#txtpackage').val(selected);
    }
    $('#divpackage').text(bbttext);
    CheckedBoxValues();
}



//function GetStatusVal(flag, totalcount) {

//    var selected = [];
//    var charselected = [];
//    var selectlen = [];
//    if (flag == 0) {
//        $('#txtpackage').val(-1);
//        $('#packagelst input:checkbox[name=PackageitemChk]').prop('checked', true);
//        bbttext = " -- " + "All" + " Selected--";
//        $('#packagelst input:checkbox[name=PackageitemChk]:checked').each(function (e) {
//            selected.push($(this).val());
//        })
//    }
//    else {

//        $('#packagelst input:checkbox[value=0]').prop('checked', false);
//        bbttext = "Select Package";
//        $('#packagelst input:checkbox[name=PackageitemChk]:checked').each(function () {

//            charselected.push($(this).parents("label").text())
//            selectlen.push($(this).parents("label").text().length)
//            var lenghtchecked = (selected.length + 1);
//            if (lenghtchecked == totalcount - 1) {
//                bbttext = " -- " + "All" + " Selected--";
//                $('#packagelst input:checkbox[value=0]').prop('checked', true);
//            }
//            else if ((lenghtchecked == 1) && (selectlen < 25))
//                bbttext = " -- " + charselected + " Selected--";
//            else
//                bbttext = " -- " + lenghtchecked + " Selected--";
//            if (totalcount == -1)
//                bbttext = bbttext = "Select Package";
//            selected.push($(this).val());
//        });
//        $('#txtpackage').val(selected);
//    }
//    $('#divpackage').text(bbttext);
//    CheckedBoxValues();
//}

function GetAgencyName() {
    // This Is To Show All Agency 
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    //var UserId = $('#hdnSession').val();
    var UserId = userid;
    if ($('#AllAgency:checked').length > 0)

        param.parameterlist = '<Parameter><FilterName>GetAgency</FilterName><AgencyName>' + $('#AgencyName').val() + '</AgencyName><Flag>1</Flag><ScreenType>' + StrScreenType + '</ScreenType><userid>' + UserId + '</userid></Parameter>';
    else
        param.parameterlist = '<Parameter><FilterName>GetAgency</FilterName><AgencyName>' + $('#AgencyName').val() + '</AgencyName><Flag>0</Flag><ScreenType>' + StrScreenType + '</ScreenType><userid>' + UserId + '</userid></Parameter>';
    param.id = 0;
    var url2 = "BookingApproval/GetAgency";
    var rs = getresult(url2, param);
    return rs;
}

function GetClientName() {
    param.parameterlist = '<Parameter><FilterName>GetClient</FilterName><ClientName>' + $('#ClientName').val() + '</ClientName></Parameter>';
    param.id = 0;
    var url2 = "BookingApproval/GetClient";
    var rs = getresult(url2, param);
    return rs;
}

function GetCanvassor() {
    param.parameterlist = '<Parameter><FilterName>GetCanvassor</FilterName><CanvassorName>' + $('#CanvassorName').val() + '</CanvassorName></Parameter>';
    param.id = 0;
    var url2 = "BookingApproval/GetCanvassor";
    var rs = getresult(url2, param);
    return rs;
}

function Approved(flag, thi) {
    var error = "";
    ROID = flag;
    AcceptReject = 1;
    Reasonid = $(thi).parents('tr').find('select').val();
    StrReason = $(thi).parents('tr').find('input[type=text]').val();
    StrScreenType = 2;//for so screen set this to 1
    if (AcceptReject == 0) {
        if (IsValidate() && confirm("Are you sure you want to reject seleted order?"))
            Accept(ROID, AcceptReject, Reasonid, StrReason, StrScreenType);
    }
    if (AcceptReject == 1 && confirm("Are you sure you want to accept seleted order?")) {
        Accept(ROID, AcceptReject, Reasonid, StrReason, StrScreenType);
    }
}

function ApprovedAll(AcceptReject) {
    var errorMsg = "";
    roidlst = get_Checkedroidlst();
    StrReason = $('#txtdsrejectnote').val();
    Reasonid = $('#mytable tfoot').find('[id="BookingNo"]').val();
    StrScreenType = 2;//for so screen set this to 1
    if (roidlst == "") {
        errorMsg += "Please select atleast one order.";
        alert(errorMsg);
        // ShowMsg(errorMsg);
    }
    else {
        if (AcceptReject == 0) {
            if (IsValidate() && confirm("Are you sure you want to reject seleted orders?"))
                AcceptAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType);
        }
        if (AcceptReject == 1 && confirm("Are you sure you want to accept seleted orders?")) {
            Reasonid = 0;
            AcceptAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType);
        }
    }
}

function Accept(ROID, AcceptReject, Reasonid, StrReason, StrScreenType) {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/AcceptRejectData";
    param.Parametername = "approve";
    param.RoidList = ROID;
    param.AcceptReject = AcceptReject;
    param.ReasonID = Reasonid;
    param.StrReason = StrReason;
    param.ScreenType = StrScreenType;
    param.UserId = userid;
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        if (result[0].ID == 1) {
            alert(result[0].Value);
            BindDisplayGridControl();
        }
        else {
            alert(result[0].Value);
            return false;
        }
    }
}

function AcceptAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType) {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/AcceptRejectData";
    param.Parametername = "approve";
    param.RoidList = roidlst.toString();
    param.AcceptReject = AcceptReject;
    param.ReasonID = Reasonid;
    param.StrReason = StrReason;
    param.ScreenType = StrScreenType;
    param.UserId = userid;
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        if (result[0].ID == 1) {
            alert(result[0].Value);
            BindDisplayGridControl();
        }
        else {
            alert(result[0].Value);
            return false;
        }
    }
}

function Rejected(flag, thi) {
    var error = "";
    ROID = flag;
    AcceptReject = 0;
    Reasonid = $(thi).parents('tr').find('select').val();
    StrReason = $(thi).parents('tr').find('input[type=text]').val();
    StrScreenType = 2;//for so screen set this to 1
    if (AcceptReject == 0) {
        if (IsValidate() && confirm("Are you sure you want to reject seleted order?"))
            Rject(ROID, AcceptReject, Reasonid, StrReason, StrScreenType);
    }
    if (AcceptReject == 1 && confirm("Are you sure you want to accept seleted order?")) {
        Rject(ROID, AcceptReject, Reasonid, StrReason, StrScreenType);
    }
}

function RejectedAll(AcceptReject) {
    var errorMsg = "";
    roidlst = get_Checkedroidlst();
    StrReason = $('#txtdsrejectnote').val();
    Reasonid = $('#BookingNo').val();
    StrScreenType = 2;//for so screen set this to 1
    if (roidlst == "") {
        errorMsg += "Please select atleast one order.";
        alert(errorMsg);
        // ShowMsg(errorMsg);
    }
    else {
        if (AcceptReject == 0) {
            if (IsValidate() && confirm("Are you sure you want to reject seleted orders?"))
                RjectAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType);
        }
        if (AcceptReject == 1 && confirm("Are you sure you want to accept seleted orders?")) {
            Reasonid = 0;
            RjectAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType);
        }
    }
}

function Rject(ROID, AcceptReject, Reasonid, StrReason, StrScreenType) {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/AcceptRejectData";
    param.Parametername = "reject";
    param.RoidList = ROID;
    param.AcceptReject = AcceptReject;
    param.ReasonID = Reasonid;
    param.StrReason = StrReason;
    param.ScreenType = StrScreenType;
    param.UserId = userid;
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        if (result[0].ID == 1) {
            alert(result[0].Value);
            BindDisplayGridControl();
        }
        else {
            alert(result[0].Value);
            return false;
        }
    }
}

function RjectAll(roidlst, AcceptReject, Reasonid, StrReason, StrScreenType) {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/AcceptRejectData";
    param.Parametername = "reject";
    param.RoidList = roidlst.toString();
    param.AcceptReject = AcceptReject;
    param.ReasonID = Reasonid;
    param.StrReason = StrReason;
    param.ScreenType = StrScreenType;
    param.UserId = userid;
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    if (result.length > 0) {
        if (result[0].ID == 1) {
            alert(result[0].Value);
            BindDisplayGridControl();
        }
        else {
            alert(result[0].Value);
            return false;
        }
    }
}


function IsValidate() {
    errorMsg = "";
    if (Reasonid == 0) {
        errorMsg += 'Please select reason.';
        //errorMsg += '<br />- Please select reason.';
    }
    if (StrReason == '') {
        errorMsg += 'Please enter rejection note.';
        //errorMsg += '<br />- Please enter rejection note.';
    }
    if (errorMsg != "") {
        //errorMsg = 'Mandatory Fields' + errorMsg;
        alert(errorMsg);
        // ShowMsg(errorMsg);
        return false;
    }
    else { return true; }
}
//function AcceptRject() {
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: appRoot + "/BookingApproval/ApprovedRejected",
//        data: '{"roid":"' + ROID + '","AcptRjct":"' + AcceptReject + '","ReasonId":"' + Reasonid + '","ReasonNote":"' + StrReason + '","ScreenType":"' + StrScreenType + '"}',
//        dataType: "json",
//        async: false,
//        success: function (rs) {
//            alert(rs.message);
//            $('#btnCCsubmit').click();
//        }
//    });
//    return data;
//}

//function AcceptRejectAll(AcceptReject) {
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: appRoot + "/BookingApproval/ApprovedRejected",
//        data: '{"roid":"' + roidlst + '","AcptRjct":"' + AcceptReject + '","ReasonId":"' + Reasonid + '","ReasonNote":"' + StrReason.replace('"', '`') + '","ScreenType":"' + StrScreenType + '"}',
//        dataType: "json",
//        async: false,
//        success: function (rs) {
//            alert(rs.message);
//            $('#btnCCsubmit').click();
//        }
//    });
//}

function get_Checkedroidlst() {
    //var ids = $("#mytable tr:has(input:checked)").map(function () {
    //    var $tr = $(this);
    //    var id = $tr.find("td .linkHyper").text().trim();
    //    return id;
    //}).get();

    var result = []
    var tableControl = $("#DSScreeningGrid");
    $('input:checkbox:checked', tableControl).each(function () {
        result.push($(this).parent().next().text());
    });
    return result;
}


//function getresult(url, param) {
//    var result;
//    $.ajax({
//        url: url,
//        async: false,
//        type: 'POST',
//        //data: {
//        //    format: 'json'
//        //},
//        data: param,
//        success: function (data) {
//            result = data;
//        },
//        error: function (e) {
//            alert('Some technical error');
//        }
//    });
//    return result;
//}

function LoginDetail() {
    qStr = window.location.href.split('#')[0];
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    centerid = qStr.split('&')[1].split('=')[1];
    var url = appRoot + "Booking_Screening/GetTableData";
    var param = {};
    param.ApiName = "/FillLoginData";
    param.UserId = userid;
    param.RevenueCentreID = centerid;
    var result = getresult(url, param);
    result = jQuery.parseJSON(result);
    var username = result.UserName.charAt(0).toUpperCase() + result.UserName.substring(1).toLowerCase();
    var centrename = result.CentreName.charAt(0).toUpperCase() + result.CentreName.substring(1).toLowerCase();
    $("#spnusername").text(username);
    $("#spncentername").text(centrename);
}

function UserLogOut() {
    var url = appRoot + "Booking_Screening/Logout";
    var param = {};
    var result = getresult(url, param);
    window.open('', '_self').close();
    location.assign(appRoot + "account/login");
}