// Set render location on page
const id = "#pressure"
const containerID = "pressure_chart_area"

// Set dimensions and margins of the graph
// Set dimensions and margins of the graph
let margin = {top: 20, right: 30, bottom: 35, left: 55},
    width = document.getElementById(containerID).clientWidth - margin.left - margin.right,
    height = (width / 3.236) - margin.top - margin.bottom;

// Set the ranges
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// Define the line
let valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.pressure); });

function renderPressure(data) {
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.pressure; }));

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));
}

function updatePressure(data) {
    // Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.pressure; }));

    // Select the section we want to apply our changes to
    let svg = d3.select(id).transition();

    // Make the changes
    svg.select(".line")   // change the line
        .duration(750)
        .attr("d", valueline(data));
    svg.select(".x.axis") // change the x axis
        .duration(750)
        .call(d3.axisBottom(x));
    svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(d3.axisLeft(y));
}

export { renderPressure, updatePressure };