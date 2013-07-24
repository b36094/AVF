// Name: Andrei Birsan
// Course month: 07.2013
// File Purpose: Basic Start-up Template


//#homePage starts here
$(document).on('pagebeforeshow', '#homePage', function(){



	//call outputData function
	outputData();

	//refresh ulListView
	$('#ulListView').listview().listview('refresh');		


	//Gets the id of <li> and displays it into an alert
	$('#ulListView').off('click', 'li').on('click', 'li', function(){
		
		//re-construct the object to get the data-rev out
		console.log(this);
		var obj = {};
    	obj.id = [$(this).attr('id')];
    	obj.rev = [$(this).data('rev')];
    	obj.mediaChoice = [$(this).data('mediatype')];
    	obj.nameItem = [$(this).data('entryname')];
    	obj.genreItem = [$(this).data('genre')];
    	obj.lengthItem = [$(this).data('length')];
    	obj.rlDate = [$(this).data('rldate')];
    	obj.prDate = [$(this).data('prdate')];
    	obj.notes = [$(this).data('notes')];
    	 
		
			
		
		
		//call displayDetails function with the obj.that was clicked on as argument
		displayDetails(this, obj.id, obj.rev, obj.mediaChoice, obj.nameItem, obj.genreItem, obj.lengthItem, obj.rlDate, obj.prDate, obj.notes);

	});




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

	//target the deleteButton
	$('.delBtn').click(function(){

		/*on-click calls deleteEntry function that takes the object's id 
		and delete the localStorage entry with the same key value*/
		deleteEntry(this);

		window.location = "#homePage";
	});

	//target the editButton
	$('.editBtn').click(function(){
		
		//catch obj. of <this> to pass values into another function
		var brObj = {};
		brObj.rev = [$(this).attr('rev')];
		brObj.id = [$(this).attr('id')];
		brObj.media = [$(this).attr('mediaChoice')];
		brObj.nameItem = [$(this).attr('nameitem')];
		brObj.genreItem = [$(this).attr('genreitem')];
		brObj.lengthItem = [$(this).attr('lengthItem')];
		brObj.rlDate = [$(this).attr('rldate')];
		brObj.pbDate = [$(this).attr('prdate')];
		brObj.notes = [$(this).attr('notes')];
		
		console.log(this);
		/*on-click calls editObject function that takes the object's id
		and inserts some of the object's properties into the newEntry page*/
		editObject(brObj.rev, brObj.id, brObj.media, brObj.nameItem, brObj.genreItem, brObj.lengthItem, brObj.rlDate, brObj.pbDate, brObj.notes);
		
		//call ajax to re-submit the new values
		//window.location = "#newEntry";
		//window.location.reload(true);
	});

});//here ends #detailsPage

