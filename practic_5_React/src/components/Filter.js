
/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
			
    const handleSubmit= (event) => {        
        event.preventDefault();		
		// создаем словарь со значениями полей формы
		const filterField = {
			"Название": event.target["name"].value.toLowerCase(),
		    "Улица": event.target["street"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Номер квартиры": event.target["numRoom"].value,
            "Кол-во комнат": [(event.target["roomFrom"].value == '') ? -Infinity : +event.target["roomFrom"].value,
                    (event.target["roomTo"].value == '') ? Infinity : +event.target["roomTo"].value],
            "Кол-во гостей": [(event.target["questsFrom"].value == '') ? -Infinity : +event.target["questsFrom"].value,
                    (event.target["questsTo"].value == '') ? Infinity : +event.target["questsTo"].value],
            "m2": [(event.target["metersFrom"].value == '') ? -Infinity : +event.target["metersFrom"].value,
                    (event.target["metersTo"].value == '') ? Infinity : +event.target["metersTo"].value]
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in filterField) {
			arr = arr.filter(item => {
                let filterKey = filterField[key];
                if (key == "Кол-во комнат" || key == "Кол-во гостей" || key == "m2") {
                    return filterKey[0] <= +item[key] && filterKey[1] >= +item[key]
                }
                else if (key == "Номер квартиры") {
                    if (filterKey == "") return true;
                    else {return +item[key] === +filterKey;}
                }
                else {return item[key].toLowerCase().includes(filterKey)}
            });  
        }  
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	}

    const handleReset= () => {
        props.filtering(props.fullData);
        props.onResetSort();

    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название:</label>
                <input name="name" type="text" />
            </p>  
            <p>
                <label>Улица:</label>		
                <input name="street" type="text" />
            </p>
            <p>
                <label>Тип:</label>		
                <input name="type" type="text" />
            </p>
            <p>
                <label>Номер квартиры:</label>		
                <input name="numRoom" type="number" />
            </p>
            <p>
                <label>Кол-во комнат от:</label>		
                <input name="roomFrom" type="number" />
            </p>
            <p>
                <label>Кол-во комнат до:</label>		
                <input name="roomTo" type="number" />
            </p>
            <p>
                <label>Кол-во гостей от:</label>		
                <input name="questsFrom" type="number" />
            </p>
            <p>
                <label>Кол-во гостей до:</label>		
                <input name="questsTo" type="number" />
            </p>
            <p>
                <label>m<sup>2</sup> от:</label>		
                <input name="metersFrom" type="number" />
            </p>
            <p>
                <label>m<sup>2</sup> до:</label>		
                <input name="metersTo" type="number" />
            </p>
            <p>         
                <button type="submit">Фильтровать</button>   
                <button type="reset">Очистить фильтр</button>
            </p>  
        </form> 
    )
}

export default Filter;