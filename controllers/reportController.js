// // controllers/reportController.js
// const { Pool } = require('pg');
// const { DateTime } = require('luxon');  // Keep only one import statement

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'useme123',
//   port: 5432,
// });



// const reportStatus = {};
// let reportIdCounter = 1;

// function generateReportId() {
//   const newReportId = `report_${reportIdCounter}`;
//   reportIdCounter += 1;
//   return newReportId;
// }

// async function fetchDataFromPostgres() {
//   try {
//     const client = await pool.connect();

//     // // Fetch data from store_activity table
//     // const activityResult = await client.query('SELECT  * FROM store_activity');
//     // const activityData = activityResult.rows;
//     // console.log('store_activity data:', activityData);
   
//     // // Fetch data from menu_hours table
//     // const hoursResult = await client.query('SELECT * FROM menu_hours');
//     // const hoursData = hoursResult.rows;

//     // // Fetch data from new_table table
//     // const timezoneResult = await client.query('SELECT * FROM new_table');
//     // const timezoneData = timezoneResult.rows;
//     // Fetch data from store_activity table
// const activityResult = await client.query('SELECT * FROM store_activity');
// const activityData = activityResult.rows;
// // console.log('store_activity data:', activityData.map(entry => entry.store_id));

// // Fetch data from menu_hours table
// const hoursResult = await client.query('SELECT *FROM menu_hours');
// const hoursData = hoursResult.rows;

// // Fetch data from new_table table
// const timezoneResult = await client.query('SELECT * FROM new_table');
// const timezoneData = timezoneResult.rows;


//     client.release();

//     return { activityData, hoursData, timezoneData };
//   } catch (error) {
//     throw new Error(`Error fetching data from PostgreSQL: ${error.message}`);
//   }
// }

// // // Placeholder function for filtering data by business hours
// // function filterDataByBusinessHours(data, businessHours) {
// //   // Your logic here to filter data based on business hours
// //   // For example, you may compare timestamps with start_time_local and end_time_local
// //   return data; // Placeholder; replace with actual logic
// // }

// // // Placeholder function for interpolation
// // function interpolateData(data) {
// //   // Your interpolation logic here
// //   // For example, you may use linear interpolation between observations
// //   return data; // Placeholder; replace with actual logic
// // }

// // // Placeholder function for calculating uptime/downtime within business hours
// // function calculateIntervalUptimeDowntime(intervalData) {
// //   // Your logic here to calculate uptime/downtime within the specified interval
// //   // Make sure this takes into account only observations within business hours
// //   return { uptime: 60, downtime: 30 }; // Placeholder; replace with actual logic
// // }

// // Placeholder function for filtering data by business hours
// function filterDataByBusinessHours(data, businessHours) {
//   // Your logic here to filter data based on business hours
//   // For example, you may compare timestamps with start_time_local and end_time_local
//   const filteredData = data.filter(entry => {
//     const timestamp = new Date(entry.timestamp_utc);
//     const dayOfWeek = timestamp.getUTCDay();
//     const businessHour = businessHours.find(bh => bh.dayOfWeek === dayOfWeek);

//     if (!businessHour) {
//       // If business hours are missing, assume the store is open 24/7
//       return true;
//     }

//     const startTime = new Date(entry.timestamp_utc);
//     startTime.setUTCHours(businessHour.start_time_local.substring(0, 2));
//     startTime.setUTCMinutes(businessHour.start_time_local.substring(3, 5));

//     const endTime = new Date(entry.timestamp_utc);
//     endTime.setUTCHours(businessHour.end_time_local.substring(0, 2));
//     endTime.setUTCMinutes(businessHour.end_time_local.substring(3, 5));

//     return timestamp >= startTime && timestamp <= endTime;
//   });

//   return filteredData;
// }

// // Placeholder function for interpolation
// function interpolateData(data) {
//   // Your interpolation logic here
//   // For example, you may use linear interpolation between observations
//   const interpolatedData = []; // Placeholder; replace with actual logic
//   return interpolatedData;
// }

