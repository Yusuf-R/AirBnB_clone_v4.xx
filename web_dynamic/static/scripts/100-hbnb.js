//Listen for changes on each input checkbox tag:
// if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
// if the checkbox is unchecked, you must remove the Amenity ID from the variable
// update the h4 tag inside the div Amenities with the list of Amenities checked

$(document).ready(function() {
	let amenityDefine = {};
	let stateDefine = {};
	let cityDefine = {};
	
	$('div.amenities input[type="checkbox"]').on('change', function() {
		if ($(this).is(':checked')) {
			amenityDefine[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete amenityDefine[$(this).attr('data-id')];
		}
		$('div.amenities h4').html(Object.values(amenityDefine).join(', '));
		console.log(Object.keys(amenityDefine).length);
	});

// Request http://0.0.0.0:5001/api/v1/status/:
// If in the status is “OK”, add the class available to the div#api_status
// Otherwise, remove the class available to the div#api_status
	const url = 'http://0.0.0.0:5001/api/v1/status/'
	$.get(url, function(data) {
		if (data.status === 'OK') {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	});


// Request http://0.0.0.0:5001/api/v1/places_search/
// Send a POST request with Content-Type: application/json 
// and an empty dictionary in the body - cURL version: 
// curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}' 
// Loop into the result of the request and 
// create an article tag representing a Place in the section.places. 
// (you can remove the Owner tag in the place description)
	const urlPlaceSearch = 'http://0.0.0.0:5001/api/v1/places_search/'
	data = {};
	$.ajax({
		url: urlPlaceSearch,
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		statusCode: {
			404: function() {
				console.alert( "page not found" );
				}
		},
		error: function() {
			console.log( "error" );
		},
		success: function(data, status) {
			if (status === 'success') {
				for (let i = 0; i < data.length; i++) {
					$('section.places').append(
						'<article>'+
						'<div class="title_box">'+
						'<h2>'+ data[i].name + '</h2>'+
						'<div class="price_by_night">'+"$"+data[i].price_by_night+'</div>'+ '</div>'+
						'<div class="information">'+
						'<div class="max_guest">'+data[i].max_guest+' Guests</div>'+
						'<div class="number_rooms">'+data[i].number_rooms+' Bedrooms</div>'+
						'<div class="number_bathrooms">'+data[i].number_bathrooms +' Bathrooms</div>'+
						'</div>'+
						'<div class="user">'+ '<b>Owner: </b>'+ '</div>'+
						'<div class="description">'+data[i].description+'</div>'+
						'</article>');
				}
			}
			else {
				console.log("Help!!!!");
			}
		}
	});

// When the button tag is clicked, 
// a new POST request to places_search 
// should be made with the list of Amenities checked

	$('button').on('click', function() {
		const urlPlaceSearch = 'http://0.0.0.0:5001/api/v1/places_search/'
		$.ajax({
			url: urlPlaceSearch,
			type: 'POST',
			//data: JSON.stringify(amenityDefine),
			data: JSON.stringify({amenities: Object.keys(amenityDefine)}),
			dataType: 'json',
			contentType: 'application/json',
			statusCode: {
				404: function() {
					console.alert( "page not found" );
					}
			},
			error: function() {
				console.log( "error" );
			},
			success: function(data, status) {
				if (status === 'success') {
					console.log("My list is : " + data.length );
					for (let i = 0; i < data.length; i++) {
						$('section.places').append(
							'<article>'+
							'<div class="title_box">'+
							'<h2>'+ data[i].name + '</h2>'+
							'<div class="price_by_night">'+"$"+data[i].price_by_night+'</div>'+ '</div>'+
							'<div class="information">'+
								'<div class="max_guest">'+data[i].max_guest+' Guests</div>'+
							'<div class="number_rooms">'+data[i].number_rooms+' Bedrooms</div>'+
							'<div class="number_bathrooms">'+data[i].number_bathrooms +' Bathrooms</div>'+
							'</div>'+
							'<div class="user">'+ '<b>Owner: </b>'+ '</div>'+
							'<div class="description">'+data[i].description+'</div>'+
							'</article>');
					}
				}
				else {
					console.log("Help!!!!");
				}
			}
		});
	});



// let get all the state checked into a dictonary
	$('div.locations h2 > input[type="checkbox"]').on('change', function() {
		if ($(this).is(':checked')) {
			stateDefine[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete stateDefine[$(this).attr('data-id')];
		}
		console.log(stateDefine);
		$('div.locations h4').html(Object.values(stateDefine).join(', '));
	})

// lets get all the city checked into a dictonary
	$('div.locations li input[type="checkbox"]').on('change', function() {
		if ($(this).is(':checked')) {
			cityDefine[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete cityDefine[$(this).attr('data-id')];
		}
		console.log(cityDefine);
		$('div.locations h4').html(Object.values(cityDefine).join(', '));
	})

// combine all the result checked and search base on the parameters when button is clicked
	
	const userPreference = {
		state: Object.keys(stateDefine),
		city: Object.keys(cityDefine),
		amenities: Object.keys(amenityDefine)
	};

		$('button').on('click', function() {
		const urlPlaceSearch = 'http://0.0.0.0:5001/api/v1/places_search/'
		$.ajax({
			url: urlPlaceSearch,
			type: 'POST',
			data: JSON.stringify(userPreference),
			dataType: 'json',
			contentType: 'application/json',
			statusCode: {
				404: function() {
					console.alert( "page not found" );
					}
			},
			error: function() {
				console.log( "error" );
			},
			success: function(data, status) {
				if (status === 'success') {
					console.log("My list is : " + data.length );
					for (let i = 0; i < data.length; i++) {
						$('section.places').append(
							'<article>'+
							'<div class="title_box">'+
							'<h2>'+ data[i].name + '</h2>'+
							'<div class="price_by_night">'+"$"+data[i].price_by_night+'</div>'+ '</div>'+
							'<div class="information">'+
								'<div class="max_guest">'+data[i].max_guest+' Guests</div>'+
							'<div class="number_rooms">'+data[i].number_rooms+' Bedrooms</div>'+
							'<div class="number_bathrooms">'+data[i].number_bathrooms +' Bathrooms</div>'+
							'</div>'+
							'<div class="user">'+ '<b>Owner: </b>'+ '</div>'+
							'<div class="description">'+data[i].description+'</div>'+
							'</article>');
					}
				}
				else {
					console.log("Help!!!!");
				}
			}
		});
	});

});
