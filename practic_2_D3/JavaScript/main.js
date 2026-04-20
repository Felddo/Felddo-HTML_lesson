document.addEventListener("DOMContentLoaded", function() {
    const formSetting = d3.select("#setting");
    let dataSetting = document.getElementById('setting');

    let resetBtn = formSetting.select("input[value='Очистить']");
    let animationBtn = formSetting.select('input[value="Анимировать"]');


    let scaleP = d3.select(d3.select("label[for='mx']").node().parentNode);
    let turnP = d3.select(d3.select("label[for='angle']").node().parentNode);
    let firstP = formSetting.select('p');

    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;


    resetBtn.on('click', function() {
        svg.selectAll('*').remove();
    });

    animationBtn.on('click', function() {
        runAnimation(dataSetting);
    });

})


function transformAlong(path, startScaleX, endScaleX, startScaleY, endScaleY, startAngle, endAngle) {
  const length = path.node().getTotalLength();
  return function(progress) {
    const point = path.node().getPointAtLength(progress * length);
    const scaleX = startScaleX + (endScaleX - startScaleX) * progress;
    const scaleY = startScaleY + (endScaleY - startScaleY) * progress;
    const angle = startAngle + (endAngle - startAngle) * progress;
    return `translate(${point.x}, ${point.y}) scale(${scaleX}, ${scaleY}) rotate(${angle})`;
  };
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);
	let path = drawPath();	
	pict.transition()
    .ease(d3.easeLinear)
    .duration(dataForm.timeAnimation.value)
    .attrTween('transform', function() {
        return transformAlong(path, +dataForm.mx.value, +dataForm.mxInvis.value, +dataForm.my.value, +dataForm.myInvis.value,
             +dataForm.angle.value, +dataForm.angleInvis.value);
    });
}