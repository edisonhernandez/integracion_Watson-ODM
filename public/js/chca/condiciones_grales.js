/**
 * Created by SOA on 09/10/2017.
 */




function condiciones_grales(nameProduct,diagCobertura){

    console.log("Nombre de Producto: "+nameProduct,'\nDescripción Cobertura: '+diagCobertura);
    //var nombreProducto=["CNSF–S0048-0081-2012","CNSF–S0048-0081-2012","CNSF–S0048-0081-2012"];
    //var descripcionCober=["Padecimientos Congénitos","anorexia","Enfermedades dentales"];

    var nombreProducto="CNSF–S0048-0081-2012";
    var descripcionCober="Padecimientos Congénitos";

    /*var url=['http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica"}&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto[0]+'.pdf"))AND(keyword::/"cobertura_basica"/"Cobertura basica"/"'+descripcionCober[0]+'")',
            'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica_excluida"}&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto[1]+'.pdf")) AND (keyword::/"cobertura_basica"/"Cobertura basica excluida"/"'+descripcionCober[1]+'")',
            'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.exclusiones%22%7D&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto[2]+'.pdf")) AND (keyword::/"Exclusiones"/"'+descripcionCober[2]+'")'
            ];*/


    var url=['http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica"}&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto+'.pdf"))AND(keyword::/"cobertura_basica"/"Cobertura basica"/"'+descripcionCober+'")',
        'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica_excluida"}&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto+'.pdf")) AND (keyword::/"cobertura_basica"/"Cobertura basica excluida"/"'+descripcionCober+'")',
        'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.exclusiones%22%7D&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"'+nombreProducto+'.pdf")) AND (keyword::/"Exclusiones"/"'+descripcionCober+'")'
    ];


    for(var p=0; p<url.length; p++){
        $.ajax({
            //url: 'http://proyectosoa.sytes.net:8393/api/v10/analysis/text?collection='+colecciones[p]+'&output=application/javascript',
            //url: hostWatson+'search?collection=AXA_Condiciones_Generales&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.cobertura_basica.cobertura_basica%22%7D&output=application/json&query=((*:*) AND (keyword::/"Nombre de Producto"/"CNSF–S0048-0081-2012.pdf")) AND (keyword::/"cobertura_basica"/"Cobertura basica"/"Padecimientos Congénitos")',
            //url:'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica"}&output=application/json&query=((*:*) AND (keyword::/"Nombre de Producto"/"CNSF–S0048-0081-2012.pdf")) AND (keyword::/"cobertura_basica"/"Cobertura basica"/"Padecimientos Congénitos")',
            //url:'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={%22namespace%22:%22keyword%22,%22id%22:%22$.cobertura_basica.cobertura_basica%22}&output=application/javascript&query=((*:*)%20AND%20(keyword::/%22Nombre%20de%20Producto%22/%22CNSF%E2%80%93S0048-0081-2012.pdf%22))%20AND%20(keyword::/%22cobertura_basica%22/%22cobertura_basica%22/%22Padecimientos%20Cong%C3%A9nitos%22)',
            //url:'http://proyectosoa.sytes.net:8393/api/v10/search?collection=AXA_Condiciones_Generales&facet={"namespace":"keyword","id":"$.cobertura_basica.cobertura_basica"}&output=application/javascript&query=((*:*) AND (keyword::/"Nombre de Producto"/"CNSF–S0048-0081-2012.pdf")) AND (keyword::/"Cobertura_basica"/"cobertura_basica"/"Padecimientos Congénitos")',
            url:url[p],
            type:'POST',
            //data:{"text":codeCie10},
            contenType:"application/javascript",
            dataType : "jsonp",


            success: function(response){

                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
               // console.log(jsonParse);
                var ibmsc_facet=jsonParse['es_apiResponse']['ibmsc_facet'];

                //console.log(textfacets.length);
                if(ibmsc_facet){
                    var label=ibmsc_facet['label'];
                      // console.log(label);

                }//end if
                /*else{
                    alert("No se encontro el nodo ['es_apiResponse']['ibmsc_facet'] en el JSON");
                }*/

            },// end success function
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');
            }
        }); //end AJAX
    }//end for facetas
}