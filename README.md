# Particle.js
## Measure and graph indoor air quality

### Overview
During the California Wildfires of 2018 and 2019 San Francisco air quality turned dangerously unhealthy. This made me interested in having an indoor air quality monitoring station. At the end of 2019 I moved to Shenzhen, China where I again experienced multiple 'bad air' days. Faced with free time during the COVID-19 pandemic I decided to take action and build a wifi enabled air quality monitoring station.

As of October 25, 2020 this project has reached a public state and is visible at dudeyo.com/particle.

The remainder of this readme is an overview of the project architecture and a timeline of the development history. Questions, comments, and feedback are welcome at jasonford1 at gmail.

### Architecture
Hardware instructions can be found at https://docs.particle.io/quickstart/aqmk-project/

Wifi and GPIO are provided by the Particle Argon. Additional sensors measure temp, humidity, air pressure, harmful gas levels, and pm2.5 particulate levels.

The sensors are attached via sticky tack to the wall behind my desk. Sensor measurements are recorded every 30 seconds and sent over wifi to console.particle.io.

When console.particle.io receives sensor data an event is triggered that sends a webhook (POST request) to dudeyo.com/particle. The dudeyo.com Linux server receives the POST request, processes the JSON data package, and then uploads the data to an Azure SQL instance for long term storage.

When an end user visits dudeyo.com/particle the Linux server responds with a static HTML page. The backend server then requests current conditions and the last hour of data from Azure SQL. Once Azure responds the data is sent to the end user for local rendering using D3.js.

### Feature Implementation History
March 5, 2020
 *Particle Argon, sensors, and display are assembled into a cohesive working device
 *Code from https://github.com/particle-iot/air-quality-kit is customized and deployed to the Particle Argon
 *Device measures and displays air quality from my office desk

October 23, 2020
 *Particle IoT features implemented such that sensors communicate via local wifi with console.particle.io
 *Webhook implemented
 *Linux server deployed as backend for the project
 *Nginx deployed on linux server as reverse proxy
 *NodeJS and PM2 deployed as the production and development environments to maintain (yet to be written) Particle.js app
 *Data model developed and deployed to Azure SQL instance

October 25, 2020
 *Particle.js app (this repository) is written and deployed to Linux server
 *Particle.js can receive console.particle.io webhook POST request
 *Particle.js can process JSON sensor data package
 *Particle.js can send sensor data to Azure SQL database via Tedious
 **App package requirements: Express, Tedious

December 18, 2020
 *MSSQL implemented for Azure SQL connection pooling
 *Particle.js backend can process requests for last hour, 24 hours, 7 days, 30 days, or all data for all sensors
 *Particle.js frontend can render line graphs of last hour, 24 hours, 7 days, 30 days, or all data for all sensors
 **App package requirements: Express, MSSQL(added), D3(added), Tedious(removed)

December 21, 2020
 *Particle.js backend can process requests for current conditions
 *Particle.js frontend can render current conditions on top of each graph for improved at-a-glance viewing

### Future feature ideas
Notifications
 *Ability to set thresholds for notification
 *SMS or push notification sent when a threshold is met

Frontend improvements
 *Responsive graph rendering based on viewport size
 *Fix vertical spacing and padding such that Title, Heading, Subheading, and text are appropriately grouped
 *Custom date ranges for graphs
 *Graph interactively shows value at mouse location on hover

Backend improvements
 *Implement data compression strategy such that load times for 30 days and All Time data requests are smaller. Current data resolution is every 30 seconds. Primary strategy load time reduction is to reduce data resolution by finding time block averages (eg. a single data point is 5 minutes or 30 minutes of averaged 30 second data)

 ### Omnissions from this repository
 The code deployed to Particle Argon is a variation of the code found at https://github.com/particle-iot/air-quality-kit. The modifications made were primarily in changing the brightness of onboard LEDs and screen such that they dimmed or turned off, especially at night.
