// Set render location on page
const id = "#temp"
const containerID = "temp_chart_area"
let latestData;

// Set dimensions and margins of the graph
let margin = {top: 15, right: 30, bottom: 35, left: 40},
    width = document.getElementById(containerID).clientWidth - margin.left - margin.right,
    height = (width / 2.236) - margin.top - margin.bottom;

// Set the ranges
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// Define the line
let valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });

function renderTemp(data) {
    latestData = data;
    // Append the svg obgect to the body of the page
    // Append a 'group' element to 'svg'
    // Move the 'group' element to the top left margin
    let svg = d3.select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    //y.domain(d3.extent(data, function(d) { return d.temp; }));
    y.domain([18,28]);

    let y_axis = d3.axisLeft().scale(y).ticks(10);

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
        .call(y_axis);
        //.call(d3.axisLeft(y));
}

function updateTemp(data) {
    latestData = data;
    // Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.date; }));
    //y.domain(d3.extent(data, function(d) { return d.temp; }));
    y.domain([18,28]);

    let y_axis = d3.axisLeft().scale(y).ticks(10);

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
        .call(y_axis);
        //.call(d3.axisLeft(y));
}

export { renderTemp, updateTemp };