const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {   
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           direction: desc}
        ); 
    }
    return sortArr; 
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    console.log(sortArr);
    if (sortArr.length === 0) {
        clearTable(idTable);
        createTable(rooms, idTable);
        return false;
    }
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();
    rowData.sort((first, second) => {
        for (let {column, direction} of sortArr) {
            const firstCell = first.cells[column].textContent.trim();
            const secondCell = second.cells[column].textContent.trim();
            
            let comparison;
            if (column === 3 || column === 4 || column === 5 || column === 6) {
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
        return 0; 
    });
    console.log(rowData);
    table.append(headerRow);
	
	let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
	table.append(tbody);
};

const resetSort = (idTable, data, dataSort) => {
    const allSelect = dataSort.getElementsByTagName('select');
    for (const item of allSelect) {
        item.selectedIndex = 0;
    }
    allSelect[1].disabled = true;
    allSelect[2].disabled = true;

    clearTable(idTable);
    createTable(data, idTable);
};