// // Placeholder function for calculating uptime/downtime within business hours
// function calculateIntervalUptimeDowntime(intervalData) {
//   // Your logic here to calculate uptime/downtime within the specified interval
//   // Make sure this takes into account only observations within business hours
//   const uptime = intervalData.filter(entry => entry.status === 'active').length;
//   const downtime = intervalData.filter(entry => entry.status === 'inactive').length;

//   return { uptime, downtime };
// }

// function calculateUptimeDowntime(activityData, hoursData, timezoneData) {
//   // Filter data by business hours
//   const businessHoursData = filterDataByBusinessHours(activityData, hoursData);

//   // Interpolate data to fill in gaps between periodic observations
//   const interpolatedData = interpolateData(businessHoursData);

//   // Calculate uptime and downtime for the specified intervals
//   const uptimeDowntimeLastHour = calculateIntervalUptimeDowntime(interpolatedDataLastHour);
//   const uptimeDowntimeLastDay = calculateIntervalUptimeDowntime(interpolatedDataLastDay);
//   const uptimeDowntimeLastWeek = calculateIntervalUptimeDowntime(interpolatedDataLastWeek);

//   return {
//     uptime_last_hour: uptimeDowntimeLastHour.uptime,
//     downtime_last_hour: uptimeDowntimeLastHour.downtime,
//     uptime_last_day: uptimeDowntimeLastDay.uptime,
//     downtime_last_day: uptimeDowntimeLastDay.downtime,
//     uptime_last_week: uptimeDowntimeLastWeek.uptime,
//     downtime_last_week: uptimeDowntimeLastWeek.downtime,
//     store_id,
//   };
// }

// function generateReport(storeData) {
//   // Extract data from the three tables
//   const { activityData, hoursData, timezoneData } = storeData;

//   // Assuming you have a function to calculate uptime and downtime based on the three data sets
//   const { uptime_last_hour, downtime_last_hour, uptime_last_day, downtime_last_day, uptime_last_week, downtime_last_week,store_id } = calculateUptimeDowntime(activityData, hoursData, timezoneData);

//   return {
//     uptime_last_hour,
//     downtime_last_hour,
//     uptime_last_day,
//     downtime_last_day,
//     uptime_last_week,
//     downtime_last_week,
//     store_id,
//   };
// }


// function calculateUptimeDowntime(activityData, hoursData, timezoneData) {
//   // Your logic to calculate uptime and downtime based on the three data sets
//   // This is a placeholder, replace it with your actual calculation logic
//   return {
//     uptime_last_hour,
//     downtime_last_hour,
//     uptime_last_day,
//     downtime_last_day,
//     uptime_last_week,
//     downtime_last_week,
//     store_id,

//   };
// }

// module.exports = {
//   triggerReport: async () => {
//     const storeData = await fetchDataFromPostgres();
//     const newReportId = generateReportId();

//     reportStatus[newReportId] = { status: 'Running', timestamp: DateTime.now().toISO() };

//     const reportData = generateReport(storeData);

//     reportStatus[newReportId] = { status: 'Complete', timestamp: DateTime.now().toISO(), data: reportData };

//     return { report_id: newReportId };
//   },

//   getReport: (reportId) => {
//     return reportStatus[reportId] || { status: 'Not Found' };
//   },
//   calculateUptimeDowntime,
// };

// controllers/reportController.js
const { DateTime } = require('luxon');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'useme123',
  port: 5432,
});

const reportStatus = {};
let reportIdCounter = 1;

function generateReportId() {
  const newReportId = `report_${reportIdCounter}`;
  reportIdCounter += 1;
  return newReportId;
}

async function fetchDataFromPostgres() {
  try {
    const client = await pool.connect();

    const activityResult = await client.query('SELECT * FROM store_activity');
    const activityData = activityResult.rows;

    const hoursResult = await client.query('SELECT * FROM menu_hours');
    const hoursData = hoursResult.rows;

    const timezoneResult = await client.query('SELECT * FROM new_table');
    const timezoneData = timezoneResult.rows;

    client.release();

    return { activityData, hoursData, timezoneData };
  } catch (error) {
    throw new Error(`Error fetching data from PostgreSQL: ${error.message}`);
  }
}

