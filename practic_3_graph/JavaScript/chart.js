// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {  
  
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['m2']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ    
    const keyX = dataForm.querySelector('input[name="ox"]:checked').value; 
        
    // создаем массив для построения графика
    let arrGraph = createArrGraph(data, keyX);
    if (keyX == 'Кол-во гостей') arrGraph.sort(function (a, b) {
        return a.labelX - b.labelX;
    });
    
    const svg = d3.select("svg")  
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }
       
    let graphType = dataForm.querySelector('select[id="graphType"]').value;

    let oxChecked = dataForm.querySelectorAll('input[type="checkbox"]:checked');
    let mxY = Array.from(oxChecked).map(function (item) {return +item.value});
    let doubleRounds = (oxChecked.length == 2) ? 3 : 0;
    for (item of oxChecked) {
        const color = (item.value == 0) ? "blue" : "red";
        const [scX, scY] = createAxis(svg, arrGraph, attr_area, mxY);
        if (graphType == "point") createChartCircle(svg, arrGraph, scX, scY, attr_area, color, item.value, (color == "blue")? doubleRounds : 0);
        if (graphType == "gist") createChartRect(svg, arrGraph, scX, scY, attr_area, color, item.value, (color == "blue")? doubleRounds : 0);
        if (graphType == "graph") createChartLine(svg, arrGraph, scX, scY, attr_area, color, item.value, (color == "blue")? doubleRounds : 0);
    }  
}

function createAxis(svg, data, attr_area, minMax){
    if (minMax.length > 1) {
        min = d3.min(data.map(d => d.values[0]));
        max = d3.max(data.map(d => d.values[1]));
    } else { [min, max] = d3.extent(data.map(d => d.values[minMax]));}

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX))
                    .range([0, attr_area.width - 2 * attr_area.marginX]);
                    
    const scaleY = d3.scaleLinear()
                    .domain([min * 0.85, max * 1.1 ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);               
     
     // создание осей
     const axisX = d3.axisBottom(scaleX); // горизонтальная 
     const axisY = d3.axisLeft(scaleY); // вертикальная

     // отрисовка осей в SVG-элементе
     svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY]
}

function createChartCircle(svg, data, scaleX, scaleY, attr_area, color, i, plus) {
    const r = 4;
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 0)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(0))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY + plus})`)
        .style("fill", color)
        .style("opacity", 0)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("r", r)
        .attr("cy", d => scaleY(d.values[i]))
        .style("opacity", 1);
}

function createChartRect(svg, data, scaleX, scaleY, attr_area, color, i, plus) {
    const [min, max] = d3.extent(data.map(d => d.values[0]));
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("y", d => scaleY(0))
        .attr("width", 3)
        .attr("height", 0)
        .attr("transform", `translate(${attr_area.marginX + plus}, ${attr_area.marginY})`)
        .style("fill", color)
        .transition()
        .duration(500)
        .delay((d, i) => i * 50)
        .attr("y", d => scaleY(d.values[i]))
        .attr("height", d => scaleY(min * 0.85) - scaleY(d.values[i]));
}

function createChartLine(svg, data, scaleX, scaleY, attr_area, color, i, plus) {
    const lineGenerator = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + attr_area.marginX)
        .y(d => scaleY(d.values[i]) + attr_area.marginY + plus)
        .curve(d3.curveMonotoneX); 

    const chart = svg.append("path")
        .attr("d", lineGenerator(data))
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", 2);

    const totalLength = chart.node().getTotalLength();
    chart.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
}