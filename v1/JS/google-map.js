// ################### CREATE DIV GOOGLE MAP ####################################################
function initializeMap(myCenter, zoomNumber, elementID, infoWindowContent) {
	var mapProp = {center: myCenter, zoom: zoomNumber, mapTypeId: google.maps.MapTypeId.ROADMAP};
	var map = new google.maps.Map(document.getElementById(elementID),mapProp);
	var marker = new google.maps.Marker({position:myCenter});
	marker.setMap(map);
	var infowindow = new google.maps.InfoWindow({content:infoWindowContent});
	google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
};
// ################### CREATE DIRECTION GOOGLE MAP ####################################################
// function identifies current location coordinates and passes to 'goSkytrex' function
function getDirection() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(goSkytrex, showError);
	} else { 
		dontGoSkytrex();
	}
};
// function gets coordinates and changes 'href' attribute of '#get-direction' element
function goSkytrex(position) {
	$('#get-direction').attr('href','https://www.google.com/maps/dir/' + 
													 position.coords.latitude + ',+' + position.coords.longitude +
													 '/Skytrex+Shah+Alam,+Jalan+Liku+8%2F1,+Seksyen+8,+40000+Shah+Alam,+Selangor/@3.0537471,101.5721458,13z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x31cdb55f1721e103:0x682c9d5e1c509291!2m2!1d101.7055411!2d3.021998!1m5!1m1!1s0x31cc52068d077c77:0x52922d18ea04e94!2m2!1d101.511134!2d3.095371')
		.text('Get direction (link activated)');
};
function dontGoSkytrex(){
	$('#get-direction')
		.attr('href',
					'https://www.google.com/maps/place/Skytrex+Shah+Alam/@3.0949294,101.5088841,17z/data=!4m16!1m13!4m12!1m3!2m2!1d101.5107631!2d3.0943543!1m6!1m2!1s0x31cc52068d077c77:0x52922d18ea04e94!2sSkytrex+Shah+Alam,+Jalan+Liku+8%2F1,+Seksyen+8,+40000+Shah+Alam,+Selangor,+Malaysia!2m2!1d101.511134!2d3.095371!3e2!3m1!1s0x31cc52068d077c77:0x52922d18ea04e94')
	.text('Get direction (link activated)');
};
// show error if there is any
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			dontGoSkytrex();
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
	}
};