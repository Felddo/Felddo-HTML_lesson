import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const [activePage, setActivePage] = useState(1);
    const [sortReset, setsortReset] = useState(0);
    const [filterReset, setfilterReset] = useState(0);
    const changeActive = (event) => {
        setActivePage(Number(event.target.innerHTML));
    };
    const updateDataTable = (value) => {
        setDataTable(value);
    };
    const resetSorting = () => {
        setsortReset(!sortReset);
    };
    const resetFiltering = () => {
        setfilterReset(!filterReset);
    };

	//количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows); 
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
          <span key={ index } onClick={ changeActive } className={ item === activePage ? "active" : "" }> { item } </span>
    );

    return( 
      <>
        <details>
            <summary> Фильтр </summary>
            <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data } onResetSort={ resetSorting } key={ filterReset }/>
        </details>

        <details>
            <summary> Сортировка </summary>
            <Sort sorting={ updateDataTable } data={ dataTable } fullData={ props.data } onResetFilter={ resetFiltering } key={ sortReset }/>
        </details>

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={ props.amountRows } numPage={ activePage }/>
        </table>

	    <div>
          {pages}
        </div>
	  </>   
    )   
}

export default Table;