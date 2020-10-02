var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
   
    var xAxis=d3.axisBottom(xScale)
    
    
    var yAxis=d3.axisLeft(yScale)
    
    
    
    d3.select("svg")
    .append("g")
    .attr("transform","translate(115,490)")
    .call(xAxis)
    
        d3.select("svg")
    .append("g")
    .attr("transform","translate(115,70)")
    .call(yAxis)
 
}

var drawLabels = function(graphDim,margins)
{
  var labels=d3.select("svg")
  .append("g")
  .classed("labels",true)
  
  labels.append("text")
    .text("People in Kentucky Affected by Domestic Abuse")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",(graphDim.width/2))
    .attr("y",margins.top + 0)
    
    labels.append("text")
    .text("Gender")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.bottom +450)
    
    labels.append("g")
    .attr("transform","translate(20,"+((graphDim.height/2))+")")
    .append("text")
    .text("Domestic Abuse Numbers")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(90)")
}

var initGraph = function(victims)
{
    //size of screen
    var screen = {width:800,height:600}
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
    
    
    var xScale = d3.scaleLinear()
        .domain("gender")
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([1000,20000])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawLabels(graph,margins);
    
    
    
    
    
    
}


var successFCN = function(victims)
{
    console.log("victim",victims);
    initGraph(victims);
}

var failFCN = function(error)
{
    console.log("error",error);
}

var genPromise = d3.csv("genderabuse.csv")
genPromise.then(successFCN,failFCN);
