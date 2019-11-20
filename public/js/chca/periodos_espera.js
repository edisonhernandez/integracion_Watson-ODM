/**
 * Created by SOA on 09/10/2017.
 */
/**
 * Created by SOA on 09/10/2017.
 */




function periodos_espera(nameProduct,diagCobertura){

    console.log("Nombre de Producto: "+nameProduct,'\nDescripción Cobertura: '+diagCobertura);
    //var nombreProducto=["CNSF–S0048-0081-2012","CNSF–S0048-0081-2012","CNSF–S0048-0081-2012"];
    //var descripcionCober=["Padecimientos Congénitos","anorexia","Enfermedades dentales"];

    var nombreProducto2="CNSF–S0048-0204-2015";
    var descripcionCober2="Cáncer en glándulas mamarias";

    var url=['http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales_Periodos_de_Espera&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.periodos_de_espera.periodos_de_espera%22%7D&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto2+'.pdf")) AND (keyword::/"periodos_de_espera"/"Periodos de Espera"/"'+descripcionCober2+'")',
        'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales_Periodos_de_Espera&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.periodos_de_espera.periodos_de_espera_sin_cobertura%22%7D&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto2+'.pdf")) AND (keyword::/"periodos_de_espera"/"Periodos de Espera sin Cobertura"/"'+descripcionCober2+'")'
    ];


    for(var p=0; p<url.length; p++){
        $.ajax({
            url:url[p],
            type:'POST',
            //data:{"text":codeCie10},
            contenType:"application/javascript",
            dataType : "jsonp",

            success: function(response){

                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                console.log(jsonParse);
                var ibmsc_facet=jsonParse['es_apiResponse']['ibmsc_facet'];


                //console.log(textfacets.length);
                if(ibmsc_facet){
                    sumary=jsonParse['es_apiResponse']['es_result']['es_summary'];
                    //console.log(sumary);

                    var label=ibmsc_facet['label'];
                    console.log(label);
                    if(label=="Periodos de Espera sin Cobertura"){
                        periodoEspera=label;
                        //alert("Periodos de Espera sin Cobertura");
                    }
                    else if(label=="Periodos de Espera"){
                        periodoEspera=label;
                        //alert("Periodos de Espera ");
                    }
                    else{
                        //alert("");
                    }

                }//end if
                // else{
                //     alert("No se encontro el nodo ['es_apiResponse']['ibmsc_facet'] en el JSON carlos");
                // }

            },// end success function
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');
            }
        }); //end AJAX
    }//end for facetas
}