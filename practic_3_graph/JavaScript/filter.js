const correspond = {
    "Название": "name",
    "Улица": "street",
    "Тип": "type",
    "Номер квартиры": "numRoom",
    "Кол-во комнат": ["roomFrom", "roomTo"],
    "Кол-во гостей": ["questsFrom", "questsTo"],
    "m2": ["metersFrom", "metersTo"]
}

const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    for (const item of dataForm.elements) {
        let valInput = item.value;
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
        else if (item.type === "number") {
            if (valInput !== '') valInput = Number(valInput);
            else {
                if (item.id && item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id && item.id.includes("To")) {
                    valInput = Infinity;
                }
            }
        }
        dictFilter[item.id] = valInput;
    } 
    return dictFilter;
}


const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    if (Object.values(datafilter).toString() === ['Найти', '', '', '', '', -Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity, 'Очистить фильтры'].toString()) {
        clearTable(idTable);
        quickHeader(data, idTable);
    }
    else {
        let tableFilter = data.filter(item => {
            let result = true;
            Object.entries(item).forEach(([key, val]) => {
                if (typeof val == 'string') {
                    result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
                } 
                else if (typeof val == 'number') {
                    if (key === "Кол-во комнат") {
                        result &&= val >= datafilter.roomFrom && val <= datafilter.roomTo;
                    } else if (key === "Кол-во гостей") {
                        result &&= val >= datafilter.questsFrom && val <= datafilter.questsTo;
                    } else if (key === "m2") {
                        result &&= val >= datafilter.metersFrom && val <= datafilter.metersTo;
                    }
                }
            });

            return result;
        });
        clearTable(idTable);
        createTable(tableFilter, idTable);
    }  
}

const clearFilter = (data, idTable, dataForm) => {
    const labels = dataForm.querySelectorAll('input[type="text"], input[type="number"]');
    for (const item of labels) item.value = '';
    clearTable(idTable);
    createTable(data, idTable);
}