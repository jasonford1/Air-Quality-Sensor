import {renderTemp} from './render_temp.js';
import {renderHumidity} from './render_humidity.js';
import {renderParticulate} from './render_particulate.js';
import {renderPressure} from './render_pressure.js';
import {renderAirQuality} from './render_air_quality.js';

// GET and render sensor data for a given time period
function getSensorData(timePeriod) {
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
            renderTemp(data);
            renderHumidity(data);
            renderParticulate(data);
            renderPressure(data);
            renderAirQuality(data);
        }
    }
    xhr.onerror = () => { console.log('Request failed'); }
    xhr.send();
}

export default getSensorData;