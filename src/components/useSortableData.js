import { useMemo, useState } from 'react'

const useSortableData = (items, config = null) => {

    const [sortConfig, setSortConfig] = useState(config);

    // алгоритм сортировки для работы с любым из полей
    const sortedItems = useMemo(() => { //useMemo - используем, чтобы не сортировать страны дважды, если мы повторно предоставим компонент.
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    //функция requestSort принимает имя поля и обновляет состояние
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
}

export default useSortableData