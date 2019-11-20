//Global
var filesToUpload = null;
var fileExtension = '';
var currentPage = 1;
var totalPagesOrImages = 0;
var imageGalleryData = [];
var imageDataSRCs = [];
var lastValue = '';
var isErroredOnParsing = false;
var isPartiallyErroredOnParsing = false;
var isEnablePopup = false;
var completeText = '';
var pdfFile = null;

$(document).ready(function () {
    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }
});

// file drag hover
function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {

    // cancel event and hover styling
    FileDragHover(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    filesToUpload = files;

    if (ReadFiles(files)) {
        imageGalleryData = [];
        isEnablePopup = false;
        $("#filedrag").hide();
        $("#previewImage").show();
        //$("#previewText").html("File loaded successfully. For PDFs, only the first page will be shown in preview.");
        resetFormElement($("#imageFile"));
        resetFormElement($("#imageUrl"));
        $("#txtAreaParsedResult").val("");
        resetFormElement($("#ocrLanguage"));
        ClearError();
    }
    else {
        ShowError("<strong>Error:</strong> ¡Archivo inválido!. Debe cargar archivos con extensión de <strong>imágen</strong> (.png ó.jpg) o con extensión <strong> PDF. </strong> El tamaño máximo permitido es de <strong>5 MB</strong>.");
    }
}

//
// initialize
function Init() {

    var filedrag = $id("filedrag");

    // file drop
    if (filedrag) {
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
    }
}

//Input["file"] type change handler - called when user chooses a file
$("#imageFile").change(function () {

 //$("#divEditable").show();

    if (ReadFiles(this.files)) {
        imageGalleryData = [];
        isEnablePopup = false;
        $("#filedrag").hide();
        $("#previewImage").show();
              StartOCR();
        //$("#previewText").html("File loaded successfully. For PDFs, only the first page will be shown in preview.");
        resetFormElement($("#imageUrl"));

  
       //$("#txtAreaParsedResult").val("");
        //resetFormElement($("#ocrLanguage"));
       // ClearError();

    }
    else {
        ShowError("<strong>Error:</strong> ¡Archivo inválido!. Debe cargar archivos con extensión de <strong>imágen</strong> (.png ó.jpg) o con extensión <strong> PDF. </strong> El tamaño máximo permitido es de <strong>5 MB</strong>.");
        resetFormElement($("#imageFile"));
    }
})

//Image url change
$("#imageUrl").on('change keyup paste mouseup', function () {
    if ($(this).val() != lastValue) {
        lastValue = $(this).val();
        LoadFileFromURL();
    }
});


function hola(){
    console.log("Carlos");
}



function DownloadCrossDomainPDF(data) {
    console.log('DownloadCrossDomainPDF');
    console.log(data);
}

//Load the file from specified URL
function LoadFileFromURL() {

    imageDataSRCs = [];
    if ($("#imageUrl").val() == '' || $("#imageUrl").val() == null || $("#imageUrl").val() == 'undefined'
        || !ValidateImageExtension($("#imageUrl").val())) {

        //show error message
        ShowError("Invalid URL! Please provide url of only an image (.png or .jpg) <strong>OR</strong> a PDF file");

        //set parsed text
        $("#txtAreaParsedResult").val("");

        resetFormElement($("#imageUrl"));
        return;
    }

    fileExtension = GetFileExtension($("#imageUrl").val());

    if (fileExtension == 'pdf') {

        //Reset other elements and clear error
        $("#filedrag").hide();
        $("#previewImage").show();
        $("#previewImage").attr("src", "/Content/Images/PDF_Image.png");
        //$("#previewText").html("File loaded successfully. No preview possible for PDF files. Document downloads starts with OCR.");
        resetFormElement($("#imageFile"));
        $("#txtAreaParsedResult").val("");
        resetFormElement($("#ocrLanguage"));
        ClearError();
    }
    else {

        $("#previewImage").attr("src", $("#imageUrl").val());
        $("#previewText").html("File loaded successfully.");
        $("#filedrag").hide();
        $("#previewImage").show();

        //Reset other elements and clear erro        
        resetFormElement($("#imageFile"));
        $("#txtAreaParsedResult").val("");
        resetFormElement($("#ocrLanguage"));
        ClearError();

        //Push the image URL to later use for overlay
        imageDataSRCs.push($("#imageUrl").val());
    }

}



//Read files from the provided files object
function ReadFiles(files) {

    imageDataSRCs = [];
    resetFormElement($("#txtAreaParsedResult"));

    if (files && files[0]) {

        var fileName = files[0].name;

        if (ValidateImageExtension(fileName)) {

            //If file size is greater than 5 MB return false
            if (files[0].size > (1024 * 1024 * 5)) {
                return false;
            }

            fileExtension = GetFileExtension(files[0].name);

            if (fileExtension == 'pdf') {
                $("#animatedProgress").show();
                pdfFile = null;

                var tempReader = new FileReader();
                tempReader.onload = function (e) {
                    //console.log(e);

                    var arrayBuffer = tempReader.result;

                    //console.log(arrayBuffer.byteLength);

                    var uint8Array = new Uint8Array(arrayBuffer);

                    //console.log(uint8Array);
                    PDFJS.getDocument(uint8Array).then(function (pdf) {

                        //console.log(pdf);

                        pdfFile = pdf;
                        totalPagesOrImages = pdf.numPages;
                        //console.log("Number of pages: " + numOfPages);

                        pdfFile.getPage(1).then(handleFirstPage);

                    }).catch(function (error) {

                        if (error["name"] != null && error["name"] != undefined && error["name"] == "InvalidPDFException") {
                            ShowError("<strong>Error: </strong>Error al cargar el archivo. Por favor selecciona un archivo PDf válido");
                            resetFormElement($("#imageFile"));
                            $("#animatedProgress").hide();
                        }
                    });

                };

                filesToUpload = files;
                tempReader.readAsArrayBuffer(files[0]);

                return true;
            }
            else { //If an image file                

                var reader = new FileReader();

                reader.onload = function (e) {
                    $("#previewImage").attr("src", e.target.result);
                    $("#previewText").html("File loaded successfully.");

                    imageDataSRCs.push(e.target.result);
                };

                reader.readAsDataURL(files[0]);
                filesToUpload = files;
                totalPagesOrImages = 1;

                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        $("#previewImage").attr("src", "");

        filesToUpload = null;
        return false;
    }
}

//Show PDF opening error
function ShowPDFError(e) {
    ShowError("<strong>Error occurred when opening PDF.</strong> Message: " + e.message);
    ResetAllFormElements();
}

//handle only first page of PDF
function handleFirstPage(page) {

    var scale = 1.5;
    var viewport = page.getViewport(scale);

    var canvas = $('<canvas/>').get(0);
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderingContext = {
        canvasContext: context,
        viewport: viewport
    };

    page.render(renderingContext).then(function () {

        var dataURL = canvas.toDataURL();

        //if (currentPage == 1) {
            $("#previewImage").attr("src", dataURL);
          //  $("#previewText").html("File loaded successfully. For PDFs, only the first page will be shown in preview.");
        //}

       // $("#animatedProgress").hide(); // COMENTADA PARA QUE NO DESASPARESCA LA BARRA HASTA QUE REGRESE EL TEXTO
    });

}

//Fill the image data src array with images from the PDF file
function FillImageDataSRCsFromPDFFile()
{    
    currentPage = 1;
    totalPagesOrImages = 0;

    if (filesToUpload) {

        var fileToScan = filesToUpload[0];
        pdfFile = null;

        var tempReader = new FileReader();
        tempReader.onload = function (e) {

            $("#animatedProgress").show();

            var arrayBuffer = tempReader.result;

            var uint8Array = new Uint8Array(arrayBuffer);

            PDFJS.getDocument(uint8Array).then(function (pdf) {

                pdfFile = pdf;
                totalPagesOrImages = pdf.numPages;

                pdfFile.getPage(1).then(handlePages);

                $("#animatedProgress").hide();

            }).catch(function (error) {

                if (error["name"] != null && error["name"] != undefined && error["name"] == "InvalidPDFException") {
                    ShowError("<strong>Error: </strong>The PDF file is corrupt. Please choose a valid PDF file");
                    resetFormElement($("#imageFile"));                    
                }

                $("#animatedProgress").hide();
            });

        };

        tempReader.readAsArrayBuffer(fileToScan);
    }
    else if($("#imageUrl").val() != undefined && $("#imageUrl").val() != '' && $("#imageUrl").val() != null) {       

        PDFJS.getDocument($("#imageUrl").val()).then(function (pdf) {
            pdfFile = pdf;
            totalPagesOrImages = pdf.numPages;

            pdfFile.getPage(1).then(handlePages);

            $("#animatedProgress").hide();

        }).catch(function (error) {

            if (error["name"] != null && error["name"] != undefined) {

                if (error["name"] == "InvalidPDFException") {
                    ShowError("<strong>Error: </strong>The PDF file is corrupt. Please choose a valid PDF file");
                }
                else if (error["name"] == "UnexpectedResponseException")
                {
                    ShowError("<strong>Error: </strong>Unable to load the PDF file for showing images for overlay. Please check if the PDF URL allows cross-origin requests");
                }

                resetFormElement($("#imageFile"));
            }

            $("#animatedProgress").hide();
        });
    }
}

function PDFFileDataURLExtractionCompleted()
{
    $.each(imageGalleryData, function (index, value) {

        var $thisImageGalleryData = value;

        var divTag = $thisImageGalleryData["src"];

        var imageTag = divTag.find('img');

        imageTag.attr('src', imageDataSRCs[index]);
    });

    //Enable Overlay popup
    enablePopup();
}

//handle all pdf pages
function handlePages(page) {
    try {
        var scale = 1.35;
        var viewport = page.getViewport(scale);

        var canvas = $('<canvas/>').get(0);
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderingContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderingContext).then(function () {
            var dataURL = canvas.toDataURL();            
            imageDataSRCs.push(dataURL);

            currentPage++;

            if (pdfFile != null) {
                if (currentPage <= totalPagesOrImages) {
                    pdfFile.getPage(currentPage).then(handlePages);
                }
                else {
                    PDFFileDataURLExtractionCompleted();
                }
            }
        });
    }
    catch (e) {
        ShowError("<strong>Error occurred when opening PDF.</strong> Message: " + e.message);
        resetFormElement($("#imageFile"));
    }
}

// getElementById
function $id(id) {
    return document.getElementById(id);
}

//Clear the page
function Clear() {

document.getElementById("txtAreaParsedResult").innerHTML="";
ClearError();
    //Reset all form elements
    ResetAllFormElements();

    //Clear error messages, if any
    


//$("#txtAreaParsedResult").empty();
 
}

//Reset all form elements
function ResetAllFormElements() {
    $("#filedrag").show();
    $("#previewImage").attr("src", "");
    $("#previewImage").height("100%");
    $("#previewImage").hide();
    resetFormElement($("#imageFile"));
    resetFormElement($("#imageUrl"));
    //resetFormElement($("#ocrLanguage")); //Not resetting language as its persisted using cookies
    resetFormElement($("#txtAreaParsedResult"));
    $("#txtAreaParsedResult").height("100%");
    filesToUpload = null;
    lastValue = '';
    isErroredOnParsing = false;
    isPartiallyErroredOnParsing = false;
    imageGalleryData = [];
    currentPage = 1;
    isEnablePopup = false;
    $("#animatedProgress").hide();
    $("#previewText").html("");
    completeText = '';
    $("#btnShowOverlay").removeAttr("disabled");
    $("#btnDownloadText").removeAttr("disabled");
    $("#btnStartOCR").removeAttr("disabled");
}

//Clear just the error box
function ClearError() {
    //empty error/success message
    document.getElementById("sucOrErrMessage").innerHTML = "";
    $("#sucOrErrMesgMainDiv").removeClass("alert-danger");
    $("#sucOrErrMesgMainDiv").hide();
}

//Show error
function ShowError(errorMessage) {
    //show error message
    document.getElementById("sucOrErrMessage").innerHTML = errorMessage;
    $("#sucOrErrMesgDiv").removeClass("alert-success");
    $("#sucOrErrMesgDiv").removeClass("alert-warning");
    $("#sucOrErrMesgDiv").addClass("alert-danger");
    $("#sucOrErrMesgMainDiv").show();
}

//Show success
function ShowSuccess(successMessage) {
    document.getElementById("sucOrErrMessage").innerHTML = successMessage;
    $("#sucOrErrMesgDiv").removeClass("alert-danger");
    $("#sucOrErrMesgDiv").removeClass("alert-warning");
    $("#sucOrErrMesgDiv").addClass("alert-success");
    $("#sucOrErrMesgMainDiv").show();
}

//Show warning
function ShowWarning(warningMessage) {
    document.getElementById("sucOrErrMessage").innerHTML = warningMessage;
    $("#sucOrErrMesgDiv").removeClass("alert-danger");
    $("#sucOrErrMesgDiv").removeClass("alert-success");
    $("#sucOrErrMesgDiv").addClass("alert-warning");
    $("#sucOrErrMesgMainDiv").show();
}

//Reset a form element
function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

//Start OCR
function StartOCR() {
    var erroredPagesOrImages = 0;
    var totalPagesOrImages = 0;

    //If Validated
    if (Validate()) {
      
        $("#btnStartOCR").attr("disabled", "disabled");
        $("#btnDownloadText").attr("disabled", "disabled");
        $("#btnShowOverlay").attr("disabled", "disabled");

        //Prepare form data
        var formData = new FormData();

        //Comment this when uploading multiple files - currently using for single file
        if (filesToUpload)
            formData.append("file", filesToUpload[0]);

        formData.append("url", $("#imageUrl").val());
        //formData.append("language", $("#ocrLanguage option:selected").val());
        formData.append("language", "spa");
        formData.append("apikey", "f9ee47306a88957");
        formData.append("isOverlayRequired", "true");

        //Clear error
        ClearError();

        //Reset text area, complete text and the image gallery
        $("#txtAreaParsedResult").val("");
        completeText = '';
        imageGalleryData = [];

        //Send OCR Parsing request asynchronously
        jQuery.ajax({
            url: webApiBaseURL + webApiParseImageRelativeURL,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (ocrParsedResult) {

                $("#btnDownloadText").removeAttr("disabled");
                var parsedResults = ocrParsedResult["ParsedResults"];
                var ocrExitCode = ocrParsedResult["OCRExitCode"];
                var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
                var errorMessage = ocrParsedResult["ErrorMessage"];
                var errorDetails = ocrParsedResult["ErrorDetails"];
                var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
                var processingTimeInSeconds = (+processingTimeInMilliseconds) / 1000;

                if (parsedResults != null) {
                    var imageOrPageCount = 0;

                    if (fileExtension == 'pdf') FillImageDataSRCsFromPDFFile();
                                        
                    $.each(parsedResults, function (index, value) {

                        var exitCode = value["FileParseExitCode"];
                        var parsedText = value["ParsedText"];
                        var errorMessage = value["ErrorMessage"];
                        var errorDetails = value["ErrorDetails"];
                        var textOverlay = value["TextOverlay"];

                        var pageText = '';
                        var isSetOverlay = false;

                        switch (+exitCode) {
                            case 1:
                                pageText = parsedText;
                                isSetOverlay = true;
                                break;
                            case 0:
                            case -10:
                            case -20:
                            case -30:
                            case -99:
                            default:
                                pageText += "Error: " + errorMessage;
                                break;
                        }

                        imageOrPageCount++;
                        completeText += "\r\nPágina " + imageOrPageCount + " " + pageText

                        var imageDataURL = imageDataSRCs[index];

                        //Create the element for displaying this image in 'overlay' popup
                        var imageElement = $("<div style='text-align:center;'><div style='position: relative; display: inline-block;'><img style='position: relative; vertical-align: central;' src='" + imageDataURL + "' /></div></div>");

                        //Set text overlay for this image
                        if (isSetOverlay && textOverlay && textOverlay["HasOverlay"] == true)
                            SetOverlay(imageElement, textOverlay);
                    });
                }

                switch (ocrExitCode) {
                    case 1:
                        //ShowSuccess("<strong>¡Carga de documento Exitoso!</strong>(tiempo: " + processingTimeInSeconds + " seconds)");
                        ShowSuccess("<strong>¡Documento cargado exitósamente!</strong>");
                        if (fileExtension != 'pdf')
                            enablePopup();
                        else
                            disablePopup();

                        break;
                    case 2:
                        ShowWarning("<strong>Warning: Image / PDF pages parsed with errors.</strong> One or more image / pages gave error on conversion. Please check the errors in result area.");
                        disablePopup();
                        break;
                    case 3:
                        ShowError("<strong>Error: All images / PDF pages gave error.</strong> None of the image / page was successfully converted. Please check the errors in result area.");
                        disablePopup();
                        break;
                    case 99:
                        ShowError("<strong>Error: </strong>" + errorMessage);
                        disablePopup();
                        break;
                    default:
                        ShowError("<strong>Error: ¡Ha ocurrido un error, por favor intentalo de nuevo !");
                        disablePopup();
                        break;
                }

                //set parsed text
                if (completeText != null && completeText != undefined && completeText != "") {
                   // $("#txtAreaParsedResult").val(completeText);
                    var texto=document.getElementById("txtAreaParsedResult").innerHTML=completeText;
                    //console.log(texto);
                    //$("#divEditable").val(completeText);
                    $("#txtAreaParsedResult").height($("#previewImage").height());



// function sendRequest() {
// console.log("se disparo");
// $.ajax({
//   url: "http://localhost:8088/Spring4MVCCRUDRestService/watson/",
//   type:'POST',
//   data:{"text":texto},
//   contenType:"application/json",
//   //dataType : "jsonp",

//   success: handledResponse
//   //function(response, callback){
//     // console.log("Recibes: ", response);
//     // var json=JSON.stringify(response);
//     // $("<pre>").text(json).appendTo("body");
//   //}
//   ,
//   error : function(err, xhr, status) {
//     console.log(JSON.stringify(err));
//     alert('Disculpe, existió un problema');
//   },
   
//  // código a ejecutar sin importar si la petición falló o no
//  complete : function(xhr, statusText,readyState) {
//     // alert('Petición realizada '+ xhr.status+" "+xhr.readyState);
//   }

// });


// function handledResponse(response,statusText,xhr,readyState){
//   //console.log("Recibes: ", response);
//   //console.log(statusText);
//   var json=JSON.stringify(response,null,2); // stringify convierte un valor 
//   console.log(json);
// } //handledResponse




// };







                }//if

                $("#btnStartOCR").removeAttr("disabled");
                $("#animatedProgress").hide();

                //persist last language selection
                persistLastLanguageSelection();
            },
            error: function (error) {
                $("#btnStartOCR").removeAttr("disabled");
                $("#animatedProgress").hide();
                console.log(error);

                var responseText = error["responseText"];

                //show error message
                ShowError("<strong>Error when processing image.</strong> " + responseText);

                //set parsed text
                $("#txtAreaParsedResult").val("");
            }
        });
    }
}

//Validation
function Validate() {

    isValidated = true;

    var message = "";
    if ((filesToUpload == null || filesToUpload == 'undefined') && ($("#imageUrl").val() == null || $("#imageUrl").val() == 'undefined' || $("#imageUrl").val() == '')) {
        message += "* Seleccciona un archivo<br>";
    } else if (filesToUpload != null && filesToUpload.length > 1)
        message += "* Por favor selecciona solo un archivo a la vez<br /><br />";

    if ($("#ocrLanguage option:selected").val() == "" || $("#ocrLanguage option:selected").val() == 'undefined' || $("#ocrLanguage option:selected").val() == "-- Select --") {
        message += "*Selecciona el idioma de la imagen<br /><br />";
    }

    if (message != '') {
        message = "<strong>Error: </strong><br>" + message;

        //show error message
        document.getElementById("sucOrErrMessage").innerHTML = message;
        $("#sucOrErrMesgDiv").addClass("alert-danger");
        $("#sucOrErrMesgMainDiv").show();

        isValidated = false;
    }

    return isValidated;
}

//Close the error/success box
$(".close").click(function (e) {
    //$("#sucOrErrMesgMainDiv").hide();
    e.stopPropagation();
    ClearError();
});

//Validate an image extension
function ValidateImageExtension(fileNameOrUrl) {
    var extension = GetFileExtension(fileNameOrUrl);

    var allowedExtensions = ["jpg", "tiff", "png", "jpeg", "tif", "gif", "bmp", "pdf"];

    var indexOfExt = $.inArray(extension.toLowerCase(), allowedExtensions);

    if (indexOfExt >= 0)
        return true;
    else
        return false;
}

//Get a file extension from name or URL
function GetFileExtension(fileNameOrUrl) {
    var a = fileNameOrUrl.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop();
}

//Set overlay on image
function SetOverlay(imageElement, textOverlay) {

    var divElement = imageElement.find('div');

    var divContent = '';
    var lines = textOverlay["Lines"];

    //Loop through each line to show words
    $.each(lines, function () {

        var $thisLine = $(this)[0];
        var maxLineHeight = $thisLine["MaxHeight"];
        var minLineTopDist = $thisLine["MinTop"];

        //Loop through each word to show on top of the text
        $.each($thisLine["Words"], function () {

            $thisWord = $(this)[0];

            divContent = divContent +
            "<span style=\"position:absolute; left:" + $thisWord["Left"] + "px; top:" + minLineTopDist + "px; height:" + maxLineHeight + "px; width:" + $thisWord["Width"] + "px; text-align:center; font-size: " + ((+maxLineHeight) * 0.8) + "px; font-weight: bold; color: red; background: linear-gradient(" +
              "rgba(255, 215, 15, 0.5)," +
              "rgba(255, 215, 15, 0.5)" +
            ");\">" + $thisWord["WordText"] + "</span>&nbsp;";
        });

        divContent = divContent + "<br/>";
    });
    
    //Append the original 'div' tag with the 'spans' so that it contains the image as well as its overlay
    divElement.append(divContent);

    //Create the image source that will come in the gallery view
    var imageSourceToReplace = { src: imageElement };

    //push the image source to the image gallery data array - this array will be used to show the gallery of images with overlay
    imageGalleryData.push(imageSourceToReplace);

}

//Download OCR'ed Text
function DownloadText() {
    if (completeText) {
        saveTextAsFile(completeText);
    }
    else
        ShowError("<strong>Error: </strong>Please parse an image or PDF to download its text. If already parsed then no text for this image or pdf exists.");
}

//Saves the text in textbox as a file
function saveTextAsFile(textToWrite) {
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = "ParsedResult.txt";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

//Show overlay function
function ShowOverlay() {
    if (isEnablePopup) {
        $("#previewImage").trigger('click')
    }
    else {
        ShowError("<strong>No overlay text available to show.</strong> Please <strong>'successfully'</strong> parse an image or PDF file to see its overlay results.");
    }
}

//Submit the contact us form
function submitContactForm() {
    $("#ocrContactForm").submit();
}

//Persists user's chosen language using cookies
function persistLastLanguageSelection() {
    var selectedLanguage = $("#ocrLanguage option:selected").val();

    setCookie("selectedLanguage", selectedLanguage, 30);
}

//Set a cookie with the given name, value and expiry period
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//Get cookie with the provided name
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

//Disable the overlay popup
function disablePopup() {
    //Disable 'overlay' popup
    isEnablePopup = false;
    $("#btnShowOverlay").attr("disabled", "disabled");
}

//Enable the overlay popup
function enablePopup() {
    //Enable 'overlay' popup
    isEnablePopup = true;
    $("#btnShowOverlay").removeAttr("disabled");
    $("#previewImage").magnificPopup({
        items: imageGalleryData,
        enableEscapeKey: true,
        type: 'inline',
        showCloseBtn: true,
        closeOnContentClick: true,
        inline: {
            markup: '<a class="mfp-src"></a>',
        },
        disableOn: function () {
            if (isEnablePopup) {
                return true;
            }
            return false;
        },
        gallery: {
            enabled: true,
            preload: [0, 2]
        }
    });
}

//Smooth Scrolling
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});