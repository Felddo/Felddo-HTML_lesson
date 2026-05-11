import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([false, true]);
    const [grapgType, setGrapgType] = useState(0);
    let [needToDraw, setNeedToDraw] = useState(false)

    const handleSubmit = (event) => {
        if (event.target["oy"][1].checked === false && event.target["oy"][0].checked === false) {
            event.target["oy"][0].parentElement.style.color = "red";
            setNeedToDraw(false);
        } else setNeedToDraw(true);

        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][1].checked, event.target["oy"][0].checked]);
        setGrapgType(event.target["graphType"].value)
    };

    const handleChange = (event) => {
        if (event.target.checked) {
            event.target.parentElement.style.color = "black";
            setNeedToDraw(true);
        }
    }

    const createArrGraph =(data, key) => {   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['m2']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }

        if (ox == 'Год') arrGraph.sort(function (a, b) {
            return a.labelX - b.labelX;
        });
        return arrGraph;
    }

    return (
        <>
        <h4>Визуализация</h4>
        <form onSubmit={ handleSubmit }>
            <p>Значение по оси OX:</p>
            <div>
                <input type="radio" name="ox" value="Кол-во гостей" defaultChecked={ox === "Страна"}/>
                Кол-во гостей
                <br />
                <input type="radio" name="ox" value="Улица" />
                Улица
            </div>

            <p>Значение по оси OY</p>
            <div>
                <input type="checkbox" id="maxH" name="oy" defaultChecked={oy[1] === true} onChange={handleChange}/>
                <label for="maxH" name="label_oy_1">Максимальная квадратура</label><br/>
                <input type="checkbox" id="minH" name="oy" onChange={handleChange}/>
                <label for="minH" name="label_oy_2">Минимальная квадратура</label>
            </div>

            <p>
                <label for="graphType">Тип графика</label>
                <select id="graphType">
                    <option value="0">Точечная диаграмма</option>
                    <option value="1">Гистограмма</option>
                </select>
            </p>

            <p>
                <button type="submit">Построить</button>
            </p>
        </form>
        {needToDraw && (<ChartDraw data={ createArrGraph(props.data, ox) } 
                                oy={ oy.reduce(function (sm, curr) { if (curr == true) return sm + curr; return 0}) } 
                                type={ grapgType }/>)}
        </>
    );
};

export default Chart;