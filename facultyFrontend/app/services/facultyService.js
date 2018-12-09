faculty.factory('facultyService', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
	return {
		send_details : function(college, user, callback) {
			$http({
				method: "POST",
				url: BACKEND + '/dinitials',
				params: {
					college_name: college,
					dean_id: user.rollno,
					password: user.password
				}

			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(response.data);
				}
			})
		},
logout : function(){
		 	$http({
		 		method:"GET",
		 		url: BACKEND + "/dlogout",
		 	}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(data);
				}
			})
		},
		getDetails: function(callback) {
			$http({
				method: "GET",
				url: BACKEND + "/dchecksession",
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(data);
				}
			})
		},

		getFeedback: function(college, year, callback) {
			$http({
				method: "GET",
				url: BACKEND + "/ddashboard",
				params: {
					year: year,
					college_name: college
				}
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(data);
				}
			})
		},
 	}
}]);
