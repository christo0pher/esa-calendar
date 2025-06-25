import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import EntryCollection from './Components/EntryCollection.js'

import filters from './filter.json'

var isChecked = false
var inputFilter = ''

function App() {
    const currentDate = new Date()

    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [allItems2, setAllItems2] = useState([])

    const [itemsLoaded, setItemsLoaded] = useState(false)
    const [items2Loaded, setItems2Loaded] = useState(false)
    const [items, setItems] = useState({})
    const [items2, setItems2] = useState({})

    const applyFilters = () => {
        let allItemsOne = allItems.filter((item) => {
            let itemEndDate = new Date(item.scheduled)
            itemEndDate.setSeconds(itemEndDate.getSeconds() + item.length_t)
            return (isChecked || filters.some((f) => {
                return (item.data[0].includes(f))
            })) && (item.data[0].toLowerCase().includes(inputFilter.toLowerCase()) || inputFilter.length === 0) && itemEndDate > currentDate
        })
        let objects = Object.groupBy(allItemsOne, i => { return (new Date(i.scheduled)).toLocaleDateString() })
        setItems(objects)
    }

    const applyFilters2 = () => {
        let allItemsTwo = allItems2.filter((item) => {
            let itemEndDate = new Date(item.scheduled)
            itemEndDate.setSeconds(itemEndDate.getSeconds() + item.length_t)
            return (isChecked || filters.some((f) => {
                return (item.data[0].includes(f))
            })) && (item.data[0].includes(inputFilter) || inputFilter.length === 0) && itemEndDate > currentDate
        })
        let objects2 = Object.groupBy(allItemsTwo, i => { return (new Date(i.scheduled)).toLocaleDateString() })
        setItems2(objects2)
    }

    const handleChange = event => {
        inputFilter = event.target.value
        applyFilters()
        applyFilters2()
    }

    const checkHandler = event => {
        isChecked = event.target.checked
        applyFilters()
        applyFilters2()
    }

    const loadedData = function (d) {
        if (!loaded && !!d && !!d.items) {
            setLoaded(true)
            setAllItems(d.items)
        }
    }

    const loadedData2 = function (d) {
        if (!loaded2 && !!d && !!d.items) {
            setLoaded2(true)
            setAllItems2(d.items)
        }
    }

    const [fff, setFilters] = useState([])

    if (!filters.length) {
        fetch('/filter.json').then(response => {
            return response.json()
        }).then(json => {
            if (json.length) {
                setFilters(json)
            }
        })
    }
    else {
        if (!itemsLoaded && allItems.length) {
            setItemsLoaded(true)
            applyFilters()
        }
        if (!items2Loaded && allItems2.length) {
            setItems2Loaded(true)
            applyFilters2()
        }
    }

    if (!loaded) {
        window.addEventListener('loadedData', e => {
            loadedData(e.detail.data)
        })
    }

    if (!loaded2) {
        window.addEventListener('loadedData2', e => {
            loadedData2(e.detail.data)
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                {Object.keys(items).length ? 
                <div className="stream-wrapper">
                    <div className="stream-header">Stream 1</div>
                    <EntryCollection items={items} streamUrl='https://twitch.tv/esamarathon2' />
                    </div> : ''}
                {Object.keys(items2).length ?
                <div className="stream-wrapper">
                    <div className="stream-header">Stream 2</div>
                     <EntryCollection items={items2} streamUrl='https://twitch.tv/esamarathon2' />
                    </div> : ''}
                <div className="switch-mode">
                    <label htmlFor="checkbox">Show all</label>
                    <input
                        type="checkbox"
                        id="checkbox"
                        onChange={checkHandler}
                    />
                </div>
                <div className="search-input">
                    <input onChange={handleChange} placeholder='search'></input>
                </div>
          </header>
        </div>
  );
}

export default App;