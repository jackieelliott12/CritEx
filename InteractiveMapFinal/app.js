function initMap() {
    const manhattanCoords = { lat: 40.7500, lng: -73.9800 }; // Center Manhattan

    // Updated Manhattan bounds (cutting at Castle Williams on Governors Island and Empty Sky Memorial)
    const manhattanBounds = {
        north: 40.8032,   // Upper boundary (beginning of Morningside Park)
        south: 40.6913,   // Lower boundary (Castle Williams on Governors Island)
        east: -73.935242, // Eastern boundary (Ricardo's Steakhouse near Harlem River)
        west: -74.0346    // Western boundary (Empty Sky Memorial, New Jersey side)
    };

    // Create the map and restrict panning to Manhattan bounds, set mapTypeId to 'terrain'
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,  // Adjust zoom level to better fit Manhattan
        center: manhattanCoords,
        //mapTypeId: 'terrain', // Set the base map view to Terrain
        mapId: 'e003ed84c8a10c11',  // Your map ID
        restriction: {
            latLngBounds: manhattanBounds,  // Restrict the map bounds to Manhattan
            strictBounds: true              // Prevent panning outside the bounds
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
