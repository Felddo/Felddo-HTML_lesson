function createPathLine() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    let data = [];
    const padding = 100;
    const hx = 5;
    const hy = 2;

    let posX = padding;
    let posY = padding;

    while (posX < width - padding) {
        data.push({x: posX, y: posY});
        posX += hx;
        posY += hy;
    }

    while (posX > padding) {
        data.push({x: posX, y: posY});
        posX -= hx;
        posY += hy;
    }

    return data;
}
 
const drawPath = () => {
    const dataPoints = createPathLine();

    const line = d3.line()
        .x((d) => d ? d.x : null)
        .y((d) => d ? d.y : null)
        .defined(d => d !== null);

    const svg = d3.select("svg")  
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'none')
        .attr('fill', 'none');
        
    return path;
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}