var drawBars=function(victimdata,graphDim,target,xScale,yScale)
{
    console.log(victimdata)
    target.selectAll("rect")
    .data(victimdata)
    .enter()
    .append("rect")
    .attr("x",function(vic)
          {
        console.log(xScale(vic.Victim))
        return xScale(vic.Victim);
    })
    .attr("y",function(vic)
                    {
     return yScale(vic.Amount);
 })
    .attr("width", xScale.bandwidth)
    .attr("height",function(vic)
          {
     return graphDim.height-yScale(vic.Amount);
 })
}


{
var makeTranslateString = function (x, y) {
    return "translate(" + x + "," + y + ")";
 
}

var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
   
    var xAxis=d3.axisBottom(xScale)
    
    
    var yAxis=d3.axisLeft(yScale)
    
    
    
    d3.select("#gend")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 380))
    .call(xAxis)
    
        d3.select("#gend")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 58))
    .call(yAxis)
    
}

var drawLabels = function(graphDim,margins)
{
  var labels=d3.select("#gend")
  .append("g")
  .classed("labels",true)
  
  labels.append("text")
    .text("Title")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",(graphDim.width/2))
    .attr("y",margins.top + 0)
    
    labels.append("text")
    .text("Gender")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.bottom +405)
    
    labels.append("g")
    .attr("transform","translate(20,"+((graphDim.height/2))+")")
    .append("text")
    .text("Domestic Abuse Numbers")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(270)")
}


var initGraph = function(victimdata)
{
    //size of screen
    var screen = {width:800,height:800}
    //how much space on each side
    var margins = {left:80,right:50,top:50,bottom:20}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height/2 - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#gend")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#gend")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain(["Men","Women","Children"])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([1000,20000])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawLabels(graph,margins);
    drawBars(victimdata,graph,target,xScale,yScale)
    
    
}}
    
    




var successFCN = function(victims)
{
    console.log("victim",victims);
    initGraph(victims);
}

var failFCN = function(error)
{
    console.log("error",error);
}

var genPromise = d3.csv("gender.csv")
genPromise.then(successFCN,failFCN);

