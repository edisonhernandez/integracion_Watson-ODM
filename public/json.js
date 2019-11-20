 

var general_EquipoElectronico=[]

function arrayParticulares(array_EquipoElectronico) {

    general_EquipoElectronico=array_EquipoElectronico
}

function orden_general(text,arrayWS,array_EquipoElectronico,broker_Pt) {


    var array_EquipoEquipoElectronico_vacio=[]

    contruir_json(text,arrayWS,array_EquipoElectronico,array_EquipoEquipoElectronico_vacio,broker_Pt)

}



function orden_broker(texto,arrayWS,arraywatsonBroker,WatsonBrokerEquipoElectronico,broker_PtaSo) {

    contruir_json(texto,arrayWS,general_EquipoElectronico,WatsonBrokerEquipoElectronico,broker_PtaSo)

}



function contruir_json(texto,watsonResul,Watson_EquipoElectronico,WatsonBroker_EquipoElectronico,broker_Nombre){

    //console.log(texto)
    //console.log(watsonResul)
    //console.log(odmResul)
    //watsonResul.push("Tasa -"+tasa_watson);
    //watsonResul.push("SumaAsegurada - "+tasa_reglas);

    var Json_Salida={
        "texto":texto,

        "Result_Equipo_Electronico":Watson_EquipoElectronico,
        "Broker":{
            "Nombre":broker_Nombre,
            "Result_Equipo_Electronico":WatsonBroker_EquipoElectronico

        }
    }



    var Json_Real_Salida=JSON.stringify(Json_Salida,null,2);


    //resultadoWatson(Json_Real_Salida);

    console.log(Json_Real_Salida)


}