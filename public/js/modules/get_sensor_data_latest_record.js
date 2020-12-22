import renderLatestValues from './render_latest_values.js';

// GET and render sensor data for a given time period
function getLatestRecord() {
    // start new AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/particle/data/lastRecord`, true);
    xhr.onload = function(){
        if(this.status === 200) {
            // Data successfully retreived. Parse then format.
            let data = JSON.parse(this.responseText);
            console.dir(data);
            
            // Render charts
            renderLatestValues(data);
        }
    }
    xhr.onerror = () => { console.log('Request failed'); }
    xhr.send();
}

export default getLatestRecord;