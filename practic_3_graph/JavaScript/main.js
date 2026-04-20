document.addEventListener("DOMContentLoaded", function() {
    createTable(rooms, 'list');

    let drawButton = document.querySelector('input[value="Построить"]');
    let dataForm = document.getElementById('graph');
    let maxH = document.querySelector('label[for="maxH"]');
    let minH = document.querySelector('label[for="minH"]');

    let findButton = document.querySelector('input[value="Найти"]');
    let clearButton = document.querySelector('input[value="Очистить фильтры"]');
    let sortButton = document.querySelector('input[value="Сортировать"]');
    let delsortButton = document.querySelector('input[value="Сбросить сортировку"]');
    let dataFormFilter = document.getElementById('filter');
    let dataSort = document.getElementById('sort');
    let firstSort = document.getElementById('fieldsFirst');
    let secondSort = document.getElementById('fieldsSecond');

    setSortSelects(rooms, dataSort);

    drawButton.addEventListener('click', function() {
        if (error()) drawGraph(rooms, dataForm);
    });

    maxH.addEventListener('click', function() {
        removeError();
    });

    minH.addEventListener('click', function() {
        removeError();
    });

    findButton.addEventListener('click', function() {
        filterTable(rooms, 'list', dataFormFilter);
    });

    clearButton.addEventListener('click', function() {
        clearFilter(rooms, 'list', dataFormFilter);
        resetSort('list', rooms, dataSort);
    });

    firstSort.addEventListener('change', function() {
        changeNextSelect(this, 1, dataSort);
    });

    secondSort.addEventListener('change', function() {
        changeNextSelect(this, 2, dataSort);
    });

    sortButton.addEventListener('click', function() {
        sortTable('list', dataSort);
    });

    delsortButton.addEventListener('click', function() {
        resetSort('list', rooms, dataSort);
        clearFilter(rooms, 'list', dataFormFilter);
    });

    function error() {
        let oxChecked = document.querySelectorAll('input[type="checkbox"]:checked');
        if (oxChecked.length == 0) {
            maxH.classList.add("error");
            minH.classList.add("error");
            return 0;
        }
        return 1;
    }

    function removeError() {
        maxH.classList.remove('error');
        minH.classList.remove('error');
    }
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
     arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => { 
    const head = Object.keys(data[0]);
    const allSelect = dataForm.getElementsByTagName('select');
    
    for (const item of allSelect) {
        setSortSelect(head, item);
    }
    allSelect[1].disabled = true;
    allSelect[2].disabled = true;
}

const changeNextSelect = (curSelect, nextSelectId, dataSort) => {
    const allSelect = dataSort.getElementsByTagName('select');
    allSelect[nextSelectId].disabled = false;
    Array.from(allSelect).forEach((item, index) => {

        if (index >= nextSelectId) {
            item.innerHTML = curSelect.innerHTML;
            if (curSelect.value != 0) {
                const optionToRemove = item.querySelector(`option[value="${curSelect.value}"]`);
                optionToRemove.remove();
            } else {
                item.disabled = true;
            }
        }

    });
}
