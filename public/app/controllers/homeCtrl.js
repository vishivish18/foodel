angular.module('app')
    .controller('homeCtrl', function($scope, $http) {
        $scope.model = {}

        $scope.markonGoogleMap = function initialize() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(position.coords.latitude, position.coords.longitude);
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var geocoder = new google.maps.Geocoder();

                    // Reverse Geocoding, Location name from co-ordinates.
                    var latlng = new google.maps.LatLng(latitude, longitude);
                    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var components = results[0].address_components;
                                for (var component = 0; component < (components.length); component++) {
                                    if (components[component].types[0] == "sublocality_level_3") {
                                        var sub_locality3 = components[component].long_name;

                                    }
                                    if (components[component].types[0] == "sublocality_level_2") {
                                        var sub_locality2 = components[component].long_name;

                                    }
                                    if (components[component].types[0] == "sublocality_level_1") {
                                        var sub_locality1 = components[component].long_name;

                                    }
                                    if (components[component].types[0] == "locality") {
                                        var locality = components[component].long_name;

                                    }
                                    if (components[component].types[0] == "administrative_area_level_1") {
                                        var admin_area = components[component].long_name;
                                    }
                                    if (components[component].types[0] == "country") {
                                        var country = components[component].long_name;
                                        console.log(country)
                                    }

                                    if (components[component].types[0] == "postal_code") {
                                        var postal_code = components[component].long_name;
                                        console.log(postal_code)
                                    }
                                }
                            }
                            $scope.model.area = sub_locality3 + ', ' + sub_locality2 + ', ' + sub_locality1 + ', ' + locality + ', ' + admin_area + ', ' + country
                            $scope.$digest(); // find a better way to do this, may be callback
                            console.log($scope.model.area)
                            console.log(components)
                        }
                    })

                });


            } else {
                /* geolocation IS NOT available */
            }
            var input = document.getElementById('place');
            var autocomplete = new google.maps.places.Autocomplete(input);
            //autocomplete.bindTo('bounds', map); if bound needs to be set to bias search
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                } else {

                    console.log(place);

                }
            });

        }

        $scope.markonGoogleMap();





    })
