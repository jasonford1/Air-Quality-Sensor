const { sql } = require('../config/database')

class EnvVals {
    constructor(uid, coreid, dateTime, temp, humidity, pressure, airQuality, dustLpo, dustRatio, dustConcentration) {
        this.table = {};
        this.table.name = '[env-vals]';

        this.uid = {};
        this.uid.value = uid;
        this.uid.type = sql.Int;
        this.uid.column = '[uid]';

        this.coreid = {};
        this.coreid.value = coreid;
        this.coreid.type = sql.NVarChar(70);
        this.coreid.column = 'coreid';

        this.dateTime = {};
        this.dateTime.value = dateTime;
        this.dateTime.type = sql.DateTime2;
        this.dateTime.column = 'datetime';

        this.temp = {};
        this.temp.value = temp;
        this.temp.type = sql.SmallInt;
        this.temp.column = 'temp'

        this.humidity = {};
        this.humidity.value = humidity;
        this.humidity.type = sql.TinyInt;
        this.humidity.column = 'humidity';

        this.pressure = {};
        this.pressure.value = pressure;
        this.pressure.type = sql.SmallInt;
        this.pressure.column = 'pressure'

        this.airQuality = {};
        this.airQuality.string = (typeof airQuality === 'string') ? airQuality : 
            (airQuality === 0) ? 'Fresh Air' :
            (airQuality === 1) ? 'Low Pollution' :
            (airQuality === 2) ? 'High Pollution' :
            (airQuality === 3) ? 'Danger' : null;
        this.airQuality.value = (typeof airQuality === 'number') ? airQuality :
            (airQuality === 'Fresh Air') ? 0 : 
            (airQuality === 'Low Pollution') ? 1 :
            (airQuality === 'High Pollution') ? 2 :
            (airQuality === 'Danger') ? 3 : null;;
        this.airQuality.type = sql.TinyInt;
        this.airQuality.column = 'air_quality';

        this.dustLpo = {};
        this.dustLpo.value = dustLpo;
        this.dustLpo.type = sql.Int;
        this.dustLpo.column = 'dust_lpo';

        this.dustRatio = {};
        this.dustRatio.value = dustRatio;
        this.dustRatio.type = sql.Decimal(15,7);
        this.dustRatio.column = 'dust_ratio';

        this.dustConcentration = {};
        this.dustConcentration.value = dustConcentration;
        this.dustConcentration.type = sql.Decimal(15,7)
        this.dustConcentration.column = 'dust_concentration'
    }
}

module.exports = EnvVals;