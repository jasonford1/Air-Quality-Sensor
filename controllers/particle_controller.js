const {poolPromise, sql } = require('../config/database')
const EnvVals = require('../model/envVals')
const preparedSQL = 'SELECT datetime, temp, pressure, humidity, dust_concentration, air_quality FROM [env-vals]'

//POST particle sensor data to SQL Server
exports.index_post = async (req, res) => {
    let errors = null;
    const data = JSON.parse(req.body.data);
    const envVals = new EnvVals(null, req.body.coreid, req.body.published_at, data.temp, data.humidity, data.pressure, data['air-quality'], data['dust-lpo'], data['dust-ratio'], data['dust-concentration']);

    // SQL request to insert sensor readings into database
    try {    
        const pool = await poolPromise;
        const result = await pool.request()
            .input(envVals.coreid.column, envVals.coreid.type, envVals.coreid.value)
            .input(envVals.dateTime.column, envVals.dateTime.type, envVals.dateTime.value)
            .input(envVals.temp.column, envVals.temp.type, envVals.temp.value)
            .input(envVals.humidity.column, envVals.humidity.type, envVals.humidity.value)
            .input(envVals.pressure.column, envVals.pressure.type, envVals.pressure.value)
            .input(envVals.airQuality.column, envVals.airQuality.type, envVals.airQuality.value)
            .input(envVals.dustLpo.column, envVals.dustLpo.type, envVals.dustLpo.value)
            .input(envVals.dustRatio.column, envVals.dustRatio.type, envVals.dustRatio.value)
            .input(envVals.dustConcentration.column, envVals.dustConcentration.type, envVals.dustConcentration.value)
            .query(`INSERT INTO ${envVals.table.name} (${envVals.coreid.column}, ${envVals.dateTime.column}, ${envVals.temp.column}, ${envVals.humidity.column}, ${envVals.pressure.column}, ${envVals.airQuality.column}, ${envVals.dustLpo.column}, ${envVals.dustRatio.column}, ${envVals.dustConcentration.column}) VALUES (@${envVals.coreid.column}, @${envVals.dateTime.column}, @${envVals.temp.column}, @${envVals.humidity.column}, @${envVals.pressure.column}, @${envVals.airQuality.column}, @${envVals.dustLpo.column}, @${envVals.dustRatio.column}, @${envVals.dustConcentration.column})`)
    } catch (err) {
        errors=err;
        console.error(err);
    };
    if (errors) { res.status(500).send({ error: errors.message }) }
    else {
        console.dir(data);
        res.status(200).send(`Success! Data saved to ${envVals.table.name} table.`) }
};

// GET particle data visualization index page
exports.particle_get = (req, res) => {
    res.redirect('html/index.html');
}

// GET last hour of particle data
exports.data_last_hour = async (req, res) => {
    let errors;
    
    // SQL request to get sensor readings from database
    try {
        const pool = await poolPromise;
        const results = await pool.request()
            .query(preparedSQL + `WHERE datetime BETWEEN (DATEADD(hh, -1, GETDATE())) and (GETDATE())`);
        res.json(results.recordsets[0])
    } catch (err) {
        errors=err;
        console.error(err);
    };
};

// GET last 24 hours of particle data
exports.data_last_24_hours = async (req, res) => {
    let errors;
    
    // SQL request to get sensor readings from database
    try {
        const pool = await poolPromise;
        const results = await pool.request()
            .query(preparedSQL + `WHERE datetime BETWEEN (DATEADD(hh, -24, GETDATE())) and (GETDATE())`);
        res.json(results.recordsets[0])
    } catch (err) {
        errors=err;
        console.error(err);
    };
};

// GET last 7 days of particle data
exports.data_last_7_days = async (req, res) => {
    let errors;
    
    // SQL request to get sensor readings from database
    try {
        const pool = await poolPromise;
        const results = await pool.request()
            .query(preparedSQL + `WHERE datetime BETWEEN (DATEADD(hh, -168, GETDATE())) and (GETDATE())`);
        res.json(results.recordsets[0])
    } catch (err) {
        errors=err;
        console.error(err);
    };
};

// GET last 30 days of particle data
exports.data_last_30_days = async (req, res) => {
    let errors;
    
    // SQL request to get sensor readings from database
    try {
        const pool = await poolPromise;
        const results = await pool.request()
            .query(preparedSQL + `WHERE datetime BETWEEN (DATEADD(hh, -720, GETDATE())) and (GETDATE())`);
        res.json(results.recordsets[0])
    } catch (err) {
        errors=err;
        console.error(err);
    };
};

// GET all time particle data
exports.data_all_time = async (req, res) => {
    let errors;
    
    // SQL request to get sensor readings from database
    try {
        const pool = await poolPromise;
        const results = await pool.request()
            .query(preparedSQL);
        res.json(results.recordsets[0])
    } catch (err) {
        errors=err;
        console.error(err);
    };
};