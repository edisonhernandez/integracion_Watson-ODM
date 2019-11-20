

(function() {

	'use strict';

	angular
		.module('formlyApp')
		.controller('MainController', MainController)
		.config(function(IdleProvider, KeepaliveProvider) {
        // configure Idle settings
        IdleProvider.idle(1); // in seconds el tiempo
        IdleProvider.timeout(1); // in seconds
        KeepaliveProvider.interval(1); // in seconds
    })
    .run(function(Idle){
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });



		function MainController($http, $scope, $sce, province, $rootScope, Idle) {

			var vm = this;
			$scope.loading = false;
			$scope.ready = false;
			vm.onSubmit = onSubmit;
			vm.callOpenChat = callOpenChat;
			vm.changeSectionName = changeSectionName;
			vm.startWatchIdle = startWatchIdle;
			//vm.Prueba = onSubmit;


			//$scope.detailFrame = $sce.trustAsResourceUrl("https://localhost:8443/repomanager");
			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.datos = {};



			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.datosFields = [
			
				{
					key: 'name',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'Nombre',
						placeholder: 'Nombre',
						required: true,
				
					}
				},
				{
					key: 'lastname',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'Apellidos',
						placeholder: 'Apellidos',
						required: true
					}
				},
				{
					key: 'email',
					type: 'input',
					templateOptions: {
						type: 'email',
						label: 'Email',
						placeholder: 'Email',
						required: true
					}
				},
				{
					key: 'cellphone',
					type: 'input',
					templateOptions: {
						type: 'phone',
						label: 'Celular',
						placeholder: 'Celular',
						required: true
					}
				},
				/*{
					key: 'mayor18',
					type: 'checkbox',
					templateOptions: {
						label: 'Tienes 18 años o más?',
					},
					// Hide this field if we don't have
					// any valid input in the email field
					hideExpression: '!model.email'
				},*/
				
				/*{
					key: 'province',
					type: 'select',
					templateOptions: {
						label: 'Tipo de documento',
						// Call our province service to get a list
						// of provinces and territories
						options: province.getProvinces()		        
					},
					hideExpression: '!model.email'
				},*/
				{
					key: 'nif',
					type: 'input',
					templateOptions: {
						label: 'INE',
						placeholder: 'Documento de identidad',
						required: true
					},
					//hideExpression: '!model.province',
					validators: {
						// Custom validator to check whether the driver's license
						// number that the user enters is valid or not
		          		driversLicense: function($viewValue, $modelValue, scope) {
		          			var value = $modelValue || $viewValue;
		          			if(value) {
		          				// call the validateDriversLicense function
		          				// which either returns true or false
		          				// depending on whether the entry is valid
		          				return validateDriversLicence(value)
		          			}
		          		}
		          	},
		          	/*expressionProperties: {
		          		// We currently only have a driver's license pattern for Ontario
		          		// so we need to disable this field if we've picked a province/territory
		          		// other than Ontario
		          		'templateOptions.disabled': function($viewValue, $modelValue, scope) {
		          			if(scope.model.province === 'nif') {
		          				return false;
		          			}
		          			return true;
		          		}
		          	}*/
				},
				{
					key: 'insurance',
					type: 'input',
					templateOptions: {
						label: 'Insurance Policy Number',
						placeholder: 'Enter your insurance policy number'
					},
					hideExpression: '!model.under25 || !model.province',
				},


			];

			// Tests the input based on a helpful regular expression
			// gratefully borrowed from jQuery.formance by Omar Shammas
			// https://github.com/omarshammas/jquery.formance
			function validateDriversLicence(value) {
				//return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
				return true;
			}



			function onSubmit() {



				console.log(JSON.stringify(vm.datos, null, 4));
				
				var token="";

				$http({
					method: 'GET',

					//url: 'https://demos3.galeonsoftware.com/repomanager/services/repository/version',
					url: 'https://cmcmexico.galeonsoftware.com/repomanager/services/repository/version'
				}).then(function(successResponse) {
					console.log( successResponse.data.version);
				}).catch(function(response) {
                    if(response.status === 403)
                        errorLogin = true;
                    console.log("Error version " + response.status);

				});


				var objectToSend = new FormData();
				var operationData ={};
		
				//operationData.opClass = 593;
				//operationData.domainid = 107;

				operationData.opClass = 241;
				operationData.domainid = 60;
				var ds = (new Date()).toISOString().replace(/[^0-9]/g, "");
				
				operationData.operationid = "XX" + ds;
				console.log(operationData.operationid);

				var files =[];
				var staticDocNames ="[{\"block\":1,\"code\":\"STATIC PLANTILLAHazteCliente\",\"description\":\"Plantilla\",\"mandatory\":1,\"name\":\"Plantilla Hazte Cliente\",\"order\":1,\"signmultiple\":0,\"signorupload\":0,\"transferible\":0,\"uploadMandatory\":1,\"visiblesign\":1}]";

				var boxLabels ="[]";
				objectToSend.append('staticDocNames', "[]");
				objectToSend.append('documentsdata', staticDocNames);
				var operationDataToSend = angular.copy(operationData);

				objectToSend.append('operationdata', JSON.stringify(operationDataToSend));

				var levelArray = [];
				var oneLevel = {};
				var signers=[];

				var signer = {};
				signer.data = vm.datos;
				signer.data.operationType= "WEB";
				var signatureTypes = [];
				//signatureTypes.push( "SIMPLE");
				//signatureTypes.push( "VIDEOCONFERENCIA");
				signatureTypes.push( "AVANZADA_VIDEO_1PASO");
        //signatureTypes.push( "AVANZADA_VIDEO");

				signer.signaturetypes = signatureTypes;
				signer.boxLabels= boxLabels;
				signers.push(signer);
				oneLevel.order = 1;
				oneLevel.signers = signers;
				
				levelArray.push(oneLevel);
				//alert(JSON.stringify(levelArray), null, 2);


				files[0] = new File(["STATIC PLANTILLAHazteCliente"], "STATIC PLANTILLAHazteCliente");
		 		angular.forEach(files, function(file){
					 objectToSend.append('file', file);
				});
		 		objectToSend.append("signersdata", JSON.stringify(levelArray));
				
				var usertoLogin = {};
                var errorLogin = false;
				usertoLogin.username = 'crivas60';
				var pwdHashed = CryptoJS.SHA256("Carlos123");
				var pwdHashedB64= pwdHashed.toString(CryptoJS.enc.Base64);
				usertoLogin.userpassword = pwdHashedB64;

				$scope.loading = true;
				$http({
					method: 'POST',
					url: 'https://cmcmexico.galeonsoftware.com/repomanager/services/repository/login',
					data: JSON.stringify(usertoLogin),
					headers: {
						'Content-Type': "application/json"
					}
				}).then(function successCallback(response) {

					token = response.data;
					console.log(token);




					$http({
						method: 'POST',
						url: 'https://cmcmexico.galeonsoftware.com/repomanager/services/operations/newoperationmultilevel/60',
						data: objectToSend,
						headers: {
							'Content-Type': undefined,
                            'Authorization': 'Bearer ' +  token
						},
                        transformRequest: angular.identity,
                        params: {
                            objectToSend
                        }
					}).then(function successCallback(response) {
						
						var uuid = response.data.firstuuid;
						//$scope.loading = true;
						console.log(uuid);
						$scope.detailFrame = $sce.trustAsResourceUrl("https://cmcmexico.galeonsoftware.com/ESign/esignservices/esign/signop/"+uuid+"/" + uuid );
						$scope.ready = true;
						console.log(".....");
						$scope.loading = false;

					}, function errorCallback(response) {
						$scope.loading = false;
						if(response.status === 403)
						    errorLogin = true;
                        console.log("Error  newop " + response.status);
					});



				}, function errorCallback(response) {
                    if(response.status === 403)
                        errorLogin = true;
                    console.log("Error login " + response.status);
				});			

			}

			function callOpenChat() {

					$scope.product = 'Scotia Travel'
        			$scope.username = 'Usuario'


        			$scope.section_name = $scope.section_name == undefined ? 'Plazo' : $scope.section_name
        			//Versión abreviada de if Si se cumple la condición toma el valor que hay entre el signo de interrogación y los dos puntos, si no se cumple, toma el valor que hay a continuación de los dos puntos.
        			$scope.product_name = 'Crédito personal'

        			$rootScope.$broadcast('initConversation',{
        				message: 'conversation_start',
        				username: $scope.username,
        				product_name: $scope.product_name,
        				section_name: $scope.section_name
        			})
			}

			function changeSectionName(section_name) {
				$scope.section_name = section_name
			}

			function startWatchIdle() {
				Idle.watch();
			}

			$scope.$on('IdleStart', function() {
	            callOpenChat()	            
	        });

	        $scope.$on('IdleWarn', function(e, countdown) {
	            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
	            // the countdown arg is the number of seconds remaining until then.
	            // you can change the title or display a warning dialog from here.
	            // you can let them resume their session by calling Idle.watch()
	        });

	        $scope.$on('IdleTimeout', function() {
	        	//console.info('timeout')
	        	//Idle.watch();
	        	//Idle.watch();
	            // the user has timed out (meaning idleDuration + timeout has passed without any activity)
	            // this is where you'd log them
	        });

	        $scope.$on('IdleEnd', function() {
	        	//console.info('acaba la inactividad')
	        	//sIdle.watch();
	            // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
	        });

	        $scope.$on('Keepalive', function() {
	            // do something to keep the user's session alive
	        });

		}


})();