import {updateTemp} from './render_temp.js';
import {updateHumidity} from './render_humidity.js';
import {updateParticulate} from './render_particulate.js';
import {updatePressure} from './render_pressure.js';
import {updateAirQuality} from './render_air_quality.js';

// GET and render sensor data for a given time period
function updateSensorData(timePeriod) {
    // start new AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/particle/data/${timePeriod}`, true);
    xhr.onload = function(){
        if(this.status === 200) {
            // Data successfully retreived. Parse then format.
            let data = JSON.parse(this.responseText);
            data.forEach(d => { d.date = new Date(d.datetime); });
            console.dir(data);
            
            // Render charts
            updateTemp(data);
            updateHumidity(data);
            updateParticulate(data);
            updatePressure(data);
            updateAirQuality(data);
        }
    }
    xhr.onerror = () => { console.log('Request failed'); }
    xhr.send();
}

export default updateSensorData;