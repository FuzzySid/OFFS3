faculty.controller('dashboardCtrl',function($scope, $location, $rootScope, userService,$localStorage) {

	$scope.user = {}

	$scope.logout = function(req,res) {
		studentDataService.logout(function(response) {
			
		})
		$location.path("/");
	}

	$scope.feedbackProcess = function() {
		$location.path("/userFeedback")
	}

	$scope.getUser = function() {
		console.log($localStorage);

		var enrollment_no = $localStorage.rollno;
		var tablename = $localStorage.userDetails.tablename;

		var table=tablename.split("_");
		$scope.college_name=table[0];

		$scope.tablename = $localStorage.userDetails.tablename;
		console.log(enrollment_no + ' ' + tablename);
		userService.getUser(enrollment_no, tablename, function(response) {
			$scope.user = response[0];
			$localStorage.userInfo = response[0];
			console.log($localStorage);
		})
	}



	$scope.getUser();
})
