/**
 * Created by SOA on 05/10/2017.
 */

function existeNodo(nodo,printNodo){
    if(nodo){
        printNodo = [nodo[0].name];
    }
    else{
        printNodo ="no existe esta entidad";
    }

};

//var text = ["CA DE MAMA EN CSE CON PROBABLE GASTRITIS. LA PACIENTE SE PRESENTA CON NAUSEAS SIN VÓMITOS, NO TIENE GASTRITIS COMO SE HABIA PENSADO. DESPUES DE REALIZARSE LA PRUEBA DE MAMAPRINT, SE DETERMINÓ QUE SE DEBERÍA REALIZAR UNA MASTECTOMIA DERECHA EL DIA 22 DE AGOSTO DEL PRESENTE AÑO.",
    //"Paciente con cáncer de mama diagnosticado en septiembre de 2013, ella fue sometida de manera inicial a manejo quirúrgico conservador que finalizo en junio de 2014. Ahora con datos de progresión tumoral por lo que requiere de manejo oncológico correspondiente en breve. Se presenta a urgencias con malestar y fatiga, dolor, fiebre, náuseas y vomito"];


function ajaxDiagPrin() {
    var text = "CA DE MAMA EN CSE CON PROBABLE GASTRITIS. LA PACIENTE SE PRESENTA CON NAUSEAS SIN VÓMITOS, NO TIENE GASTRITIS COMO SE HABIA PENSADO. DESPUES DE REALIZARSE LA PRUEBA DE MAMAPRINT, SE DETERMINÓ QUE SE DEBERÍA REALIZAR UNA MASTECTOMIA DERECHA EL DIA 22 DE AGOSTO DEL PRESENTE AÑO.";
    var host= "http://diagnostic-rest.mybluemix.net";
    //var host= "http://192.168.1.120:8080/diagnostics-rest";
    //var host= "http://192.168.1.120:8080/diagnostics-rest";

    var credenciales=JSON.stringify({
        'username': "admin",
        'password': "admin"
    });
    //console.log(credenciales);

    //  for (var i = 0; i < text.length; i++) {

    $.ajax({
        url: host+"/auth/token",
        type: 'POST',
        data: credenciales,
        //contenType: "application/json;charset=utf-8 ",
        contentType: "application/json",
        success: handledResponse,
        error: function (err, xhr, status) {
            //$("#Searching_Modal").modal('hide');
            console.log(JSON.stringify(err));
            //alert('Ups, Algo Paso');
        }
    }); //end ajax

    function handledResponse(response, statusText, xhr, readyState) {
        $("#Searching_Modal").modal('show');
        //console.log(response);
        var token = response;
        var autorization = "Bearer " + token;
        console.log(autorization);


        $.ajax({
            //url: host+"/api/v1/analyzer/diagnostic?text=CA DE MAMA EN CSE CON PROBABLE GASTRITIS. LA PACIENTE SE PRESENTA CON NAUSEAS SIN VÓMITOS, NO TIENE GASTRITIS COMO SE HABIA PENSADO. DESPUES DE REALIZARSE LA PRUEBA DE MAMAPRINT, SE DETERMINÓ QUE SE DEBERÍA REALIZAR UNA MASTECTOMIA DERECHA EL DIA 22 DE AGOSTO DEL PRESENTE AÑO.",
            url: host + "/api/v1/analyzer/analysis",
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify(
                {
                    text: text
                }
            ),
            headers: {
                "Authorization": autorization
            },
            // beforeSend: function (xhr){
            //     xhr.setRequestHeader('Authorization', autorization);
            // },
            //contenType: "application/json;charset=utf-8 ",
            contentType: "application/json",
            success: function (response, status, xhr) {
                console.log(response);
                //window.diagnostico=response.name;

                var nodoCompli = response.complications[0];
                if (nodoCompli) {
                    complicaciones = [nodoCompli.name];
                }
                else {
                    complicaciones = "no existe esta entidad";
                }

                var nodoDiagPrin = response.diagnostics[0];
                if (nodoDiagPrin) {
                    diagPrin = [nodoDiagPrin.name];
                    codePrin = nodoDiagPrin.code
                    //console.log(codePrin);
                    coberturaEncontrada();
                    descripcionTabulada(codePrin);


                }
                else {
                    diagPrin = "no existe esta entidad";
                }

                var nodoDiagDeter = response.diagnosticsDetermined[0];
                if (nodoDiagDeter) {
                    diagDeter = [nodoDiagDeter.name];
                }
                else {
                    diagDeter = ["no existe esta entidad"];
                }

                var nodoDiagProc = response.procedures[0];
                if (nodoDiagProc) {
                    proc = [nodoDiagProc.name];
                }
                else {
                    proc = ["no existe esta entidad"];
                }

                var nodoDiagSint = response.symptoms[0];
                if (nodoDiagSint) {
                    sint = [nodoDiagSint.name];
                }
                else {
                    sint = ["no existe esta entidad"];
                }

                $("#Searching_Modal").modal('hide');


            }, //end succes
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');

            }
        }) //end ajax

    }
    // }//end for ajax2
};



