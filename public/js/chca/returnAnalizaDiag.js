/**
 * Created by SOA on 03/10/2017.
 */


function analizaDiag() {
    return  '<div class="container-fluid">' +
            ' <div class="row">' +
            '   <div class="col-lg-12">' +
            '     <h1 class="page-header">Soluciones cognitivas</h1>' +
            '   </div>' +
            '   <!-- /.col-lg-12 -->' +
            ' </div>' +
            ' <!-- /.row -->' +
            ' <div class="row">' +
            '  <div class="col-lg-12">' +
            '   <div class="panel panel-primary">' +
            '     <div class="panel-heading">' +
            '       Descripcion' +
            '     </div>' +
            '     <div class="panel-body">' +
            '       <textarea id="txtTarea" cols="80" rows="10" class="form-control"></textarea>' +
            '     </div>' +
            '     <div class="panel-footer">' +
            '       <button class="btn btn-primary" ng-click="getDiagnostic()">Analizar</button>' +
            '     </div> ' +
            '   </div>' +
            '  </div> '+
            '  <div class="col-lg-12">' +
            '   <div class="panel panel-primary">' +
            '    <div class="panel-heading">' +
            '     Diagnóstico' +
            '    </div>' +
            '    <div class="panel-body">' +
            '     <div class="row">' +
            '      <div class="form-group col-md-4">' +
            '           <label>Código</label>' +
            '           <input class="form-control" placeholder="Código" ng-model="diagnostic.code">' +
            '      </div>' +
            '      <div class="form-group col-md-4">' +
            '           <label>Descripción</label>' +
            '           <input class="form-control" placeholder="Descripción" ng-model="diagnostic.description">' +
            '      </div>' +
            '     </div>' +
            '    </div>' +
            '   </div>' +
            '  </div>' +
            ' </div>' +
            '</div>';

};