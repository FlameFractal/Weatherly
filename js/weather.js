function autolocate(){
	navigator.geolocation.getCurrentPosition(function (position){
		loc = position.coords.latitude + ',' + position.coords.longitude;
		loadWeather(position.coords.latitude + ',' + position.coords.longitude);
	});

	if(!$('#success').is(':visible')){
		loadWeather("Delhi");	
	}
}


function loadWeather(loc){
	$.simpleWeather({
			location: loc,
			woeid: '',
			unit: 'c',
			success: function(weather) {
				$("#title").html(weather.city + "," + weather.region);
				$("#currently").html(weather.currently);
				$("#todays-thumbnail").attr("src", 'images/weathericons/'+weather.code+'.svg');
				$("#current-temp").html(weather.temp+'&deg;'+weather.units.temp);
				$("humidity").html(weather.humidity+"%");
				
				//$("today-high").html(weather.high);
				//$("today-low").html(weather.low);
				//$("tomorrows-high").html(weather.forecast[1].high);
				//$("tomorrows-low").html(weather.forecast[1].low);
				$("#tomorrows-forecast").html(weather.forecast[1].text);
				$("#tomorrows-thumbnail").attr("src", 'images/weathericons/'+weather.forecast[1].code+'.svg');
				$("#success").fadeIn();
			},
			error: function(error) {
				$("#fail").html(loc).fadeIn();
			}
		});
}


$("#forecast-btn").click(function(event) {
	event.preventDefault();
	$(".alert").hide();
	if ($("#city-input").val()!="") {
		var loc = $('#city-input').val();
		loadWeather(loc);
	} 
	else {
		$("#noCity").fadeIn();
	}
});


$(document).ready(function(){

	//setInterval(loadWeather(loc), 1000);

	var input = document.getElementById('city-input');
	new google.maps.places.Autocomplete(input);

	$(document).keypress(function(e){
		if (e.which == 13){
			e.preventDefault();
			$("#forecast-btn").click();
		}
	});

	autolocate();

});