$(document).on('pagebeforeshow', '#detailsPage', function(){
	$('#ulTop').listview().listview('refresh');
});

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

			//serialize the form data into the data object 
			var data ={};
			data.mediaChoice = ["MediaChoice", $('#mediaChoice').val()];
			data.nameItem = ["NameItem", $('#nameItem').val()];
			data.genreItem = ["GenreItem", $('#genreItem').val()];
			data.lengthItem = ["LengthItem", $('#lengthItem').val()];
			data.pubDate = ["PubDate", $('#pubDate').val()];
			data.purchaseDate = ["PurchaseDate", $('#purchaseDate').val()];
			data.notesLabel = ["Notes", $('#notes').val()];
			

			/*implement a switch based on this being the edit pass or the newEntry pass
			target the submitBt's value to check which one it is 
			*--> if is Submit generate a new key else overwrite the same key for edit*/
			if($('#submitBt').val() === "Submit") {
				
				$('#newBtn').attr('value', 'New');
				//add a random number for the key
				var randomId = "entry:"+genRandomId();
				data._id = randomId;
			    //call ajax and record entry into the data-base
			    $.ajax ({
			    	headers: {
			    		'Accept':'application/json',
						'Content-Type':'application/json'

			    	},
			    	method: "POST",
			    	url:  "/hml",
			    	data: JSON.stringify(data),
			    	datatype: "json", 
			    	success: function() {

			    		alert(data.nameItem[1] +' is now saved!');

			    	}

			    });

				//reset the form after localStorage insertion
				$($myFirstForm)[0].reset();

				//refresh db
				window.location = '#homePage';
				window.location.reload('true');
			}

			else {
				
				var randomId1 = $('#submitBt').data('key');
				var revEdit = $('#submitBt').data('rev');
				console.log(revEdit);
				var editedData = {};
				editedData.mediaChoice = ["MediaChoice", $('#mediaChoice').val()];
				editedData.nameItem = ["NameItem", $('#nameItem').val()];
				editedData.genreItem = ["GenreItem", $('#genreItem').val()];
				editedData.lengthItem = ["LengthItem", $('#lengthItem').val()];
				editedData.pubDate = ["PubDate", $('#pubDate').val()];
				editedData.purchaseDate = ["PurchaseDate", $('#purchaseDate').val()];
				editedData.notesLabel = ["Notes", $('#notes').val()];
				editedData._rev = [revEdit];
				
				//call ajax and put the new values into the id of the current object
				
				$.ajax({
					url: "/hml/"+randomId1,
					type: "GET",
					dataType: "json",
					success: function(someData) {
						var goodRev = someData._rev;
						
						$.ajax({
							type: "PUT",
							url: "/hml/"+randomId1,
							contentType:"application/json",
				 			data: JSON.stringify({
				 				"_rev": goodRev,
				 				"mediaChoice": ["MediaChoice", editedData.mediaChoice[1]],
				 				"nameItem": ["NameItem", editedData.nameItem[1]],
				 				"genreItem": ["GenreItem", editedData.genreItem[1]],
				 				"lengthItem": ["LengthItem", editedData.lengthItem[1]],
				 				"pubDate": ["PubDate", editedData.pubDate[1]],
				 				"purchaseDate": ["PurchaseDate", editedData.purchaseDate[1]],
				 				"notesLabel": ["Notes", editedData.notesLabel[1]]
				 			}),
				 			processData:false,
			      			success: function() {
			    				alert("Entry Edited!");
			    				
			    			}
						});
						
						//refresh db
						window.location = '#homePage';
						window.location.reload('true');
						
						
					}
				
				
				});
				
				
				
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

	$('#container').empty();

	//2. Create a <ul> filter that holds all the <li>
	var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');


		//get data on #homePage init 	
	$.ajax ({
		url: "_view/entries",
		dataType: "json",
		success: function(data) {

		//2. Create a <ul> filter that holds all the <li>
		var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
		$.each(data.rows, function(index, entry) {
			var nameItem = entry.value.nameItem[1];
			var genreItem = entry.value.genreItem[1];
			var lengthItem = entry.value.lengthItem[1];
			var mediaChoice = entry.value.mediaChoice[1];
			var pubDate = entry.value.pubDate[1];
			var purchaseDate = entry.value.purchaseDate[1];
			var notes = entry.value.notesLabel[1];
			var _id = entry.value._id;
			var _rev = entry.value._rev;
			
			

			//3.4. Create a <li> tag that holds the localStorage object
			var insideLi = $('#ulListView').append('<li id = "'+_id+'" data-rev="'+_rev+'" data-entryname ="'+nameItem+'" data-mediatype ="'+mediaChoice+'" data-genre ="'+genreItem+'" data-length = "'+lengthItem+'" data-rldate = "'+pubDate+'" data-prdate = "'+purchaseDate+'" data-notes = "'+notes+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(mediaChoice)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+nameItem+'</strong></p></span><p class = "ui-li-aside">'+mediaChoice+'</p></a></li>');

			//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
			insideLi.listview().listview('refresh');
			});// here ends each()




				//window.location.reload(true);
		} //ends success function
	}); //ends ajax call

		//3.4. Create a <li> tag that holds the localStorage object
		//var insideLi = $('#ulListView').append('<li id = "'+parsedObj.id+'" data-entryname ="'+parsedObj.nameItem[1]+'" data-mediatype ="'+parsedObj.mediaChoice[1]+'" data-genre ="'+parsedObj.genreItem[1]+'" data-length = "'+parsedObj.lengthItem[1]+'" data-rldate = "'+parsedObj.pubDate[1]+'" data-prdate = "'+parsedObj.purchaseDate[1]+'" data-notes = "'+parsedObj.notesLabel[1]+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(parsedObj.mediaChoice[1])+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+parsedObj.nameItem[1]+'</strong></p></span><p class = "ui-li-aside">'+parsedObj.mediaChoice[1]+'</p></a></li>');



		//3.5. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]

		//3.6. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).


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
var displayDetails = function (obj, id, rev, mediaChoice, nameItem, genreItem, lengthItem, rlDate, prDate, notes) {
	console.log(id);
	console.log(rev);
	$('.delBtn').attr('id', id);
	$('.delBtn').attr('rev',rev);
	
	$('.editBtn').attr('id', id);
	$('.editBtn').attr('rev', rev);
	$('.editBtn').attr('mediaChoice', mediaChoice);
	$('.editBtn').attr('nameItem', nameItem);
	$('.editBtn').attr('genreItem', genreItem);
	$('.editBtn').attr('lengthItem', lengthItem);
	$('.editBtn').attr('rlDate', rlDate);
	$('.editBtn').attr('prDate', prDate);
	$('.editBtn').attr('notes', notes);
	
	
	$('#contentSpace').empty();

	var ulTop = $('#contentSpace').append('<ul data-role="listview" data-inset="true" id="ulTop"></ul>');
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
	
	var delConfirm = confirm("Are you sure you want to delete " +obj.id+ " ?");
	if (!delConfirm) {
		return;
	}
	else {
		$.ajax ({
			url: "/hml/"+obj.id,
			type: "GET",
			success: function(data) {
				console.log("The id of this obj. is " +obj.id);
				console.log(obj);
				$.ajax({
					url: "/hml/"+obj.id+"?rev="+obj.rev,
					type: "DELETE",
					dataType: "json",
					success: function() {
						alert("Object Deleted!");
						
					}
				});
				//refresh db
				window.location = '#homePage';
				window.location.reload('true');
				
			}
	
		});
	}
};

//editFunction function goes here
var editObject = function(rev, id, media, nameItem, genreItem, lengthItem, rlDate, pbDate, notes) {
	
	//re-direct to a new page
	window.location = '#newEntry';
	
	console.log(rev);
	
	//Target the submitBt and change its value to Edit
	$('#submitBt').attr('value', 'Edit');
	
	$('#submitBt').data('key', id);
	$('#submitBt').data('rev', rev);
	//Target the newBtn when in Edit mode and change its value to "Edit"
	$('#newBtn').attr('text', 'Edit');
	
	//Pull back values into the fields 
	$('#nameItem').attr("value", nameItem);
	$('#genreItem').attr("value", genreItem);
	$('#lengthItem').attr("value", lengthItem);
	$('#pubDate').attr("value", rlDate);
	$('#purchaseDate').attr("value", pbDate);
	$('textarea[id = notes]').val(notes);
	
	//Switch the media drop-down menu to the value of the current's object for editing
	var mediaOption = media;
	 $('#mediaChoice').val(mediaOption); 
	 
	 
	
};	
	
	 
	 //Gets the medidType value of the parsed object and forces the dropdown 
	 //menu (from the edit page) to display the same mediaType, when editing an obj.
	 //var mediaOption = parsedEditObj.mediaChoice[1];
	 //$('#mediaChoice').val(mediaOption); 
