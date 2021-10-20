


//웹사이트 주소 체제:

// openweathermap : f1856687e44a2152718f62479b072e09
//kakao : e92ce151565a21f7fded660942cbf7c8

//7days: // 7days: https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=f1856687e44a2152718f62479b072e09&units=metric&exclude=minutely,hourly,current

//http://openweathermap.org/img/wn/10d.png

var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=f1856687e44a2152718f62479b072e09&units=metric&exclude=minutely,hourly'

/*************************** 전역설정 ***********************************/
var map;
var cities;
var cityCnt = 0; //onCreateMarker에서 객수를 센다
var weatherUrl= 'https://api.openweathermap.org/data/2.5/weather';
var oneCallUrl= 'https://api.openweathermap.org/data/2.5/onecall';
var params = {
	appid: 'f1856687e44a2152718f62479b072e09',
	units:'metric',
	lang:'kr',
	exclude:'minutely,current'
}



/*************************** 이벤트등록 ***********************************/


navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);

mapInit()

/*************************** 이벤트콜백 ***********************************/

function onResize(){
	map.setCenter(new kakao.maps.LatLng(35.8, 127.7));
}
function onGetPosition(r){
	getWeather(r.coords.latitude,r.coords.longitude);
}
function onGetPositionError(e){
	getWeather( 37.566,126.978);
}

function onGetWeather(r){
	console.log(r)
	updateDaily(r);
	updateBg(r.weather[0].icon)
}


function onGetCity(r){
	//createMarker(r.cities);
	cities = r.cities
	for(var i in cities){
		params.lat=''
		params.lon=''
		params.id=cities[i].id
		$.get(weatherUrl,params,onCreateMarker)
	}
}

function onCreateMarker(r){
	cityCnt++;
	var city = cities.filter(function(v){
		return v.id === r.id
	})
	
	var content = '';
	content+='<div class="popper '+city[0].class+'" onclick="getWeather('+city[0].lat+','+city[0].lon+')">';
	content+='<div class="img-wrap">';
	content+='<img src="http://openweathermap.org/img/wn/'+r.weather[0].icon+'.png" alt="아이콘" class="mw-100">';
	content+='</div>';
	content+='<div class="cont-wrap">';
	content+='<div class="name">'+city[0].name+'</div>';
	content+='<div class="temp">'+r.main.temp+'˚</div>';
	content+='</div>';
	content+='<i class="fa fa-caret-down"></i>';
	content+='</div>';
	var position = new kakao.maps.LatLng(r.coord.lat, r.coord.lon);
	var customOverlay = new kakao.maps.CustomOverlay({
		position: position,
		content: content
	});
	customOverlay.setMap(map);

	content = '<div class="city swiper-slide" onclick="getWeather('+city[0].lat+','+city[0].lon+')">'
	content += '<div class="name">'+city[0].name+'</div>'
	content += '<div class="content">'
	content += '<div class="img-wrap">'
	content += '<img src="http://openweathermap.org/img/wn/'+r.weather[0].icon+'.png" alt="아이콘" class="mw-100">'
	content += '</div>'
	content += '<div class="cont-wrap">'
	content += '<div class="temp">온도&nbsp;&nbsp; '+r.main.temp+'</div>'
	content += '<div class="temp">체감&nbsp;&nbsp; '+r.main.feels_like+'</div>'
	content += '</div></div></div>'
	$('.city-wrap .swiper-wrapper').append(content);
	if(cityCnt == cities.length){
		var swiper =new Swiper('.city-wrap > .swiper-container',{
			loop:true,
			slidesPerView: 2,
			spaceBetween: 10,
			loop:true,
			navigation: {
				nextEl: ".city-wrap > .bt-next",
				prevEl: ".city-wrap > .bt-prev",
			},
			breakpoints: {
				576: { slidesPerView: 3 },
				768: { slidesPerView: 4 },
			}
		});
	}
}

