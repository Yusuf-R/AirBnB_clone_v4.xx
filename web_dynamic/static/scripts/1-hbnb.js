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

	//Any of this functions works just fine
	/*

	$('div.amenities input[type="checkbox"]').on('change', function() {
		let key = $(this).attr('data-id');
		let value = $(this).attr('data-name');

		if ($(this).is(':checked')) {			
			userDefine[key] = value;
		} else {			
			delete userDefine[key];
			}
		const msg = Object.values(userDefine).join(', ');
		$('div.amenities h4').text(msg);
	});
	*/
});
