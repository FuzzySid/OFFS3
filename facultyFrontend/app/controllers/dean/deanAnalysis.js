faculty.controller("deanAnalysisCtrl", function($scope, $rootScope, $location, facultyService) {
    

	$scope.dean = [];
	$scope.selectedYear = '2018';

	$scope.getFeedback = function() {
		console.log($rootScope);

		facultyService.getFeedback($rootScope.college.collegeCode, $scope.selectedYear, function(response) {
			$scope.deanfb = response;
			console.log($scope.deanfb);

			//get unique teachers
			$scope.teacherlist = _.chain($scope.deanfb).pluck('name').uniq().value().sort();
			$scope.subjects = _.chain($scope.deanfb).pluck('subject_name').uniq().value();
			$scope.course = _.chain($scope.deanfb).pluck('course').uniq().value();
			$scope.stream = _.chain($scope.deanfb).pluck('stream').uniq().value();
			$scope.semester = _.chain($scope.deanfb).pluck('semester').uniq().value();

			// init all selects
			$(document).ready(function () {
				$('select').material_select();
			})


		})
	}

	$scope.teacherList = function() {
		var arr = [3];
		 arr[0] = {semester: $scope.selectedSem}
		 arr[1] =  {course: $scope.selectedCourse}
		arr[2] = {stream: $scope.selectedStream}

		var teacherWithDetails = _.clone($scope.deanfb);

		for (var x =0;x<arr.length;x++) {
			var key = Object.keys(arr[x]);
			var val = key[0];
			console.log(val)
			console.log(arr[x][key[0]]);
			if (arr[x][key[0]] !=undefined){
				teacherWithDetails = _.where(teacherWithDetails, { [val]: arr[x][key[0]]  } )
			}
			 
		}

		// var teacherWithDetails = _.where($scope.deanfb, {semester:null});
		$scope.teacherlist =  _.chain(teacherWithDetails).pluck('name').uniq().value().sort();
		
		$(document).ready(function () {
			$('select').material_select();
		})
	}

	$scope.subjectLists = function() {
		var arr = [4];
		arr[0] = {semester: $scope.selectedSem}
		arr[1] = {course: $scope.selectedCourse}
		arr[2] = {stream: $scope.selectedStream}
		arr[3] = {name: $scope.selectedTeacher}
		var	subjectDetails = _.clone($scope.deanfb);
		console.log(subjectDetails);

		for (var x =0;x<arr.length;x++) {
			var key = Object.keys(arr[x]);
			var val = key[0];
			if (arr[x][key[0]] !=undefined){
				subjectDetails = _.where(subjectDetails, { [val]: arr[x][key[0]]  } )
			}
			 
		}
        console.log(subjectDetails);
		$scope.subjects =  _.chain(subjectDetails).pluck('subject_name').uniq().value().sort();

		$(document).ready(function () {
			$('select').material_select();
		})
	}



	$scope.streamList = function() {
		var course = $scope.selectedCourse;

		var StreamDetails = _.where($scope.deanfb, {course:course});
		$scope.stream =  _.chain(StreamDetails).pluck('stream').uniq().value().sort();
		
		$(document).ready(function () {
			$('select').material_select();
		})
	}



	// $scope.getSubjects = function() {
	// 	var teacher = 

	// }

	$scope.yearChange = function () {
		console.log('changed');
		$scope.getFeedback();
	}

	$rootScope.attributesList = {
		theory: [
			"Coverage of all the topics prescribed in the syllabus, with adequate depth and detail.",
			"Compliance with the number of teaching hours allotted and actual hours taught.",
			"Clarity of speech, pace of teaching, logical flows as well as continuity of thought and expression in lectures.",
			"Ability to explain the concepts clearly.",
	    	"Teaching methodology and the use of teaching aids (blackboard/power point presentation/OHP) adequately served your learning needs.",
	    	"Knowledge of the teacher in the subject.",
	    	"The extent of interaction students involvement students participation in discussing the subject matter.",
			"Encourages and makes you feel comfortable about asking questions. ",
			"Provides enthusiastic, clear and satisfactory response to students questions.",
			"Teacher generated enough interest and stimulated your intellectual curiosity.",
			"Teacher enhanced your capability to critically analyze and scrutinize scientific information.",
			"Stimulates and maintains interest and attention of students throughout the course.",
			"Because of the teacher you felt enthusiastic about studying the subject.",
			"How much enriched did you feel at the end of the course.",
			"Teaching helped you to develop an independent thinking/perspective about the subject."
		],
		practicals: [
			"The extent of direct supervision by the teacher throughout the practical.",
			"The theoretical basis technical considerations related to the experimental practical exercises were explained well.",
			"The experiments generated enough interest and helped in developing/strengthening your concepts.",
		    "Created sufficient opportunity for students to practice their skill.",
		    "Adequate time was devoted to interactive sessions to discuss analyze the results and clarify doubts of students.",
			"The teacher helped you build your capability to think and plan the experiments independently and analyze the results critically",
			"Encourages and makes you feel comfortable about asking questions.",
			"Provides enthusiastic, clear and satisfactory response to student s questions."
		]

	}

	$scope.updateSubjects = function () {

	}

	$scope.logout = function(req,res) {
		facultyService.logout(function(response) {
			
		})
		$location.path("/");
	}
	/*$scope.print = function(req,res) {
		var pdf = new jsPDF('p', 'pt', 'letter')

		       
		            , source = $('#mycanvas')[0];

		             specialElementHandlers = {
		                 // element with id of "bypass" - jQuery style selector
		                '#bypassme': function(element, renderer)
		                {
		                    // true = "handled elsewhere, bypass text extraction"
		                    return true
		                }
		            };

		            margins = {
		                top: 40,
		                bottom: 30,
		                left: 40,
		                width: '100%'
		            };
		            pdf.fromHTML
		            (
		                source // HTML string or DOM elem ref.
		              , margins.left // x coord
		              , margins.top // y coord
		              , {'width': margins.width // max width of content on PDF
		                 , 'elementHandlers': specialElementHandlers
		                }
		              , function (dispose) 
		                {
		                   // dispose: object with X, Y of the last line add to the PDF
		                   // this allow the insertion of new lines after html
		                   pdf.save('feedback.pdf');
		                }
		              , margins
		            )
	    }*/

$scope.print = function (){
	alert("PDF is getting downloaded,it may take some Time.");
     var quotes = document.getElementById('mycanvas');


             html2canvas(quotes,{scale: 2}
						 ).then(canvas => {

                 //! MAKE YOUR PDF
                 var pdf = new jsPDF('l', 'pt','a4');
                 for (var i = 0; i <= quotes.clientHeight/1300; i++) {
                     //! This is all just html2canvas stuff
                     var srcImg  = canvas;
                     var sX      = 0;
                     var sY      = 1300*i; 
                     var sWidth  = 2500;
                     var sHeight = 1300;
                     var dX      = 0;
                     var dY      = 0;
                     var dWidth  = 2500;
                     var dHeight = 1300;

                     window.onePageCanvas = document.createElement("canvas");
                     onePageCanvas.setAttribute('width', 2500);
                     onePageCanvas.setAttribute('height', 1300);
                     var ctx = onePageCanvas.getContext('2d');

                     // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                     ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                     // document.body.appendChild(canvas);
                     var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                     var width         = onePageCanvas.width;
                     var height        = onePageCanvas.clientHeight;

                     //! If we're on anything other than the first page,
                     // add another page
                     if (i > 0) {
                         pdf.addPage(843, 612); //8.5" x 11" in pts (in*72)
                        }
                     //! now we declare that we're working on that page
                     pdf.setPage(i+1);
                     //! now we add content to that page!
                     pdf.addImage(canvasDataURL, 'JPEG', 30, 40, (width*.62) - 400, (height*.62)-175);

                    }
                 //! after the for loop is finished running, we save the pdf.
                pdf.save('feedback_report.pdf');         
           });
    }


      /*


const filename  = 'ThisIsYourPDFFilename.pdf';

		html2canvas(document.querySelector('#mycanvas'), 
								{scale: quality}
						 ).then(canvas => {
			let pdf = new jsPDF('landscape');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 290, 620);
			pdf.save(filename);
		});  


      Here are the numbers (paper width and height) that I found to work. 
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
     
      var imgWidth = 300; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * (imgWidth) / canvas.width;
      var heightLeft = imgHeight; 

      var position = 0;

      doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');﻿

		}
	});
	


  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(18);
  pdf.fromHTML(document.getElementById('mycanvas'), 
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width// max width of content on PDF
    },function(dispose) {
      var totalPages  = pdf.internal.getNumberOfPages();

    for(var i = totalPages; i >= 1; i--)
    { //make this page, the current page we are currently working on.
        pdf.setPage(i);      
                      
    pdf.setFontSize(30);
    pdf.setTextColor(40);
    pdf.setFontStyle('normal');
  
    if (base64Img) {
       pdf.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);        
    }
      
    pdf.text("Report Header Template", margins.left + 50, 40 );
  
    pdf.line(3, 70, margins.width + 43,70); // horizontal line

    var str = "Page " + i + " of " + totalPages
   
    pdf.setFontSize(10);
    pdf.text(str, margins.left, pdf.internal.pageSize.height - 20);
    
}

   }
, 
    margins);
    
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  
  iframe.src = pdf.output('datauristring');
} */
       


   


    

	$scope.search  = function () {

		console.log($scope.deanfb);

		var course = $scope.selectedCourse;
		var sem = $scope.selectedSem;
		var stream = $scope.selectedStream;
		var subject = $scope.selectedSubject;
		var teacher = $scope.selectedTeacher;

		console.log(sem)
		console.log(course)
		console.log(stream)
		console.log(subject)
		console.log(teacher)
		mdict = {}
		if (teacher != null || teacher != undefined) {
				mdict['name'] = teacher
		}

		if ( course != null || course != undefined) {
			mdict['course'] = course
		}

		if ( sem != null || sem != undefined) {
			mdict['semester'] = sem
		}

		if ( stream != null || stream != undefined) {
			mdict['stream'] = stream
		}

		if ( subject != null || subject != undefined) {
			mdict['subject_name'] = subject
		}

		var final_res = _.where($scope.deanfb, mdict);

  // One Time Preprocessing

		final_res.forEach(function (val) {
			if (!_.isObject(val['at_1']) && _.isString(val['at_1'])) {


			if (val['at_15'].length!=1) {
				val.type="Theory"
			} else {
				val.type="Practical"
			}


			if(val.type=="Theory") {
				var atts = []
				for (var i = 0; i < 15; i++) {
					atts.push('at_' + (+i+1));
				}
			} else {
				var atts = []
				for (var i = 0; i < 8; i++) {
					atts.push('at_' + (+i+1));
				}
			}
		//	console.log(val)
			//console.log(atts);
				atts.forEach(function (att) {
					val[att] = val[att].split('');

					val[att].shift();

					tmp = {
						1: 0,
						2: 0,
						3: 0,
						4: 0,
						5: 0
					}
					val[att].forEach(function (v) {
						tmp[+v]++;
					});

					val[att] = tmp;
				})
			}
		});

		$scope.final_res = final_res;

	//		console.log(final_res);


	}

 $scope.getTotal = function (value) {
 	console.log(value);
 	sum = 0
 	sarr = []
 		if(value.type=='Theory') {
 			k = 15;
 			 }
 			 else {
 				k=8;

 		}

 		for (var i = 0; i < k; i++) {
 				sarr.push(value['at_' + (+i+1)]['1']*1 + value['at_' + (+i+1)]['2']*2 +
                    value['at_' + (+i+1)]['3']*3 + value['at_' + (+i+1)]['4']*4  +
                value['at_' + (+i+1)]['5']*5)
 			}

 			return sarr.reduce(function (v,a) {
 				return v+a;
 			})
 }

	$scope.getDetails = function() {
		facultyService.getDetails(function(response) {
			$scope.dean = response;
			console.log($scope.dean);
		})
	}

	$scope.getDetails();
	$scope.getFeedback();
})