function filterDataByBusinessHours(data, businessHours) {
  const filteredData = data.filter(entry => {
    const timestamp = new Date(entry.timestamp_utc);
    const dayOfWeek = timestamp.getUTCDay();
    const businessHour = businessHours.find(bh => bh.dayOfWeek === dayOfWeek);

    if (!businessHour) {
      return true;
    }

    const startTime = new Date(entry.timestamp_utc);
    startTime.setUTCHours(businessHour.start_time_local.substring(0, 2));
    startTime.setUTCMinutes(businessHour.start_time_local.substring(3, 5));

    const endTime = new Date(entry.timestamp_utc);
    endTime.setUTCHours(businessHour.end_time_local.substring(0, 2));
    endTime.setUTCMinutes(businessHour.end_time_local.substring(3, 5));

    return timestamp >= startTime && timestamp <= endTime;
  });

  return filteredData;
}

function interpolateData(data) {
  const interpolatedData = []; // Your interpolation logic here
  return interpolatedData;
}

function calculateIntervalUptimeDowntime(intervalData) {
  const uptime = intervalData.filter(entry => entry.status === 'active').length;
  const downtime = intervalData.filter(entry => entry.status === 'inactive').length;

  return { uptime, downtime };
}

function calculateUptimeDowntime(activityData, hoursData, timezoneData) {
  const businessHoursData = filterDataByBusinessHours(activityData, hoursData);
  const interpolatedDataLastHour = interpolateData(businessHoursData);

  const uptimeDowntimeLastHour = calculateIntervalUptimeDowntime(interpolatedDataLastHour);
  // Assuming similar functions for interpolatedDataLastDay and interpolatedDataLastWeek

  return {
    uptime_last_hour: uptimeDowntimeLastHour.uptime,
    downtime_last_hour: uptimeDowntimeLastHour.downtime,
    uptime_last_day: 0, // Placeholder value, replace with actual value or calculation
    downtime_last_day: 0, // Placeholder value, replace with actual value or calculation
    uptime_last_week: 0, // Placeholder value, replace with actual value or calculation
    downtime_last_week: 0, // Placeholder value, replace with actual value or calculation
    store_id: 1, // Replace with actual store_id or use appropriate logic
  };
}

function generateReport(storeData) {
  const { activityData, hoursData, timezoneData } = storeData;
  const { uptime_last_hour, downtime_last_hour, uptime_last_day, downtime_last_day, uptime_last_week, downtime_last_week, store_id } = calculateUptimeDowntime(activityData, hoursData, timezoneData);

  return {
    uptime_last_hour,
    downtime_last_hour,
    uptime_last_day,
    downtime_last_day,
    uptime_last_week,
    downtime_last_week,
    store_id,
  };
}

module.exports = {
  triggerReport: async () => {
    const storeData = await fetchDataFromPostgres();
    const newReportId = generateReportId();

    reportStatus[newReportId] = { status: 'Running', timestamp: DateTime.now().toISO() };

    const reportData = generateReport(storeData);

    reportStatus[newReportId] = { status: 'Complete', timestamp: DateTime.now().toISO(), data: reportData };

    return { report_id: newReportId };
  },

  getReport: (reportId) => {
    return reportStatus[reportId] || { status: 'Not Found' };
  },
  calculateUptimeDowntime,
};


// // controllers/reportController.js
// const { DateTime } = require('luxon');
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'useme123',
//   port: 5432,
// });

// const reportStatus = {};
// let reportIdCounter = 1;

// function generateReportId() {
//   const newReportId = `report_${reportIdCounter}`;
//   reportIdCounter += 1;
//   return newReportId;
// }

// async function fetchDataFromPostgres() {
//   try {
//     const client = await pool.connect();

//     const activityResult = await client.query('SELECT * FROM store_activity');
//     const activityData = activityResult.rows;

