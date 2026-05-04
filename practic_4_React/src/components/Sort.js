import React, { useState, useEffect } from 'react';

const Sort = (props) => {
    const keys = Object.keys(props.data[0]);
    const options = [...keys]
    let option = [];

    const [selectedVal, setselectedVal] = useState(["Нет", "Нет", "Нет"]);
    const [disabledData, setdisabledData] = useState([0, 1, 1]);
    
    const handleFieldChange = (event) => {
        const index = Number(event.target.name);
        const newValues = [...selectedVal];
        const newDisabled = [...disabledData];
        if (event.target.value == "Нет") {
            for (let i = index; i <= 2; i++ ) { newValues[i] = "Нет"; newDisabled[i + 1] = 1; }
        } else {
            newValues[index] = event.target.value;
            newDisabled[index + 1] = 0;
        }
        setselectedVal(newValues);
        setdisabledData(newDisabled);
    }


    const delItem = (arr, toDel) => {
        const newArr = selectedVal.slice(0, toDel);
        return arr.filter(key => !newArr.includes(key));
    }

    const convertOption = (arr) => {
        return ["Нет", ...arr].map((item, idx) => <option key={idx}>{item}</option>);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const sortArr = [];
        selectedVal.forEach((item, i) => {
            if (item !== "Нет") sortArr.push({column: item, direction: event.target[`fields_${i + 1}`].checked});
        });

        if (sortArr.length === 0) {
            handleReset();
        }

        let rowData = [...props.data];
        rowData.sort((first, second) => {
            for (let {column, direction} of sortArr) {
                const firstCell = first[column];
                const secondCell = second[column];
                
                let comparison;
                if (column == "Кол-во комнат" || column == "Номер квартиры" || column == "Кол-во гостей" || column == "m2") {
                    const firstVal = parseFloat(firstCell) || 0;
                    const secondVal = parseFloat(secondCell) || 0;
                    comparison = firstVal - secondVal;
                }
                else {
                    comparison = firstCell.localeCompare(secondCell);
                }		      
                if (comparison !== 0) {
                    return (direction ? -comparison : comparison);
                }
            }
        });
        props.sorting(rowData);
    };


    const handleReset= () => {
        setselectedVal(["Нет", "Нет", "Нет"]);
        setdisabledData([0, 1, 1]);
        props.sorting(props.fullData);
        props.onResetFilter();
    }


    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p> Сортировать по</p>
            <p>
                <select name="0" onChange={ handleFieldChange } value={selectedVal[0]}>
                    { convertOption(delItem(options, 0)) }
                </select>
                по убыванию? <input type="checkbox" name="fields_1"/>
            </p>
            
            <p> 
                <select name="1" disabled={ disabledData[1] } onChange={ handleFieldChange } value={selectedVal[1]}>
                    { convertOption(delItem(options, 1)) }
                </select> 
                по убыванию? <input type="checkbox" name="fields_2" disabled={ disabledData[1] }/>
            </p>
            <p> 
                <select name="2" disabled={ disabledData[2] } onChange={ handleFieldChange } value={selectedVal[2]}>
                    { convertOption(delItem(options, 2)) }
                </select> 
                по убыванию? <input type="checkbox" name="fields_3" disabled={ disabledData[2] }/>
            </p>

            <button type="submit">Сортировать</button> 
            <button type="reset">Сбросить сортировку</button>
        </form> 
    )
}

export default Sort;