//Listen for changes on each input checkbox tag:
// if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
// if the checkbox is unchecked, you must remove the Amenity ID from the variable
// update the h4 tag inside the div Amenities with the list of Amenities checked

$(document).ready(function() {
	let userDefine = {};
	
	$('div.amenities input[type="checkbox"]').on('change', function() {
		if ($(this).is(':checked')) {
			userDefine[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete userDefine[$(this).attr('data-id')];
		}
		console.log(userDefine);
		$('div.amenities h4').html(Object.values(userDefine).join(', '));
	});

// Request http://0.0.0.0:5001/api/v1/status/:
// If in the status is “OK”, add the class available to the div#api_status
// Otherwise, remove the class available to the div#api_status
	url = 'http://0.0.0.0:5001/api/v1/status/'
	$.get(url, function(data) {
		if (data.status === 'OK') {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	});

});
