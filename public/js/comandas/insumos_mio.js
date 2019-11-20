//*****************************************************************************************
// IMPRIMIR COMANDA
 //*****************************************************************************************/
function insumosFace(arrayInsumos){
    console.log(arrayInsumos);
}

function insumos() {

    $("#Searching_Modal").modal('show');

    var tabla = "<table id='tabla' class='table table-hover tabla' style='width:60%; background-color: white; color: black; '>";
    tabla +="<tr class='active'>";
    tabla +="<th class='col-lg-2' style='background-color:#f1f1f1; text-align: center;'>#</th>";
    tabla +="<th class='col-lg-2' style='background-color:#f1f1f1; text-align: center;'>InsumosFacet</th>";
    tabla +="<th class='col-lg-2' style='background-color:#f1f1f1; text-align: center;'>Tipo</th>";
    tabla +="<th class='col-lg-12' style='background-color:#f1f1f1; text-align: center;'>InsumosTxt</th>";
    tabla +="<th class='col-lg-12' style='background-color:#f1f1f1; text-align: center;'>Relacionado con Diagnóstico</th>";
    // tabla +="<th class='col-lg-12' style='background-color:#f1f1f1; text-align: center;'>Precio en Comanda</th>";
    tabla +="</tr>";



//!***************************Ajax Facetas Insumos *********************************************
    arrayInsumos=[];
    var hostWatson="http://proyectosoa.sytes.net:8393/api/v10/";
    var coleccion = ["VitaMedica_Angeles_1"];
    var episodio=["4707865"];
    var numPaciente=["1000971318"];
    var faceta=["$.insumos.registro"];
    //var insumosFacetas=[];

    $.ajax({
        //url: hostWatson+'search?collection='+coleccion[0]+'&query=((*:*) AND (keyword::/"Número de Paciente"/"'+numPaciente+'")) AND (keyword::/"Número de Episodio"/"'+episodio+'")&facet={"namespace":"keyword","id":"'+faceta+'","count":10000}&output=application/javascript',
        url:hostWatson+'search?collection='+coleccion[0]+'&query=(((*:*) AND (keyword::/"Número de Paciente"/"'+numPaciente+'")) AND (keyword::/"Número de Episodio"/"'+episodio+'")) AND (keyword::/"Total"/"251,552.04")&facet={"namespace":"keyword","id":"'+faceta+'","count":10000}&output=application/javascript',
        type:'POST',
        //data:{"text":text},
        contenType:"application/javascript",
        dataType : "jsonp",
        success: function(response){
            var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
            var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
            var ibmsc_facetValue= jsonParse['es_apiResponse']['ibmsc_facet']['ibmsc_facetValue'];
            //console.log(ibmsc_facetValue);
            //console.log(textfacets.length);
            if(ibmsc_facetValue){
                //window.arrayInsumos=[];
                //var k=0;
                for(var i=0; i<=ibmsc_facetValue.length-1; i++){
                    var label=ibmsc_facetValue[i]['label'];
                    var labelSplit=label.split("||");
                    var insumos=labelSplit[0];
                    arrayInsumos.push(insumos);
                    arrayInsumos.sort();
                }//end for
                //insumosFacetas(arrayInsumos);
            }//end if
            else{
                alert("No existe el nodo ['es_apiResponse']['ibmsc_facet']['ibmsc_facetValue'] en el json");
            }

            //console.log(arrayInsumos.length); //230 insumos
            //console.log("total de insumos en la facetas= "+arrayInsumos.length); //149 insumos

// !***************************End Facetas Insumos *********************************************

//!***************************Ajax TXT Insumos *********************************************
            $.ajax({
                url: 'http://localhost:5000/data/InsumosRelacionadosACancerDeMama.txt',
                type: 'GET',
                dataType: 'text',
                crossDomain : true,
                contentType: "text/plain; charset=UTF-8",
                encoding: "UTF-8",
                success: function (data) {

                    insumosCancerTxt=data.split('\n');
                    insumosCancerTxt.sort();
                    //console.log(insumosCancerTxt.length); //217 insumos



//!***************************End Txt Insumos *********************************************
//!***************************End Ajax Categoria Insumos *********************************************

                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:5000/data/insumosMama.txt',
                        dataType: 'text',
                        crossDomain : true,
                        contentType: "text/plain; charset=UTF-8",
                        encoding: "UTF-8",
                        success: function (data) {
                            //var expresionRegular = /||\n/;
                            //data1=data.trim();
                            window.insumosTxt=data.split('\n');
                            insumosTxt.sort();
                           //console.log(insumosTxt);
                            //console.log(categoriaInsuTxt); //217 categorias
                            //console.log(categoriaInsuTxt[0]); //217 categorias

                            $.ajax({
                                type: 'GET',
                                url: 'http://localhost:5000/data/categoria.txt',
                                dataType: 'text',
                                contentType: "text/plain; charset=UTF-8",
                                encoding: "UTF-8",
                                success: function (data) {
                                    //var expresionRegular = /||\n/;
                                    categoriaTxt=data.split('\n');
                                    //categoriaTxt.sort();
                                    //console.log(categoriaInsuTxt); //217 categorias
                                    //console.log(categoriaInsuTxt[0]); //217 categorias




                                    function mayor(lista){
                                        var mayor = lista[0];
                                        for(i=1;i<lista.length;i++){
                                            if(lista[i] > mayor)
                                                mayor=lista[i];
                                        }// END DEL FOR
                                        return mayor;
                                    }; //  function mayor(lista)


                                    for(var i=0;i<=arrayInsumos.length-1; i++) {
                                        for (var j = 0; j <=arrayInsumos.length-1; j++) {
                                            if (i != j) {
                                                if (arrayInsumos[i] == arrayInsumos[j]) {
                                                    // eliminamos su valor
                                                    arrayInsumos[i] = "";
                                                    arrayInsumos[i] = $.grep(arrayInsumos[i],function(n){
                                                        return(n);
                                                    });

                                                }
                                            }
                                        }
                                    }



                                    var msg="";
                                    var arrayResultados=[];
                                    var contador;
                                    var encontrado = -1;
                                    var arrayResul=[];

                                    //console.log(arrayInsumos);

                                    var arrayMayor=[arrayInsumos.length,insumosTxt.length,categoriaTxt.length,arrayResul.length];
                                    var mayor=mayor(arrayMayor);




                                    arrayCate=arrayCategoriasTxt;
                                    var arrayMama=arrayInsumos;//los insumos vienen de las facetas
                                    //var arrayTxt=insumosTxt; //los insumos del TXT que van a buscar o de cancer de mama
                                    var arrayTxt=arrayInsumosTxt; //los insumos del TXT que van a buscar o de cancer de mama
                                    //console.log(arrayMama);
                                    console.log(arrayInsumosTxt.length);

                                    //var count=0;

                                    for(var i=0;i<arrayMama.length;i++) {

                                        for (var j = 0; j <arrayTxt.length ; j++) {

                                            if (arrayMama[i] == arrayTxt[j]) {
                                                // eliminamos su valor
                                                arrayResul[i] = "Relacionado";
                                                //console.log(arrayMama);

                                            }
                                        }
                                        console.log(arrayResul[i]);
                                    }



                                    for(var i=0;i<arrayResul.length;i++) {
                                        if(arrayResul[i]== undefined){
                                            arrayResul[i] = "Sin Relación";
                                        }
                                    }



                                    var contador=0;

                                        //!***************************End TXT Categoria *********************************************
                                        //****************************************Imprimir Tabla********************************************************************

                                          //console.log(arrayInsumos);
                                          insumosFace(arrayInsumos);


                                        for (var j = 0; j < mayor; j++) {
                                            tabla += "<tr>";
                                            if (arrayMama[j]) {

                                                if(arrayInsumos[j]=="") {
                                                }
                                                else {
                                                    contador ++;
                                                    tabla += "<td >" + [contador] + "</td>";
                                                    tabla += "<td>" + arrayInsumos[j] + "</td>";
                                                    tabla += "<td >" + categoriaTxt[j] + "</td>";
                                                    tabla += "<td >" + insumosTxt[j] + "</td>";


                                                    arrayResultados.push(msg);
                                                    if(arrayResul[j]=="Relacionado"){
                                                        //document.body.style.backgroundColor = "red";
                                                        tabla += "<td class='bg-success'>" + arrayResul[j] + "</td>";
                                                    }
                                                    else{
                                                            arrayResul[i] = "Sin Relación";
                                                            tabla += "<td class='bg-danger'>" + arrayResul[j] + "</td>";
                                                    }


                                                }




                                            }

                                            tabla += "</tr>";
                                        }// end del for


                                        var div = document.createElement('div');
                                        div.id = "resultadosTabla1";
                                        document.getElementById("returnSinies").appendChild(div);
                                        document.getElementById("resultadosTabla1").innerHTML = tabla;

                                        if($("#tabla").height() > 249){
                                            document.getElementById("returnSinies").style.overflowY = "scroll";
                                            document.getElementById("returnSinies").style.height = "600px";

                                        }

                                    $("#Searching_Modal").modal('hide');








                                }, //End success TXT Categoria Insumos
                                error: function (err, xhr, status) {
                                    $("#Searching_Modal").modal('hide');
                                    console.log(JSON.stringify(err));
                                    //alert('Ups, Algo Paso');
                                }
                            }); //END AJAX Categoria Insumos


//!***************************End Imprimir Tabla *********************************************
//****************************************End Ajax TXT Categoria Insumos***************************************************************

                            }, //End success TXT Categoria Insumos
                            error: function (err, xhr, status) {
                            $("#Searching_Modal").modal('hide');
                            console.log(JSON.stringify(err));
                            //alert('Ups, Algo Paso');
                            }
                        }); //END AJAX Categoria Insumos

//****************************************End Ajax TXT Insumos***************************************************************
                    }, //End success TXT Insumos
                    error: function (err, xhr, status) {
                        $("#Searching_Modal").modal('hide');
                        console.log(JSON.stringify(err));
                        //alert('Ups, Algo Paso');
                    }
                }); //END AJAX TXT Insumos

//****************************************End Ajax facetas Insumos***************************************************************
        },// end success facetas Insumos
        error: function (err, xhr, status) {
            $("#Searching_Modal").modal('hide');
            console.log(JSON.stringify(err));
            //alert('Ups, Algo Paso');

        }
    }); //end AJAX Facetas Insumos

};//end function