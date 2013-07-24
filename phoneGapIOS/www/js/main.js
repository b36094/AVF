//mainPage starts here
$(document).on('pageinit', '#mainPage', function(){
	
	$(function() {
		var url1 = "https://api.instagram.com/v1/tags/car/media/recent?callback=?&amp;client_id=7a7120bdcd664840a3ec1d43313ff8bc&amp;min_id=10";
		$.getJSON(url1, {
			tagmode: "any",
			format: "json"
		})
		.done(function(myData1) {
			console.log(myData1);
			
			$.each(myData1.data, function(i,item) {
				var puf1 = '<li><a href="#" data-rel="dialog" data-transition="pop"><img src="'+myData1.data[i].images.thumbnail.url+'"><h2>'+myData1.data[i].user.full_name+'</h2><p>'+myData1.data[i].user.id+'</p></a></li>';

				$("#instColl").append(puf1);

				//refresh ulListView
				$('#instColl').listview().listview('refresh');
			});
		});

	}); //end function

	$(function() {
		
		$.ajax({
			url:"https://nactusberrilli.cloudant.com/hml/_all_docs",
			dataType:"jsonp",
			type: "GET",
			crossDomain:true,
			succes: function(myData2) {
				
			},
			error: function() {alert("Error");},

		})
		.done(function(myData2) {

			console.log(myData2);
			$.each(myData2.rows, function(i,item) {
				//var pObj = $.parseJSON(myData2);
				var puf2 = '<li><a href="#" data-rel="dialog" data-transition="pop"><img src="images/arrowDown.png"><h2>'+myData2.rows[i].id+'</h2><p>From Coudant</p></a></li>';
			
				$("#grColl").append(puf2);
				$("#grColl").listview().listview('refresh');
			});
		});
		

	}); //end function
	

	//camera options
	$('#camBtn').click(function(){
		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.DATA_URL});

		function onSuccess(imageData) {
    		var camImage = document.getElementById('myImage');
    		camImage.src = "data:image/jpeg;base64," + imageData;
    		$('#iFr').append(imageData);
    		
		}

		function onFail(message) {
    		alert('Failed because: ' + message);
		}

	});

	//geolocaltion options
	$('#geoBtn').click(function(){
		 
		var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
		};

		// onError Callback receives a PositionError object
	
		function onError(error) {
    		alert('code: '    + error.code    + '\n' +
         	 	'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000,
			timeout: 5000, enableHighAccuracy: true});
	});

	//compas options
	$('#compBtn').click(function(){
		function onSuccess(heading) {
    		if(heading.magneticHeading >= 11.25 && heading.magneticHeading <= 33.75) {
    			alert('Heading: North-northeast');
    		}
    		else if(heading.magneticHeading >= 33.75 && heading.magneticHeading <= 56.25) {
    			alert('Heading: North-East');
    		}
    		else if(heading.magneticHeading >= 56.25 && heading.magneticHeading <= 78.75) {
    			alert('Heading: East');
    		}
    		else if(heading.magneticHeading >= 78.75 && heading.magneticHeading <= 101.25) {
    			alert('Heading: East-Southeast');
    		}
    		else if(heading.magneticHeading >= 101.25 && heading.magneticHeading <= 123.55) {
    			alert('Heading: South-East');
    		}
    		else if(heading.magneticHeading >= 123.55 && heading.magneticHeading <= 146.25) {
    			alert('Heading: South-Southeast');
    		}
    		else if(heading.magneticHeading >= 146.25 && heading.magneticHeading <= 168.75) {
    			alert('Heading: South');
    		}
    		else if(heading.magneticHeading >= 168.75 && heading.magneticHeading <= 191.25) {
    			alert('Heading: South-Southwest');
    		}
    		else if(heading.magneticHeading >= 191.25 && heading.magneticHeading <= 213.75) {
    			alert('Heading: South-West');
    		}
    		else if(heading.magneticHeading >= 213.75 && heading.magneticHeading <= 236.25) {
    			alert('Heading: West-Southwest');
    		}
    		else if(heading.magneticHeading >= 236.25 && heading.magneticHeading <= 258.75) {
    			alert('Heading: West');
    		}
    		else if(heading.magneticHeading >= 258.75 && heading.magneticHeading <= 281.25) {
    			alert('Heading: West-Northwest');
    		}
    		else if(heading.magneticHeading >= 281.25 && heading.magneticHeading <= 303.75) {
    			alert('Heading: North-West');
    		}
    		else if(heading.magneticHeading >= 303.75 && heading.magneticHeading <= 326.25) {
    			alert('Heading: North-Northwest');
    		}
    		else if(heading.magneticHeading >= 326.25 && heading.magneticHeading <= 348.75) {
    			alert('Heading: North');
    		}
		};

		function onError(error) {
   			alert('CompassError: ' + error.code);
		};

		navigator.compass.getCurrentHeading(onSuccess, onError);
	});

	//accelerometer options
	$('#accBtn').click(function() {
		function onSuccess(acceleration) {
    		
			if(acceleration.x < 0) {
				alert("Phone is tilted right");
			}
			else if(acceleration.x > 0) {
				alert("Phone is tilted left");

			}
			
    		alert('Acceleration X: ' + acceleration.x + '\n' +
          		  'Acceleration Y: ' + acceleration.y + '\n' +
          		  'Acceleration Z: ' + acceleration.z + '\n' +
                  'Timestamp: '      + acceleration.timestamp + '\n');
		};

		function onError() {
    		alert('onError!');
		};

		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	});
}); //end page


