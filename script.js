var margin = {top: 20, right: 100, bottom: 30, left: 100};
var width = 1080 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var domainwidth = width - margin.left - margin.right;
var domainheight = height - margin.top - margin.bottom;
var xDom = d3.scaleLinear().domain([0,5]).range([margin.left , 550])

var svg = d3.select("#plot").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("transform", "translate(50,0)")
// Min and 95th percentile for domain
function getRadius(ip, value){
    domain = null
    switch(ip) {
      case 0:
        if(value > 4401){break;}
            domain = [68, 4401]
        break;
      case 1:
        if(value > 8907){break}
            domain = [11, 8907]
        break;
      case 2:
        if(value > 5319){break}
        domain = [424, 5319]
        break;
      case 3:
        if(value > 167){break}      
        domain = [9, 167]
        break;
      case 4:
        if(value > 5560){break}      
        domain = [91, 5560]
        break;
      case 5:
        if(value > 235){break}            
        domain = [5, 235]
        break;
      case 6:
        if(value > 201){break}                  
        domain = [8, 201]
        break;
      case 7:   
        if(value > 951){break}                           
        domain = [55, 951]
        break;
      case 8:
        if(value > 4735){break}                                 
        domain = [7, 4735]
        break;
      case 9:
        if(value > 3669){break}                                       
        domain = [4, 3669]
        break;

      default:
        domain = [4, 3669]
    }
    if (domain == null){return 35}
    rad = d3.scaleLinear().domain(domain).range([5,30])
    return rad(value)
}
function getFill(ip, value){
    domain = null
    switch(ip) {
      case 0:
        if(value > 4401){break;}
            domain = [68, 4401]
        break;
      case 1:
        if(value > 8907){break}
            domain = [11, 8907]
        break;
      case 2:
        if(value > 5319){break}
        domain = [424, 5319]
        break;
      case 3:
        if(value > 167){break}      
        domain = [9, 167]
        break;
      case 4:
        if(value > 5560){break}      
        domain = [91, 5560]
        break;
      case 5:
        if(value > 235){break}            
        domain = [5, 235]
        break;
      case 6:
        if(value > 201){break}                  
        domain = [8, 201]
        break;
      case 7:   
        if(value > 951){break}                           
        domain = [55, 951]
        break;
      case 8:
        if(value > 4735){break}                                 
        domain = [7, 4735]
        break;
      case 9:
        if(value > 3669){break}                                       
        domain = [4, 3669]
        break;

      default:
        domain = [4, 3669]
    }
    if (domain == null){return 'red'}
    fillScale = d3.scaleLinear()
                    .domain(domain)
                    .range(['#1a9850','#d73027'])
                    .interpolate(d3.interpolateHcl); //interpolateHsl interpolateHcl interpolateRgb 
    return fillScale(value)
}

var parseDate = d3.timeParse("%d-%b-%y");
var formatDate = d3.timeFormat("%m-%d");

var startDate = new Date("2006-07-01 "),
    endDate = new Date("2006-09-30");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width])
    .clamp(true);

var currentDate = svg.append("text")
                     .attr("x", (width/2) + 50)
                     .attr("y", 300)
                     .style('font-family', 'laso')
                     .style('font-size', '40')
                     .style('text-anchor', 'middle')
svg.selectAll('ips')
    .data([0,1,2,3,4,5,6,7,8,9])
    .enter()
    .append('text')
    .attr("x", function(d){
        return xDom(d)})
    .attr("y", 50)
    .attr('text-anchor', 'middle')
    .style('font-family', 'laso')
    .style('font-size', 24)
    .text(function(d){return(d)})

svg.selectAll('ips_circles')
    .data([0,1,2,3,4,5,6,7,8,9])
    .enter()
    .append('circle')
    .attr("cx", function(d){
        return xDom(d)})
    .attr("cy", 100)
    .attr('r', 30)
    .style('fill', 'white')
    .style('stroke', '#590909')
    .style('stroke-width',3)
svg.append('rect')
    .attr('x', 270)
    .attr('y', 350)
    .attr('height', 150)
    .attr('width', 450)
    .style('fill', 'white')
    .style('stroke', 'black')
svg.append('circle')
    .attr("cx", 320)
    .attr("cy", 375)
    .attr('r', 15)
    .style('fill', 'white')
    .style('stroke', '#590909')
    .style('stroke-width',3)
svg.append('text')
    .attr("x", 350)
    .attr("y", 380)
    .style('font-family', 'laso')
    .style('font-size', 18)
    .text('95th percentile for the number of connections')

svg.selectAll('leg_circ')
    .data([3000, 2000, 1000, 100])
    .enter()
    .append('circle')
    .attr('cx', 320)
    .attr('cy', 420)
    .attr('r', function(d){
      return getRadius(9, d) - 8})
    .attr('fill', function(d){
      return getFill(9, d)
    })
svg.append('text')
    .attr("x", 350)
    .attr("y", 425)
    .style('font-family', 'laso')
    .style('font-size', 18)
    .text('Relative number of connections made')

svg.append('line')
    .attr('x1', 320)
    .attr('x2', 320)
    .attr('y1', 450)
    .attr('y2', 470)
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
svg.append('text')
    .attr("x", 350)
    .attr("y", 465)
    .style('font-family', 'laso')
    .style('font-size', 18)
    .text('Number of machines w/ anomalous behavior')

d3.csv('anoms.csv', function(error, data ){
  data.forEach(function(d){
    d.anom = +d.anom;
    d.date = new Date(d.date);
  })
  svg.selectAll('anomticks')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', function(d){
        return x(d.date)
      })
      .attr('x2', function(d){
        return x(d.date)
      })
      .attr('y1', 200)
      .attr('y2', function(d){
        return 200 - (d.anom*10)
      })
      .attr('transform', 'translate(78,0)')
      .style('stroke', 'red')
      .style('stroke-width', 2)
})

d3.csv("grouped.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.val = +d.val;
    d.ip = +d.ip
  });    

    var curr_date = ''

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(75,200)");
    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            // .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
              currentValue = d3.event.x;
              hue(x.invert(currentValue)); 
            })
        );


    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
        .data(x.ticks(10))
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDate(d)})

    slider.selectAll('ticks')
        .data(x.ticks(10))
        .enter()
        .append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', 5)
        .attr('y2', 13)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    // hue(startDate)
    var bubbles = null

    function drawCircles(dataset){

        bubbles = svg.selectAll('bubble')
            .data(dataset)
            .enter()
            .append("circle")
            .attr("id", function(d){
                return 'ip_' + d.ip
            })
            .attr('r', 0)
            .attr("cx", function(d){
                return xDom(d.ip)})
            .attr("cy", 100)
            .style("fill", function(d){
                return getFill(d.ip, d.val)})        
            .style('opacity', 0.5)
            .attr("r", function(d){
                return getRadius(d.ip, d.val)
            })
        }
    function hue(h) {
      // console.log(h)
      if(curr_date != formatDate(h)){
        curr_date = formatDate(h)
        currentDate.text('Current Date: ' + curr_date)
        handle.attr("cx", x(h));
          dataset = data.filter(function(d){
            return d.date =="2006-"+curr_date      
          })
          if(bubbles){
            // bubbles.transition().duration(10).attr("r", 0)
            bubbles.remove()
          }
          drawCircles(dataset)
      }else{
        return
      }
  }
})
