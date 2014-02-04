
;(function($){

  "use strict";
  var gMap,
  gMarkerArrayKot = [],
  gMarkerArrayEcole = [],
  gMarkerKot,
  gMarkerEcole,
  oKots,
  nDistanceValueOk,
  oEcoles,
  bEcoleClick =false,
  aKots = [],
  oEcole = [],
  gEcole = new google.maps.LatLng(),
  sNom = [],
  sCachet,
  nDistanceValueOk,
  cityCircle = new google.maps.Circle(),
  rectangle = new google.maps.Rectangle(),
  listKot = [],
  listEcole = [],
  regLatLng = new RegExp("[,]"),
  geocoder = new google.maps.Geocoder(),
  oRayon,
  gMarker = new google.maps.Marker,
  //gSpherical = google.maps.geometry.spherical,
  input = document.getElementById('map'),
  gPlaceAutoComplete,
  //SELECTOR
  $loading = $('.loading');
  
  $(function(){
    
    $('#rapide input').on("click", actionChangeType);
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country:"be"}
    };
  });
  var initialize = function(){
// ajaxAllEcole();
    //ajaxAllKot();

    actionChangeType();

    //gPlaceAutoComplete = new google.maps.places.Autocomplete(input,options);

    displayGoogleMap();
    $('.loading').fadeOut();

  };
  var eventInput = function()
  {

    $('#filtrer').click(function(){
      var sDistanceValue = document.getElementById('distance').value;

      if($.isNumeric(sDistanceValue))
      {
        nDistanceValueOk = sDistanceValue;
      }
      else
      {
       nDistanceValueOk = 0;
     }
     var sCityValue = document.getElementById('map').value;
     if(bEcoleClick)
     {
      actionEcoleClick( nDistanceValueOk );
    }
    else
    {
      getCity( sCityValue , nDistanceValueOk );
    }
    

    


  }); 

    $('#map').change(function(){

      var sDistanceValue = document.getElementById('distance').value;

      if($.isNumeric(sDistanceValue))
      {
       nDistanceValueOk = sDistanceValue;
     }
     else
     {
       nDistanceValueOk = 0;
     }
     var sCityValue = document.getElementById('map').value;

     bEcoleClick = false;
     
     if(bEcoleClick)
     {
      actionEcoleClick( nDistanceValueOk );
    }
    else
    {
      getCity( sCityValue , nDistanceValueOk );
    }
    
    //actionChangeType ();
   // ajaxAllKot();
 });
  }
  
  var actionChangeType = function(){

    $('label.map1').text('Ecole ciblée');
    $('input#map').attr('placeholder','Ecole');
    
    
    if($('#rapide input:checked').val()==='aucun'){

      hideGoogleMap();
    }
    else
    {
      showGoogleMap();
      $('label.map1').text('Indiquez l\'adresse ou clickez sur une école');
      $('input#map').attr('placeholder','Ville, école');
    }

    eventInput();
  }

  var ajaxAllKot = function(){
   $.ajax({
    dataType:"json",
    url:"dataKot",
    success: function ( oResponse ){
      oKots = oResponse.data;
      createMarkerKot(oKots);
    }
  })
 }

 var ajaxAllEcole = function(){
   $.ajax({
    dataType: "json",
    url:"dataEcole",
    success: function ( oResponse ){
      oEcoles= oResponse.data;
      createMarkerEcole(oEcoles);
    }
  })
 }

 var createMarkerKot = function(oData){
   var redIcon = new google.maps.MarkerImage('http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png');


   for(var i=0;i<=oData.length-1;i++)
   {
    var lat = oData[i].lat;
    var lng = oData[i].lng;
    var LatLng = [lat,lng];
    listKot.push(LatLng);
    drawMarkerKot( Number(listKot[i][0]) , Number(listKot[i][1]), oData[i].adresse, redIcon);
  }

} 

var createMarkerEcole = function(oData){
 var blueIcon = new google.maps.MarkerImage('http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png');

 for(var i=0;i<=oData.length-1;i++)
 {
  var lat = oData[i].lat;
  var lng = oData[i].lng;
  var LatLng = [lat,lng];
  listEcole.push(LatLng);
  drawMarkerEcole( Number(listEcole[i][0]) , Number(listEcole[i][1]), oData[i].nom, blueIcon);
}
}

var drawMarkerKot = function ( nLat , nLng, sNom , icon)
{
  var position = new google.maps.LatLng(nLat,nLng);

  gMarkerKot = new google.maps.Marker({
    position:position,
    map : gMap,
    animation: google.maps.Animation.DROP,
    title : sNom,
    icon : icon
  });

  gMarkerArrayKot.push(gMarkerKot);

}

