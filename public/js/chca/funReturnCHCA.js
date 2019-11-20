/**
 * Created by SOA on 11/10/2017.
 */


function returnVistaSinies(numSinies,urlIM,urlCG,urlCM){
    $('#containerFooter').hide();
    $("#Searching_Modal").modal('show');

    if($("#returnSinies").children().length>0){
        //console.log('Yes content');
        $("#returnSinies").empty();
        $("#returnSinies").append(siniestro(urlIM,urlCG,urlCM));
        document.getElementById('hotelMixhu').innerHTML = "Siniestro #" + numSinies;
    } else {
        console.log('No content');
        $("#returnSinies").append(siniestro(urlIM,urlCG,urlCM));
        //console.log(urlIM);
        asignaAcceso = numSinies;
       // console.log(asignaAcceso);
        document.getElementById('hotelMixhu').innerHTML = "Siniestro #" + numSinies;
    }

   $("#Searching_Modal").modal('hide');
};




function returnVistaSinies2(numSinies,urlIM,urlCG){
    $('#containerFooter').hide();
    $("#Searching_Modal").modal('show');

    if($("#returnSinies").children().length>0){
        //console.log('Yes content');
        $("#returnSinies").empty();
        $("#returnSinies").append(siniestro2(urlIM,urlCG));
        document.getElementById('hotelMixhu').innerHTML = "Siniestro #" + numSinies;
    } else {
        console.log('No content');
        $("#returnSinies").append(siniestro2(urlIM,urlCG));
        //console.log(urlIM);
        asignaAcceso = numSinies;
       // console.log(asignaAcceso);
        document.getElementById('hotelMixhu').innerHTML = "Siniestro #" + numSinies;
    }

    //$("#Searching_Modal").modal('hide');
};


function returnIM(){
    $('#containerFooter').hide();
    $("#Searching_Modal").modal('show');

    if($("#returnSinies").children().length>0){
        //console.log('Yes content');
        $("#returnSinies").empty();
        $("#returnSinies").append(returnCie10());
    } else {
       // console.log('No content');
        $("#returnSinies").append(returnCie10());
    }

  //  $("#Searching_Modal").modal('hide');
};



function returnCondiGrales(){
    $('#containerFooter').hide();
    $("#Searching_Modal").modal('show');

    if($("#returnSinies").children().length>0){
       // console.log('Yes content');
        $("#returnSinies").empty();
        $("#returnSinies").append(returnCie10());
    } else {
        //console.log('No content');
        $("#returnSinies").append(returnCie10());
    }
    $("#Searching_Modal").modal('hide');
};


function returnTablaComanda(){
    $('#containerFooter').hide();
    $("#Searching_Modal").modal('show');

    if($("#returnSinies").children().length>0){
       // console.log('Yes content');
        $("#returnSinies").empty();
        $("#returnSinies").append(insumos());
    } else {
        //console.log('No content');
        $("#returnSinies").append(insumos());
    }
    $("#Searching_Modal").modal('hide');
};



function cleanSumary(cadena){
    cadena=cadena.trim();
    // Definimos los caracteres que queremos eliminar
    var specialChars = "€_~°·«»§®ü¡^!@#$^%*()+-[]\/{}|:¿?";
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), ' ');
    }
    cadena=cadena.replace(/< SPAN>/gi,"");
    cadena=cadena.replace(/&/gi," ");
    //cadena=cadena.replace(/"/gi," ");
    //cadena=cadena.replace(/'/gi," ");
    return cadena;
};

