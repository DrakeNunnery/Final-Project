//counties is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawBars = function(people,target,graphDim,
                         xScale,yScale,colorScale)
{
 target.selectAll("rect")
    .data(people)
    .enter()
    .append("rect")
    .attr("x",function(pep)
{
  return xScale(pep.Arested);   
 })
    .attr("y",function(pep)
          {
     return yScale(pep.Perentage);
 })
    .attr("width", xScale.bandwidth)
    .attr("height",function(pep)
          {
     return graphDim.height-yScale(pep.Perentage);
 })
    .attr("fill", colorScale(people.people));
    
    
    
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
   var xAxis=d3.axisBottom(xScale)
    
    
    var yAxis=d3.axisLeft(yScale)
    
    
    
    d3.select("svg")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 485))
    .call(xAxis)
    
        d3.select("svg")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 65))
    .call(yAxis)
    
 
}


//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
  var labels=d3.select("svg")
  .append("g")
  .classed("labels",true)
  
  labels.append("text")
    .text("% People Arrested With Proir DV Charges")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",(graphDim.width))
    .attr("y",margins.top + 0)
    
    labels.append("text")
    .text("Gender")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.bottom +420)
    
    labels.append("g")
    .attr("transform","translate(20,"+((graphDim.height/2))+")")
    .append("text")
    .text("Percentage Arrested")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(270)")
}




//sets up several important variables and calls the functions for the visualization.
var initGraph = function(people)
{
    //size of screen
    var screen = {width:600,height:600}
    //how much space on each side
    var margins = {left:120,right:20,top:60,bottom:120}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain(["Men","Women"])
        .range([0,graph.width])
    .paddingInner(.10)

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graph.height,0])
    
    var colorScale=d3.scaleOrdinal()
    .range(["red"])
    
    drawAxes(graph,margins,xScale,yScale);
    drawBars(people,target,graph,xScale,yScale,colorScale);
    drawLabels(graph,margins);
    
    
    
    
    
    
}




var successFCN = function(people)
{
    console.log("people",people);
    initGraph(people);
}

var failFCN = function(error)
{
    console.log("error",error);
}

var statPromise = d3.csv("sheet5.csv")
statPromise.then(successFCN,failFCN);