var drawMarkerEcole = function ( nLat , nLng, sAdresse , icon)
{
  var position = new google.maps.LatLng(nLat,nLng);

  gMarkerEcole = new google.maps.Marker({
    position:position,
    map : gMap,
    animation: google.maps.Animation.DROP,
    title : sAdresse,
    icon : icon
  });

  gMarkerArrayEcole.push(gMarkerKot);

 // actionEcoleClick();
 google.maps.event.addListener(gMarkerEcole,'click',function( e ){

  bEcoleClick = true;
  console.log(bEcoleClick);
  sNom = [];
    //centrer sur l'école
    gMap.setZoom(12);
    gMap.panTo(gMarkerEcole.getPosition());
  //recuperer la lat/lng 
  //récuperer les valeurs dans array
  for(var i=0;i<=oEcoles.length-1;i++)
  {
    sNom = {latlng : new google.maps.LatLng( oEcoles[i].lat , oEcoles[i].lng ),nom:oEcoles[i].nom};
    oEcole.push(sNom); 

  }
  
  for (var i =0; i<=oEcole.length-1;i++){ 
  //tester si un kot BDD === au kot clické

  if( e.latLng.lat() === oEcole[i].latlng.lat() && e.latLng.lng() === oEcole[i].latlng.lng())
  {
      //afficher le nom dans l'input

      $('#map').attr('value',oEcole[i].nom);

      //enregistrer la valeur

      gEcole = new google.maps.LatLng( oEcole[i].latlng.lat() , oEcole[i].latlng.lng());

    }
  }
});

}

var actionEcoleClick = function( nDistance ){
  //filtrer les kots en fonction d'un rayon
   //afficher le cercle
   
   drawCircle( 'ecole', gEcole , nDistanceValueOk );
 }
 var defineCircle = function(center, radius, sColor){
  return {
    strokeColor: sColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: sColor,
    fillOpacity: 0.35,
    map: gMap,
    center: center,
    radius: radius
  };
}
var inRange = function ( oCenter, nDistance ) //obj Google / numeric
{
  aKots = [];
  var options = defineCircle(oCenter, nDistance);
  cityCircle.setOptions( options );

  var boundd = cityCircle.getBounds();

  for(var i=0;i<=oKots.length-1;i++)
  {
   //console.log(oKots[i].id+boundd.contains(new google.maps.LatLng(oKots[i].lat,oKots[i].lng)));
   if(!boundd.contains(new google.maps.LatLng(oKots[i].lat,oKots[i].lng))){
    gMarkerArrayKot[i].setMap(null);

  }
  else
  {
    aKots.push(oKots[i]);
    gMarkerArrayKot[i].setMap( gMap );
    gMap.fitBounds (boundd);
    $('#listKot').attr('value',JSON.stringify(aKots));
  }
}

}
var hideGoogleMap = function(){
  $('#gmap').css({display:"none"});
  $('.mapInfo').css({height:"auto",marginLeft:0,float:"none"});
}
var showGoogleMap = function(){
  $('#gmap').css({display:"block"});
  $('.mapInfo').css({height:"auto",marginLeft:0,float:"left"});
}
var displayGoogleMap = function (){
  var akoter = [ {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
    { "color": "#00006f" },
    { "lightness": -5 },
    { "visibility": "on" },
    { "weight": 3 },
    { "hue": "#ff0091" }
    ]
  },{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":0},{"lightness":25},{"gamma":0.6},{"hue":"#435158"}]}];
  var aMapOptions = {
    disableDefaultUI:true,
    scrollwheel:false,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center:new google.maps.LatLng(50.5,4.6),
    styles: akoter,
  }
  gMap = new google.maps.Map(document.getElementById('gmap'),aMapOptions);

  ajaxAllEcole();
}
var drawCircle = function(type , oCenter,sDistance){
  if( cityCircle )
  {
    cityCircle.setMap( null );
  }
  nDistance = Number(sDistance);

  var oCenterCity = oCenter;
  var oCircleRangeN = gSpherical.computeOffset(oCenterCity, nDistance, 0); //marker limitant au NORD
  
  if(type ==='ville'){
    gMarker.setPosition( oCenterCity );
    gMarker.setMap( gMap );
    var sColor = '#FF0000';
  }
  else(type ==='ecole')
  {
    var sColor = '#0000FF';
  }

  var nDistance = google.maps.geometry.spherical.computeDistanceBetween(oCenterCity, oCircleRangeN);

  var aCircleOptions = defineCircle(oCenter, nDistance, sColor);

  cityCircle.setOptions(aCircleOptions);

  inRange(oCenter, nDistance);


}

var getCity = function(sPosition,sDistance){
 var nDistance = Number(sDistance);

 var aMapOptions = {
  disableDefaultUI:true,
  scrollwheel:false,
  zoom: 8,
  mapTypeId: google.maps.MapTypeId.HYBRID,
  center:geocoder.geocode({
    address:sPosition,
    region:"BE"
  },function(aResults,sStatus)
  {
    if(sStatus ===google.maps.GeocoderStatus.OK)
    {
      var center = aResults[0].geometry.location;
      gMap.setZoom( 9 );
      gMap.panTo ( center );

      $('#coords').attr('value',center);

      var oCircleRangeN = gSpherical.computeOffset(center, nDistance, 360);

      gMarker.setPosition( center );
      gMarker.setMap( gMap );

      drawCircle( 'ville' ,center , sDistance );

    }
    else if(sStatus ===google.maps.GeocoderStatus.ZERO_RESULTS)
    {
      alert('La google map n\'a rien trouvé car aucune donnée n\'a été entré');
    }
    else if(sStatus ===google.maps.GeocoderStatus.INVALID_REQUEST){
      alert('La google map n\'a rien trouvé car la requête est incorrect');
    }
  })
}
}
google.maps.event.addDomListener(window, 'load', initialize);
}).call(this,jQuery);