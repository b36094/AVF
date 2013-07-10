// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template


//#homePage starts here
$(document).on('pagebeforeshow', '#homePage', function(){
	
	//Checks to see if the localStorage is empty
	if (localStorage.length == 0) {
		
		//If is empty asks the user to add pre-loaded entries
		confirm("Local Storage is empty. Do you want to load default data?");
		
		//Ajax call 
		if (confirm) {
			$.ajax ({
				url: "xhr/JSONFile.json",
				type: "GET",
				datatype: "json",
				success: function(response) {
					
					console.log(response);
					
					alert ("Success! I loaded some data for you.");
					
				}
			});
		
		}
	}
	
	else {
		//call outputData function
		outputData();
	
		//Gets the id of <li> and displays it into an alert
		$('#ulListView').off('click', 'li').on('click', 'li', function(){
		
			//call displayDetails function with the obj.that was clicked on as argument
			displayDetails(this);
			
		});
	}
	
	
	
	
});//here ends #homePage

$(document).on('pageinit', '#homePage', function(){

});

//#newsFeed starts here
$(document).on('pageinit', '#newsFeed', function(){
	
});//here ends #newsFeed

//#aboutPage starts here
$(document).on('pageinit', '#aboutPage', function(){
	
});//here ends #aboutPage

//#detailsPage starts here
$(document).on('pageinit', '#detailsPage', function(){
	$('#ulTop').listview().listview('refresh');
	var idToPass = this.id;
	console.log(idToPass);
	//target the deleteButton
	$('.delBtn').click(function(){
		
		/*on-click calls deleteEntry function that takes the object's id 
		and delete the localStorage entry with the same key value*/
		deleteEntry(this.id);
		
		window.location = "#homePage";
	});
	
	//target the editButton
	$('.editBtn').click(function(){
		
		/*on-click calls editObject function that takes the object's id
		and inserts some of the object's properties into the newEntry page*/
		editObject(this.id);
	});

});//here ends #detailsPage

//#newEntryPage starts here
$(document).on('pageinit', '#newEntry', function(){
	
	//function to parse the form
	var $myFirstForm = $('#firstForm');
	
	//access the validation property (plugging)
	$myFirstForm.validate({
		//ignores the items that have the class "ignore" on them			
		ignore: ".ignore",
		invalidHandler: function() {},		
		submitHandler: function(randomId){
		
			//serialize the form data into an object 
			var data = $myFirstForm.serializeArray();
			
			//stringify the data from the form object
			var jsonObj = JSON.stringify(data);
			
			/*implement a switch based on this being the edit pass or the newEntry pass
			target the submitBt's value to check which one it is 
			*--> if is Submit generate a new key else overwrite the same key for edit*/
			if($('#submitBt').val() === "Submit") {
			
				//add a random number for the key
				var randomId = genRandomId();
			
				//add the string conversion to the localStorage with a key-value
				localStorage.setItem(randomId,jsonObj);
			
				//reset the form after localStorage insertion
				$($myFirstForm)[0].reset();
			
				//refresh localStorage
				window.location = '#homePage';
			}
			
			else {
				
				var randomId2 = $('#submitBt').data('key');
				
				console.log(randomId2);
				//add the string conversion to the localStorage with the same key
				localStorage.setItem(randomId2,jsonObj);
				
				//reset the form after localStorage insertion
				$($myFirstForm)[0].reset();
				
				//refresh localStorage
				window.location = '#homePage';
			}
				
		}
	}); //here ends the validation function
	
	//Refresh the '#homePage' to display all the local store changes
		
	
	
});//here ends #newEntryPage



//genRandomId function creates a random number and returns it to be caught by the validator 
var genRandomId = function(){
	var randomId = Math.floor(Math.random() * 10000001);
	return randomId;
};

//dsplayData function outputs the localStorage on the '#homePage'
var outputData = function(){
	//1. Get the lenght of the localStorage
	var localStL = localStorage.length;
	
	//2. Clean container
	$('#container').empty();
	
	//3. Create a <ul> filter that holds all the <li>
	var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
	
	//4. Loop through the length of localStorage
	for(var i = 0, j = localStL; i < j; i ++) {

		//4.1. Get key-value pare
		var storedKey = localStorage.key(i); //get the key to refference for the value
		var storedObj = localStorage.getItem(storedKey); //get the value under the specified key

		//4.2. Parse data back into an obj. to be able to access properties.
		var parsedObj = JSON.parse(storedObj);

		//4.3. Add the id property to parsedObj for future refference
		parsedObj.id = storedKey;

		//4.4. Create a <li> tag that holds the localStorage object
		var insideLi = $('#ulListView').append('<li id = "'+parsedObj.id+'" data-entryname ="'+parsedObj[1].value+'" data-mediatype ="'+parsedObj[0].value+'" data-genre ="'+parsedObj[2].value+'" data-length = "'+parsedObj[3].value+'" data-rldate = "'+parsedObj[4].value+'" data-prdate = "'+parsedObj[5].value+'" data-notes = "'+parsedObj[6].value+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(parsedObj[0].value)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+parsedObj[1].value+'</strong></p></span><p class = "ui-li-aside">'+parsedObj[0].value+'</p></a></li>');

		//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
		insideLi.listview().listview('refresh');

		//4.5. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]

		//4.6. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).

	} //the for loops ends here

};

