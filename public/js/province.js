(function(){

	'use strict';

	angular
		.module('formlyApp')
		.factory('province', province);

	function province() {

		function getProvinces() {
			return [
				{
					"name": "NIF",
					"value":"nif"
				},
				{
					"name":"NIE",
					"value":"nie"
				},
				{
					"name":"Pasaporte",
					"value":"pasaporte"
				}
			];
		}

		return {
			getProvinces: getProvinces
		}
	}
})();