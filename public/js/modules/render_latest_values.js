// Set render locations on page
const idLatestRecord = "latest_record"
const idTemp = "temp_current";
const idHumidity = "humidity_current";
const idPressure = "pressure_current";
const idParticulate = "particulate_current";
const idAirQuality = "air_quality_current";

function renderLatestValues(data) {
    let latestRecord = document.getElementById(idLatestRecord);
    let dataDate = new Date(data[0].datetime);
    let currentDate = new Date();
    let timeSinceLastUpdate = Math.ceil((currentDate - dataDate) / 1000);
    latestRecord.innerText += ` ${timeSinceLastUpdate} seconds ago`;

    let tempElement = document.getElementById(idTemp);
    tempElement.innerText += ' ' + data[0].temp + '\u2103';

    let humidityElement = document.getElementById(idHumidity);
    humidityElement.innerText += ' ' + data[0].humidity + '%';

    let pressureElement = document.getElementById(idPressure);
    pressureElement.innerText += ' ' + data[0].pressure + ' hPa';

    let particulateElement = document.getElementById(idParticulate);
    particulateElement.innerText += ' ' + data[0].dust_concentration + ' pcs/L';

    let airQualityElement = document.getElementById(idAirQuality);
    let airQuality = (data[0].air_quality === 0) ? 'Fresh Air' :
    (data[0].air_quality === 1) ? 'Low Pollution' :
    (data[0].air_quality === 2) ? 'High Pollution' :
    (data[0].air_quality === 3) ? 'Danger' : null;
    airQualityElement.innerText += ' ' + airQuality;
}

export default renderLatestValues;