/*filterImage is in charge of figuring out what type of image we display in the <li>. 
  It returns a file name based on the obj. parameter it receives*/
var filterImage = function(input) {
	//1. if the input is audio output smAudio.png
	if (input.indexOf("Audio") == 0) {
		
		return "smAudio.png";
	}
	else if(input.indexOf("Video") == 0) {
	
		return "smVideo.png";
	}
	else if(input.indexOf("Data") == 0) {
		
		return "smData.png";
	}
	else if(input.indexOf("eBook") == 0) {
		
		return "smBook.png";
	}
	else if(input.indexOf("eDoc") == 0) {
		
		return "smDocument.png";
	}
	else if(input.indexOf("MemoryStick") == 0) {
		
		return "smMemoryStick.png";
	}
	
};

/*displayDetails function*/
var displayDetails = function (obj) {
	$('.delBtn').attr('id', obj.id);
	$('.editBtn').attr('id', obj.id);
	$('#contentSpace').empty();
	var ulTop = $('#contentSpace').append('<ul data-role = "listview" data-inset = "true" id = "ulTop"></ul>');
	var devider = $('#ulTop').append('<li data-role = "devider" data-theme = "b"><h2>Name: &nbsp;'+$(obj).attr('data-entryname')+'</h2></li>');
	var lsMediaType = $('#ulTop').append('<li><p><strong>Media Type:</strong><span class = "ui-li-aside">'+$(obj).attr('data-mediatype')+'</span></p></li>');
	var lsMediaGenre = $('#ulTop').append('<li><p><strong>Genre/Type:</strong><span class = "ui-li-aside">'+$(obj).attr('data-genre')+'</span></p></li>');
	var lsMediaLength = $('#ulTop').append('<li><p><strong>Length:</strong><span class = "ui-li-aside">'+$(obj).attr('data-length')+'</span></p></li>');
	var lsMediaRelease = $('#ulTop').append('<li><p><strong>Release Date:</strong><span class = "ui-li-aside">'+$(obj).attr('data-rldate')+'</span></p></li>');
	var lsMediaPurchase = $('#ulTop').append('<li><p><strong>Purchase Date:</strong><span class = "ui-li-aside">'+$(obj).attr('data-prdate')+'</span></p></li>');
	var lsMediaNotes = $('#ulTop').append('<li><p><strong>Notes:</strong><span class = "ui-li-aside">'+$(obj).attr('data-notes')+'</span></p></li>');
};

/*deleteEntry function */
var deleteEntry = function(obj) {
	var confirmation = confirm("Are you sure?");
	if(confirmation) {
		localStorage.removeItem(obj);
	}
	
	else {
		return;
	}
};

/*editObject function goes here*/
var editObject = function(keyObj) {
	
	window.location = '#newEntry';
	
	//Target the submitBt and change its value to Edit
	$('#submitBt').attr('value', 'Edit');
	
	//Add the attr key to the editBtn
	$('#submitBt').data('key', keyObj);
	
	//Get the value under the specified key
	var storedEditObj = localStorage.getItem(keyObj); 
	
	//Parse data back into an obj. to be able to access properties.
	var parsedEditObj = JSON.parse(storedEditObj);
	
	//Add data into nameItem form in '#newEntry' page
	 $('#nameItem').attr("value", parsedEditObj[1].value);
	 
	//Add data into #genreItem 
	 $('#genreItem').attr("value", parsedEditObj[2].value);
	 
	 //Add data into #lengthItem 
	 $('#lengthItem').attr("value", parsedEditObj[3].value);
	 
	 //Add data into #pubLength 
	 $('#pubDate').attr("value", parsedEditObj[4].value);
	 
	 //Add data into #purchaseDate
	 $('#purchaseDate').attr("value", parsedEditObj[5].value);
	 
	 //Add data into #notes
	 $('textarea[id = notes]').val(parsedEditObj[6].value);
	 
	 //Gets the medidType value of the parsed object and forces the dropdown 
	 //menu (from the edit page) to display the same mediaType, when editing an obj.
	 var mediaOption = parsedEditObj[0].value;
	 $('#mediaChoice').val(mediaOption);
};