function ajaxDiagPrin2() {
    var text2 = "Paciente con cáncer de mama diagnosticado en septiembre de 2013, ella fue sometida de manera inicial a manejo quirúrgico conservador que finalizo en junio de 2014. Ahora con datos de progresión tumoral por lo que requiere de manejo oncológico correspondiente en breve. Se presenta a urgencias con  fiebre, náuseas y vomito";
    var host2= "http://diagnostic-rest.mybluemix.net";
    //var host= "http://192.168.1.120:8080/diagnostics-rest";
    //var host= "http://192.168.1.120:8080/diagnostics-rest";
    var credenciales2=JSON.stringify({
        'username': "admin",
        'password': "admin"
    });
    //console.log(credenciales);

    //  for (var i = 0; i < text.length; i++) {

    $.ajax({
        url: host2+"/auth/token",
        type: 'POST',
        data: credenciales2,
        //contenType: "application/json;charset=utf-8 ",
        contentType: "application/json",
        success: handledResponse2,
        error: function (err, xhr, status) {
            $("#Searching_Modal").modal('hide');
            console.log(JSON.stringify(err));
            //alert('Ups, Algo Paso');
        }
    }); //end ajax

    function handledResponse2(response, statusText, xhr, readyState) {
        $("#Searching_Modal").modal('show');
        //console.log(response);
        var token2 = response;
        var autorization2 = "Bearer " + token2;
        //console.log(autorization2);

console.log(response);
        $.ajax({
            //url: host+"/api/v1/analyzer/diagnostic?text=CA DE MAMA EN CSE CON PROBABLE GASTRITIS. LA PACIENTE SE PRESENTA CON NAUSEAS SIN VÓMITOS, NO TIENE GASTRITIS COMO SE HABIA PENSADO. DESPUES DE REALIZARSE LA PRUEBA DE MAMAPRINT, SE DETERMINÓ QUE SE DEBERÍA REALIZAR UNA MASTECTOMIA DERECHA EL DIA 22 DE AGOSTO DEL PRESENTE AÑO.",
            url: host2 + "/api/v1/analyzer/analysis",
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify(
                {
                    text: text2
                }
            ),
            headers: {
                "Authorization": autorization2
            },
            // beforeSend: function (xhr){
            //     xhr.setRequestHeader('Authorization', autorization);
            // },
            //contenType: "application/json;charset=utf-8 ",
            contentType: "application/json",
            success: function (response, status, xhr) {
                //console.log(response);
                //window.diagnostico=response.name;
                complicaciones2=[];
                var nodoCompli2 = response.complications;
                for(var i=0; i<nodoCompli2.length; i++) {
                    //var nodoCompli2 = response.complications[0];
                    if (nodoCompli2) {
                        complicaciones2[i] = nodoCompli2[i].name;
                     //   sint2[i] = complicaciones2[i];
                    }
                    else {
                        complicaciones2 = "no existe esta entidad";
                    }
                }

                var nodoDiagPrin2 = response.diagnostics[0];
                if (nodoDiagPrin2) {
                    diagPrin2 = [nodoDiagPrin2.name];
                    codePrin2 = nodoDiagPrin2.code
                    //console.log(codePrin);
                    coberturaEncontrada();
                    descripcionTabulada(codePrin2);


                }
                else {
                    diagPrin = "no existe esta entidad";
                }

                var nodoDiagDet2 = response.diagnosticsDetermined[0];
                if (nodoDiagDet2) {
                    diagDeter2 = [nodoDiagDet2.name];
                }
                else {
                    diagDeter2 = ["no existe esta entidad"];
                }

                var nodoDiagProc2 = response.procedures[0];
                if (nodoDiagProc2) {
                    proc2 = [nodoDiagProc2.name];
                }
                else {
                    proc2 = ["no existe esta entidad"];
                }

                sint2=[];
               var nodoDiagSint2 = response.symptoms;
                for(var i=0; i<nodoDiagSint2.length; i++) {
                    //var nodoCompli2 = response.complications[0];
                    if (nodoDiagSint2) {
                        sint2[i] = nodoDiagSint2[i].name;
                    }
                    else {
                        sint2 = "no existe esta entidad";
                    }
                }







                $("#Searching_Modal").modal('hide');


            }, //end succes
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');

            }
        }); //end ajax

    }
    // }//end for ajax2
};
