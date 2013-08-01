	function onDeviceReady() {
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
			$('#slider-flip-m2').on('slidestop', function(){
				 
				var tempGeo = $(this).find('option:selected').attr('value');
				
				if(tempGeo == "off") {
					//code for off position
					$('#iFr').css('display','none');
					$('#lbGeo').html('Turn On the Geo-Location');
					$('#geoFt').listview().listview('refresh');
				}
				
				else if(tempGeo == "on") {
					//code for on position
					$('#iFr').css('display','block');
					
					$('#lbGeo').html('Current Location');
					
					function initialize() {
		  				var mapOptions = {
		    				zoom: 8,
		    				center: new google.maps.LatLng(-34.397, 150.644),
		   					mapTypeId: google.maps.MapTypeId.ROADMAP
		  				};
		  				var map = new google.maps.Map(document.getElementById('iFr'),mapOptions);
					}

					google.maps.event.addDomListener(window, 'load', initialize);

					
					$('#geoFt').listview().listview('refresh');
					
					function onSuccessGeo(position) {
						

		    			var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						map  = new google.maps.Map(document.getElementById('iFr'), {
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							center: myLocation,
							zoom: 15
		    			});
							
						var marker = new google.maps.Marker({
		    				position: map.getCenter(),
		   					map: map,
		    				title: 'Click to zoom'
		  				});
					
						navigator.geolocation.clearWatch(watchId);
						watchId=null;
					}
					 
					function onErrorGeo(error){

					}

					var watchId = navigator.geolocation.watchPosition(onSuccessGeo, onErrorGeo, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

				}


				
			});

			//compass options
			$('#slider-flip-m').on('slidestop', function(){
				
				$('#storFt').listview().listview('refresh');
				var tempVal = $(this).find('option:selected').attr('value');
				if(tempVal == "off") {
					
					$('#compass').css('display', 'none');
					$('#lbCompass').html('Turn On the Compass');
					$('#storFt').listview().listview('refresh');
					navigator.compass.clearWatch(watchID);			    	    
			    } //if ends here
			    
			    else if(tempVal == 'on') {
			    	
			    	//code for turning off compass
			    	
			    	$('#compass').css('display', 'inline');
			    	$('#lbCompass').html('Scanning ...');
			    	$('#storFt').listview().listview('refresh');

			    	function onSuccessCmp(heading) {
			    		if(heading.magneticHeading >= 11.25 && heading.magneticHeading <= 33.75) {
			    			//$('#lbCompass').attr('text', 'You are heading North-Northeast');
			    			$('#lbCompass').html('Heading North-Northeast');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 33.75 && heading.magneticHeading <= 56.25) {
			    			//alert('Heading: North-East');
			    			$('#lbCompass').html('Heading North-East');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 56.25 && heading.magneticHeading <= 78.75) {
			    			//alert('Heading: East');
			    			$('#lbCompass').html('Heading East');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 78.75 && heading.magneticHeading <= 101.25) {
			    			//alert('Heading: East-Southeast');
			    			$('#lbCompass').html('Heading East-Southeast');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 101.25 && heading.magneticHeading <= 123.55) {
			    			//alert('Heading: South-East');
			    			$('#lbCompass').html('Heading South-East');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 123.55 && heading.magneticHeading <= 146.25) {
			    			//alert('Heading: South-Southeast');
			    			$('#lbCompass').html('Heading South-Southeast');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 146.25 && heading.magneticHeading <= 168.75) {
			    			//alert('Heading: South');
			    			$('#lbCompass').html('Heading South');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 168.75 && heading.magneticHeading <= 191.25) {
			    			//alert('Heading: South-Southwest');
			    			$('#lbCompass').html('Heading South-Southwest');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 191.25 && heading.magneticHeading <= 213.75) {
			    			//alert('Heading: South-West');
			    			$('#lbCompass').html('Heading South-West');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 213.75 && heading.magneticHeading <= 236.25) {
			    			//alert('Heading: West-Southwest');
			    			$('#lbCompass').html('Heading West-Southwest');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 236.25 && heading.magneticHeading <= 258.75) {
			    			//alert('Heading: West');
			    			$('#lbCompass').html('Heading West');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 258.75 && heading.magneticHeading <= 281.25) {
			    			//alert('Heading: West-Northwest');
			    			$('#lbCompass').html('Heading West-Northwest');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 281.25 && heading.magneticHeading <= 303.75) {
			    			//alert('Heading: North-West');
			    			$('#lbCompass').html('Heading North-West');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 303.75 && heading.magneticHeading <= 326.25) {
			    			//alert('Heading: North-Northwest');
			    			$('#lbCompass').html('Heading North-Northwest');
							$('#storFt').listview().listview('refresh');
			    		}
			    		else if(heading.magneticHeading >= 326.25 && heading.magneticHeading <= 348.75) {
			    			//alert('Heading: North');
			    			$('#lbCompass').html('Heading North');
							$('#storFt').listview().listview('refresh');
			    		}
			    		var rot = 340 - heading.magneticHeading;
			    		$('#compass').css({'-webkit-transform': 'rotate('+rot+'deg)'});
			    	} //end succ. function

			    	function onErrorCmp(error) {
		   				alert('CompassError: ' + error.code);
					};

					

		        	watchID = navigator.compass.watchHeading(onSuccessCmp, onErrorCmp, { frequency: 100 });
		        		    
			    } // end flip on

				


			});

			//accelerometer options
			$('#slider-flip-m3').on('slidestop', function(){
				
				
				var tempAcc = $(this).find('option:selected').attr('value');
				
				if(tempAcc == "off") {
					navigator.accelerometer.clearWatch(watchId2);
					watchId2 = null;
					//alert("is off");
					$('.arrIcon').css('display', 'none');
					$('#lbAcc').html('Turn On the Accelerometer');
				}
				
				else if(tempAcc == "on") {

					function onSuccessAcc(acceleration) {
		    		
						if(acceleration.x < 0) {
							//alert("Phone is tilted right");
							$('.arrIcon').css('display', 'none');
							$('#arrRight').css('display', 'inline');
							$('#lbAcc').html("Phone is tilted right");
						}
						
						else if(acceleration.x > 0) {
							$('.arrIcon').css('display', 'none');
							$('#arrLeft').css('display', 'inline');
							$('#lbAcc').html("Phone is tilted left");
						}
					
		    		}

					function onErrorAcc(error) {
		    			alert('onError! '+error+'');
					}
					watchId2 = navigator.accelerometer.watchAcceleration(onSuccessAcc, onErrorAcc, {frequency:100});
				} //end flip on
				
				
			}); //end of acc
		}); //end page

	} //end onDeviceReady 
	onDeviceReady();
	document.addEventListener("deviceready", onDeviceReady, false);
