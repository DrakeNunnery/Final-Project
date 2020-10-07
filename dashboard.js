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
    .attr("style", function(vic)
          {
        if(vic.Victim == "Men") {
            return "fill:blue;";
        } else if(vic.Victim == "Women") {
            return "fill:pink;";
        } else {
            return "fill:green;";
        }
    })
    .on("mouseover",function(vic)
{   
        var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")
        
        d3.select("#tooltip").select("#data")
          .text("Total Victims: "+vic.Amount);
})
.on("mouseout",function()
{
    d3.select("#tooltip")
    .classed("hidden",true)
})
}


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
    .attr("transform", makeTranslateString(margins.left + 0, 350))
    .call(xAxis)
    
        d3.select("#gend")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 50))
    .call(yAxis)
    
}

var drawLabels = function(graphDim,margins)
{
  var labels=d3.select("#gend")
  .append("g")
  .classed("labels",true)
  
  labels.append("text")
    .text("Domestic Abuse Cases Between Men, Women, and Children in Kentucky")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.top - 10)
    
    labels.append("text")
    .text("Group")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.bottom + 338)
    
    labels.append("g")
    .attr("transform","translate(20,"+((graphDim.height/2) + 30)+")")
    .append("text")
    .text("Domestic Abuse Numbers")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(270)")
}

var initGraph = function(victimdata)
{
    //size of screen
    var screen = {width:800,height:400}
    //how much space on each side
    var margins = {left:80,right:50,top:50,bottom:50}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
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
    
    
}

var drawBarsDrink=function(rates,graphDim,target,xScale,yScale)
{
    console.log(rates)
    target.selectAll("rect")
    .data(rates)
    .enter()
    .append("rect")
    .attr("x",function(rate)
          {
        console.log(xScale(rate.gender))
        return xScale(rate.gender);
    })
    .attr("y",function(rate)
                    {
     return yScale(rate.excessiveDrinkers);
 })
    .attr("width", xScale.bandwidth)
    .attr("height",function(rate)
          {
     return graphDim.height-yScale(rate.excessiveDrinkers);
    })
    .attr("style", function(rate)
          {
        if(rate.gender == "Male") {
            return "fill:blue;";
        } else {
            return "fill:pink;";
        }
    })
    .on("mouseover",function(rate)
{   
        var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")
        
        d3.select("#tooltip").select("#data")
          .text("Total Drinkers: "+rate.excessiveDrinkers);
})
.on("mouseout",function()
{
    d3.select("#tooltip")
    .classed("hidden",true)
})
}

var drawAxesDrink = function(graphDim,margins,
                         xScale,yScale)
{
   
    var xAxis=d3.axisBottom(xScale)
    
    
    var yAxis=d3.axisLeft(yScale)
    
    
    
    d3.select("#drink")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 350))
    .call(xAxis)
    
        d3.select("#drink")
    .append("g")
    .attr("transform", makeTranslateString(margins.left + 0, 50))
    .call(yAxis)
    
}

var drawLabelsDrink = function(graphDim,margins)
{
  var labels=d3.select("#drink")
  .append("g")
  .classed("labels",true)
  
  labels.append("text")
    .text("Excessive Drinkers by Gender in Kentucky")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.top - 10)
    
    labels.append("text")
    .text("Gender")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left + (graphDim.width/2))
    .attr("y",margins.bottom + 338)
    
    labels.append("g")
    .attr("transform","translate(20,"+((graphDim.height/2))+")")
    .append("text")
    .text("Number of Excessive Drinkers")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(270)")
}

var initGraphDrink = function(rates)
{
    //size of screen
    var screen = {width:800,height:400}
    //how much space on each side
    var margins = {left:80,right:50,top:50,bottom:50}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#drink")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#drink")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain(["Male","Female"])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,500000])
        .range([graph.height,0])
    
    drawAxesDrink(graph,margins,xScale,yScale);
    drawLabelsDrink(graph,margins);
    drawBarsDrink(rates,graph,target,xScale,yScale)
    
    
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

var drinkSuccessFCN = function(rates)
{
    console.log("rates",rates);
    initGraphDrink(rates);
}

var drinkFailFCN = function(error)
{
    console.log("error",error);
}

var genPromise = d3.csv("gender.csv")
genPromise.then(successFCN,failFCN);

var drinkingPromise = d3.csv("drinkingrate.csv")
drinkingPromise.then(drinkSuccessFCN,drinkFailFCN);

