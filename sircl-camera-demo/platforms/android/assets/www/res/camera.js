var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    var watchID=null;
    // Get the most accurate position updates available on the
    // device.
    function onDeviceReady() {
    	 navigator.splashscreen.show();
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        getCurrentLocation();
        setTimeout(function() {
        navigator.splashscreen.hide();
    }, 10000);
        // navigator.geolocation.getCurrentPosition(onSuccess, onFail);
        
        ////var options = { enableHighAccuracy: true };
        ////watchID = navigator.geolocation.watchPosition(onSuccess, onFail, options);
        }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    //function onSuccess(position) {
    //    var element = document.getElementById('geolocation');
    //    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
    //                        'Longitude: '          + position.coords.longitude             + '<br />' +
    //                        'Altitude: '           + position.coords.altitude              + '<br />' +
    //                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
    //                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    //                        'Heading: '            + position.coords.heading               + '<br />' +
    //                        'Speed: '              + position.coords.speed                 + '<br />' +
    //                        'Timestamp: '          + position.timestamp                    + '<br />';
    //} 
    function locationSuccess(position) 
    {
    var lat = document.getElementById("latSpan");
    var lon = document.getElementById("lonSpan");
    lat.innerText = position.coords.latitude;
    lon.innerText = position.coords.longitude;
 var myCenter=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  var mapProp = {
	    center:myCenter,
	    zoom:18,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	  var marker=new google.maps.Marker({
  position:myCenter,
  });
  marker.setMap(map);

var infowindow = new google.maps.InfoWindow({
  content:"Hello World!"
  });

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
  });
    }
   
google.maps.event.addDomListener(window, 'load', initialize);
    
    function getCurrentLocation() 
    {
    navigator.geolocation.getCurrentPosition(locationSuccess, onFail);
    }
    
    // clear the watch that was started earlier
    //
    ////function clearWatch() {
    ////    if (watchID != null) {
    ////        navigator.geolocation.clearWatch(watchID);
    ////        watchID = null;
    ////    }
    ////}

