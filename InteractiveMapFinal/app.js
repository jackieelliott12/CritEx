function initMap() {
    const nycCoords = { lat: 40.7128, lng: -74.0060 }; // Center NYC

    // Update bounds to cover all of NYC
    const nycBounds = {
        north: 40.9176,   // Upper boundary (Bronx/Yonkers)
        south: 40.4774,   // Lower boundary (Staten Island)
        east: -73.7004,   // Eastern boundary (Queens)
        west: -74.2591    // Western boundary (Hudson River near New Jersey)
    };

    // Create the map and restrict panning to NYC bounds
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,  // Adjust zoom level to fit all of NYC
        center: nycCoords,
        mapId: 'e003ed84c8a10c11',  // Your map ID
        restriction: {
            latLngBounds: nycBounds,  // Restrict the map bounds to all of NYC
            strictBounds: true        // Prevent panning outside the bounds
        }
    });

    // Add KML layer if necessary
    const kmlLayer = new google.maps.KmlLayer({
        url: `https://www.google.com/maps/d/kml?mid=1iNVlmOb5P73fkvYSO-Ne6miJgIwOOQo&cachebust=${new Date().getTime()}`,
        map: map,
        preserveViewport: true,
        suppressInfoWindows: true
    });

    // Add event listener for KML marker clicks
    kmlLayer.addListener('click', function(event) {
        const content = event.featureData.name;
        const description = event.featureData.description || 'No additional info';

        const infoWindow = new google.maps.InfoWindow({
            content: `<h2>${content}</h2><p>${description}</p>`,
            position: event.latLng
        });
        infoWindow.open(map);
    });
}
