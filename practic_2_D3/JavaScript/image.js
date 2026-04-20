function drawSmile(svg) {
        let cat = svg.append("g")
        .style("stroke-width", 2)
    
    cat.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "#f4a261")
        .style("stroke", "#e76f51");
    
    cat.append("polygon")
        .attr("points", "-70,-25 0,-60 70,-25")
        .style("fill", "#00bbf5")
        .style("stroke", "#000000");
    
    // cat.append("circle")
    //     .attr("cx", -20)
    //     .attr("cy", -10)
    //     .attr("r", 7)
    //     .style("fill", "#fff")
    //     .style("stroke", "#333");
    // cat.append("circle")
    //     .attr("cx", 20)
    //     .attr("cy", -10)
    //     .attr("r", 7)
    //     .style("fill", "#fff")
    //     .style("stroke", "#333");

    cat.append("polygon")
        .attr("points", "-30,-10 -10,-10 -10,-11 -30,-11")
        .style("fill", "#000000")
        .style("stroke", "#000000");

    cat.append("polygon")
        .attr("points", "10,-10 30,-10 30,-11 10,-11")
        .style("fill", "#000000")
        .style("stroke", "#000000");

    // cat.append("circle")
    //     .attr("cx", -20)
    //     .attr("cy", -10)
    //     .attr("r", 3)
    //     .style("fill", "#ffffff")
    //     .style("stroke", "none");
    // cat.append("circle")
    //     .attr("cx", 20)
    //     .attr("cy", -10)
    //     .attr("r", 3)
    //     .style("fill", "#ffffff")
    //     .style("stroke", "none");
    
    cat.append("polygon")
        .attr("points", "-2,2 5,2 -5,10")
        .style("fill", "#ff6b6b")
        .style("stroke", "#c92a2a")
        .style("stroke-width", "1.5");
    
    cat.append("line")
        .attr("x1", -15)
        .attr("y1", 8)
        .attr("x2", -40)
        .attr("y2", 4)
        .style("stroke", "#555")
        .style("stroke-width", "1.5");
    cat.append("line")
        .attr("x1", -15)
        .attr("y1", 12)
        .attr("x2", -42)
        .attr("y2", 12)
        .style("stroke", "#555")
        .style("stroke-width", "1.5");
    
    cat.append("line")
        .attr("x1", 15)
        .attr("y1", 8)
        .attr("x2", 40)
        .attr("y2", 4)
        .style("stroke", "#555")
        .style("stroke-width", "1.5");
    cat.append("line")
        .attr("x1", 15)
        .attr("y1", 12)
        .attr("x2", 42)
        .attr("y2", 12)
        .style("stroke", "#555")
        .style("stroke-width", "1.5");

    cat.append("circle")
        .attr("cx", 0)
        .attr("cy", 30)
        .attr("r", 10)
        .style("fill", "#ff0000")
        .style("stroke", "#ec7927");
    
    return cat;  
}   