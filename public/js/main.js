import getSensorData from './modules/getSensorData.js';
import updateSensorData from './modules/updateSensorData.js';

(function onPageLoad() {
    const defaultTimePeriod = 'lastHour' // Valid defaultTimePeriods: lastHour, last24Hours, last7Days, allTime
    getSensorData(defaultTimePeriod)
})();

// Event listeners to refresh charts
document.getElementById('lastHour').addEventListener('click', function() { updateSensorData('lastHour'); });
document.getElementById('last24Hours').addEventListener('click', function() { updateSensorData('last24Hours'); });
document.getElementById('last7Days').addEventListener('click', function() { updateSensorData('last7Days'); });
document.getElementById('last30Days').addEventListener('click', function() { updateSensorData('last30Days'); });
document.getElementById('allTime').addEventListener('click', function() { updateSensorData('allTime'); });