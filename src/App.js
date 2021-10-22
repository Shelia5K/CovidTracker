import React, {useCallback, useState, useEffect} from 'react'
import useSortableData from './components/useSortableData'
const CountryInfo = React.lazy(() => import('./components/CountryInfo')) //для оптимизации приложения

function App() {

  const[countries, setCountries] = useState([]) //создаем и задаем состояние массиву countries
  const[countriesStore, setCountriesStore] = useState([]) //создание и задаем состояние массиву countriesStore (массив используется для работы с странами и передачи готовой работы в главный массив countries)
  const[searchString, setSearchString] = useState(""); //создание и задаем состояние строке для поиска стран
  const[modalWindow, setModalWindow] = useState(
    {
      modal: false, // модальное окно 
      CountryName: '', // название страны
      TotalConfirmed: 0, // всего подтвержденных 
      TotalDeaths: 0, // всего умерших 
      TotalRecovered: 0 // всего восстановившихся 
    })

  const req = useCallback( async() => { //используем async + await для асинхронности
    const response = await fetch("https://api.covid19api.com/summary") //fetch - предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP
    const data = await response.json() //распарсиваем response
    setCountriesStore(data.Countries) //сохраняем данные в countriesStore
    setCountries(data.Countries) //сохраняем данные в countries

  }, [])

  // поиск страны
  const searchCountry = e => {
        
    let value = e.target.value // принимаем слово, которое ввел пользователь
    setSearchString(e.target.value) // сохраняем это в строку searchString

    //проходимся по массиву countriesStore и проверяем каждую страну на содержание слова, который ввел пользователь
    const searchCountries = countriesStore.filter(country => {
      return country.Country.toLowerCase().includes(value)
    })
    setCountries(searchCountries) // меняем состояние главного массива countries на страны, которые нашли
  }

  useEffect(() => { // useEffect даёт вам возможность выполнять загрузку данных в функциональном компоненте
    req()
  }, [req]) // массив зависимостей

  //Функция useSortableData принимает элементы и необязательное начальное состояние сортировки. Возвращает объект с отсортированными элементами и функцию для повторной сортировки элементов.
  const { items, requestSort, sortConfig } = useSortableData(countries);

  //берем название класса
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (  
    <div className="App">
      <header className="app_header">STATISTIC</header>
      <p className="app_logo"></p>
      <input 
        className="app_search" 
        placeholder="Search..."
        value={searchString}
        onChange={searchCountry}
        >
      </input>

      <table>
        <thead>
          <tr>

            <th className="th_number">&#x2116;</th>

            <th><button 
              type="button"
              onClick={() => requestSort('Country')}
              className={getClassNamesFor('Country'), "th_btn"}
              >Country
              </button>
            </th>
            
            <th className="th_totalConfirmed">
              <button 
              type="button"
              onClick={() => requestSort('TotalConfirmed')}
              className={getClassNamesFor('TotalConfirmed'), "th_btn"}
              >Total Confirmed
              </button>
            </th>

          </tr>
        </thead>
        <tbody>
          { items.map((c, index) => {
            return (
              <tr key = {c.ID}>
                <td className="td_number">{index + 1}</td>
                <td><button 
                className="td_Country" 
                type="button" 
                onClick={() => setModalWindow(
                  {...modalWindow,
                    modal: true, 
                    CountryName: c.Country, 
                    TotalConfirmed: c.TotalConfirmed, 
                    TotalDeaths: c.TotalDeaths, 
                    TotalRecovered: c.TotalRecovered
                  })}
                >{c.Country}
                </button></td>
                <td className="td_totalConfirmed">{c.TotalConfirmed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <React.Suspense fallback={<p>Loading</p>}>
        <CountryInfo 
        CountryName = {modalWindow.CountryName}
        TotalConfirmed = {modalWindow.TotalConfirmed}
        TotalDeaths = {modalWindow.TotalDeaths}
        TotalRecovered = {modalWindow.TotalRecovered}  
        isOpened={modalWindow.modal}
        onButtonClose={() => setModalWindow({...modalWindow, modal: false, CountryName: '', TotalConfirmed: 0, TotalDeaths: 0, TotalRecovered: 0})}
        ></CountryInfo>
      </React.Suspense>


    </div>
  );
}

export default App;