//     const hoursResult = await client.query('SELECT * FROM menu_hours');
//     const hoursData = hoursResult.rows;

//     const timezoneResult = await client.query('SELECT * FROM new_table');
//     const timezoneData = timezoneResult.rows;

//     client.release();

//     return { activityData, hoursData, timezoneData };
//   } catch (error) {
//     throw new Error(`Error fetching data from PostgreSQL: ${error.message}`);
//   }
// }

// function filterDataByBusinessHours(data, businessHours) {
//   const filteredData = data.filter(entry => {
//     const timestamp = new Date(entry.timestamp_utc);
//     const dayOfWeek = timestamp.getUTCDay();
//     const businessHour = businessHours.find(bh => bh.dayOfWeek === dayOfWeek);

//     if (!businessHour) {
//       return true;
//     }

//     const startTime = new Date(entry.timestamp_utc);
//     startTime.setUTCHours(businessHour.start_time_local.substring(0, 2));
//     startTime.setUTCMinutes(businessHour.start_time_local.substring(3, 5));

//     const endTime = new Date(entry.timestamp_utc);
//     endTime.setUTCHours(businessHour.end_time_local.substring(0, 2));
//     endTime.setUTCMinutes(businessHour.end_time_local.substring(3, 5));

//     return timestamp >= startTime && timestamp <= endTime;
//   });

//   return filteredData;
// }

// function interpolateData(data) {
//   const interpolatedData = []; // Placeholder; replace with actual logic
//   return interpolatedData;
// }

// function calculateIntervalUptimeDowntime(intervalData) {
//   const uptime = intervalData.filter(entry => entry.status === 'active').length;
//   const downtime = intervalData.filter(entry => entry.status === 'inactive').length;

//   return { uptime, downtime };
// }

// function calculateUptimeDowntime(activityData, hoursData, timezoneData, store_id) {
//   const businessHoursData = filterDataByBusinessHours(activityData, hoursData);
//   const interpolatedData = interpolateData(businessHoursData);

//   const uptimeDowntimeLastHour = calculateIntervalUptimeDowntime(interpolatedData);
//   const uptimeDowntimeLastDay = calculateIntervalUptimeDowntime(interpolatedData);
//   const uptimeDowntimeLastWeek = calculateIntervalUptimeDowntime(interpolatedData);

//   return {
//     uptime_last_hour: uptimeDowntimeLastHour.uptime,
//     downtime_last_hour: uptimeDowntimeLastHour.downtime,
//     uptime_last_day: uptimeDowntimeLastDay.uptime,
//     downtime_last_day: uptimeDowntimeLastDay.downtime,
//     uptime_last_week: uptimeDowntimeLastWeek.uptime,
//     downtime_last_week: uptimeDowntimeLastWeek.downtime,
//     store_id,
//   };
// }

// function generateReport(storeData) {
//   const { activityData, hoursData, timezoneData } = storeData;

//   const { uptime_last_hour, downtime_last_hour, uptime_last_day, downtime_last_day, uptime_last_week, downtime_last_week, store_id } = calculateUptimeDowntime(activityData, hoursData, timezoneData, store_id);

//   return {
//     uptime_last_hour,
//     downtime_last_hour,
//     uptime_last_day,
//     downtime_last_day,
//     uptime_last_week,
//     downtime_last_week,
//     store_id,
//   };
// }

// module.exports = {
//   triggerReport: async () => {
//     const storeData = await fetchDataFromPostgres();
//     const newReportId = generateReportId();

//     reportStatus[newReportId] = { status: 'Running', timestamp: DateTime.now().toISO() };

//     const reportData = generateReport(storeData);

//     reportStatus[newReportId] = { status: 'Complete', timestamp: DateTime.now().toISO(), data: reportData };

//     return { report_id: newReportId };
//   },

//   getReport: (reportId) => {
//     return reportStatus[reportId] || { status: 'Not Found' };
//   },
//   calculateUptimeDowntime,
// };


