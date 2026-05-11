import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

    let min = 0;
    let max = 0;
    if (props.oy == 2) {
        min = d3.min(props.data.map(d => d.values[0]));
        max = d3.max(props.data.map(d => d.values[1]));
    }
    else {
        [min, max] = d3.extent(props.data.map(d => d.values[props.oy]));
    }

	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    });

	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;
	const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);


    const createChartCircle = (svg, i, plus) => {
        svg .selectAll(".dot")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[i] ) )
            .attr("transform", `translate(${margin.left}, ${margin.top - plus})`)
            .style("fill", (i == 1) ? "red" : "blue")
    }

    const createChartRect = (svg, i, plus) => {
        svg .selectAll(".bar")
            .data(props.data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("y", d => scaleY(d.values[i]))
            .attr("width", 3)
            .attr("height", d => scaleY(min * 0.85) - scaleY(d.values[i])) // высота от значения до нуля
            .attr("transform", `translate(${margin.left - plus}, ${margin.top})`)
            .style("fill", (i == 1) ? "red" : "blue")
    }

    const type = [createChartCircle, createChartRect];

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        if (props.oy == 2) {type[props.type](svg, 0, 0); type[props.type](svg, 1, 3);}
        else {type[props.type](svg, props.oy, 0);}

    }, [scaleX, scaleY, props.data]);



    return (
      <svg ref={chartRef}> </svg>
	)
}

export default ChartDraw;