function onGetWeekly(r){
	console.log(r);
	$('.hourly-container .swiper-wrapper').empty();
	$('.weekly-container').empty();

	var html;
	//hourly
	for(var i in r.hourly) {
		html  = '<div class="swiper-slide">';
		html += '	<div class="time-wrap">'+((i == 0) ? '현재' : moment(r.hourly[i].dt*1000).format('H')+'시('+moment(r.hourly[i].dt*1000).format('D')+'일)')+'</div>';
		html += '	<div class="img-wrap">';
		html += '		<img src="http://openweathermap.org/img/wn/'+r.hourly[i].weather[0].icon+'.png" class="mw-100">';
		html += '	</div>';
		html += '	<div class="temp-wrap">'+r.hourly[i].temp+'˚</div>';
		html += '</div>';
		$('.hourly-container .swiper-wrapper').append(html);
	}
	var swiper = new Swiper('.hourly-container > .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 10,
		navigation: {
			nextEl: '.hourly-container > .bt-next',
			prevEl: '.hourly-container > .bt-prev',
		},
		breakpoints: {
			576: { slidesPerView: 4 },
			768: { slidesPerView: 5 },
			992: { slidesPerView: 6 },
			1200: { slidesPerView:7 },
		}
	});
	//weekly

	for(var i=1; i<r.daily.length; i++) {
		html  = '<div class="">';
		html += '	<div class="yoil">'+moment(r.daily[i].dt*1000).format('dddd')+'</div>';
		html += '	<div class="icon"><img src="http://openweathermap.org/img/wn/'+r.daily[i].weather[0].icon+'.png" alt="icon" class="mw-100"></div>';
		html += '	<div class="desc">'+r.daily[i].weather[0].main+'('+r.daily[i].weather[0].description+')</div>';
		html += '	<div class="max">'+r.daily[i].temp.max+'˚</div>';
		html += '	<div class="min">'+r.daily[i].temp.min+'˚</div>';
		html += '</div>';
		$('.weekly-container').append(html);
	}


	/* var swiper = new Swiper('.weekly-container.swiper-container', {
		slidesPerView: 2,
		direction: 'vertical',
		breakpoints: {
			576: { slidesPerView: 3 },
			768: { slidesPerView: 4 },
		}
	}); */

	
}


/*************************** 사용자함수 ***********************************/



function updateDaily(r) {
	var $city = $(".daily-container .city");
	var $imgWrap = $(".daily-container .img-wrap");
	var $tempWrap = $(".daily-container .temp-wrap");
	var $infoWrap = $(".daily-container .info-wrap");
	var src = 'http://openweathermap.org/img/wn/'+r.weather[0].icon+'@2x.png';
	$city.html(r.name + ', ' + r.sys.country);
	$imgWrap.find("img").attr('src', src); // $("img", $imgWrap).attr('src', src);
	$tempWrap.find("h3").html(r.main.temp+'˚');
	$tempWrap.find("div").html('(체감 '+r.main.feels_like+'˚)');
	$infoWrap.find("h3").html(r.weather[0].main+' <small>('+r.weather[0].description+')</small>');
	$infoWrap.find(".temp .info").eq(0).html(r.main.temp_max+'˚');
	$infoWrap.find(".temp .info").eq(1).html(r.main.temp_min+'˚');
	$infoWrap.find(".wind .arrow").css('transform', 'rotate('+r.wind.deg+'deg)');
	$infoWrap.find(".wind .info").html(r.wind.speed+'㎧');
	$infoWrap.find(".date .title").html(moment(r.dt*1000).format('YYYY년 M월 D일 H시 m분')+' 기준');
}

function getWeather(param,param2){
	if(param && param2){
		params.id = '';
		params.lat = param
		params.lon = param2
	}else{
		params.id = param;
		params.lat = '';
		params.lon = '';
	}
	
	$.get(weatherUrl,params,onGetWeather);
	$.get(oneCallUrl,params,onGetWeekly);
}


function mapInit(){
	var mapOption = { 
		center: new kakao.maps.LatLng(35.8, 127.7), // 지도의 중심좌표
		level: 13, // 지도의 확대 레벨
		draggable:false,
		zoomable:false,
		disableDoubleClick:true,
	};
	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	map = new kakao.maps.Map($('#map')[0], mapOption);
	

	$(window).resize(onResize)	
	$.get('../json/city.json',onGetCity);
}

function updateBg(icon){
	var bg;
	switch(icon){
		case '01d':
			bg = '01d-bg.jpg';
			break;
		case '01n':
		case '02n':
			bg = '01n-bg.jpg';
			break;
		case '02d':
		case '03d':
		case '04d':
			bg = '03d-bg.jpg';
			break;
		case '02n':
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
	$('.all-wrapper').css('background-image','url(../img/'+bg+')')
}













































































