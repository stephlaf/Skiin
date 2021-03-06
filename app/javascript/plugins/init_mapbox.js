import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const fitMapToMarkers = (map, markers) => {

  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = "pk.eyJ1IjoiY2hsb2VzYXVyYXQiLCJhIjoiY2szN2t0bGVjMDBodDNkbGd3andkMHBxciJ9.T4CtcS-Q5mP9a2d5XZE7tg"
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);


    markers.forEach((marker) => {
      // const el = document.createElement('div');
      // el.className = 'mapbox-marker';
      // el.dataset.skivents = marker.skivents
      // el.dataset.resort = marker.name

      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });

    fitMapToMarkers(map, markers);
  }

};

export { initMapbox }
