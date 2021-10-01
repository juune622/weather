






//웹사이트 주소 체제:

// openweathermap : f1856687e44a2152718f62479b072e09
//kakao : e92ce151565a21f7fded660942cbf7c8

//7days: // 7days: https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=f1856687e44a2152718f62479b072e09&units=metric&exclude=minutely,hourly

//http://openweathermap.org/img/wn/10d.png

var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=f1856687e44a2152718f62479b072e09&units=metric&exclude=minutely,hourly'

/*************************** 전역설정 ***********************************/

var weatherUrl= 'https://api.openweathermap.org/data/2.5/weather';
var params = {
	appid: 'f1856687e44a2152718f62479b072e09',
	units:'metric',
	exclude:'minutely,hourly'
}



/*************************** 이벤트등록 ***********************************/

navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);


/*************************** 이벤트콜백 ***********************************/
function onGetPosition(r){
	getWeather(r.coords.latitude,r.coords.longitude);
}
function onGetPositionError(e){
	getWeather( 37.566,126.978);
}

function onGetWeather(r){
	console.log(r)
	console.log(r.weather[0].icon);
	updateBg(r.weather[0].icon)
}



/*************************** 사용자함수 ***********************************/
function getWeather(lat,lon){
	params.lat = lat
	params.lon = lon
	$.get(weatherUrl,params,onGetWeather);
}

function updateBg(icon){
	var bg;
	switch(icon){
		case '01d':
		case '02d':
			bg = '01d-bg.jpg';
			break;
		case '01n':
		case '02n':
			bg = '01n-bg.jpg';
			break;
		case '03d':
		case '04d':
			bg = '03d-bg.jpg';
			break;
		case '03n':
		case '04n':
			bg = '03n-bg.jpg';
			break;
		case '09d':
		case '10d':
			bg = '09d-bg.jpg';
			break;
		case '09n':
		case '10n':
			bg = '09n-bg.jpg';
			break;
		case '11d':
			bg = '11d-bg.jpg';
			break;
		case '11n':
			bg = '11n-bg.jpg';
			break;
		case '13d':
			bg = '13d-bg.jpg';
			break;
		case '13n':
			bg = '13n-bg.jpg';
			break;
		case '50d':
			bg = '50d-bg.jpg';
			break;
		case '50n':
			bg = '50n-bg.jpg';
			break;
	}
	$('.wrapper').css('background-image','url(../img/'+bg+')')
}














































































