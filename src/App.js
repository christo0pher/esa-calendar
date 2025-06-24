import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import EntryCollection from './Components/EntryCollection.js'

import filters from './filter.json'

function App() {
    const currentDate = new Date()

    const [isChecked, setIsChecked] = useState(false)

    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [allItems2, setAllItems2] = useState([])

    const [items, setItems] = useState({})
    const [items2, setItems2] = useState({})

    const loadedData = function (d) {
        if (!loaded) {
            setLoaded(true)
            setAllItems(d.items)
        }
    }

    const loadedData2 = function (d) {
        if (!loaded2) {
            setLoaded2(true)
            setAllItems2(d.items)
        }
    }

    const [filters, setFilters] = useState([])

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
        if (!Object.keys(items).length && allItems.length) {
            let allItemsOne = allItems.filter((item) => {
                let itemEndDate = new Date(item.scheduled)
                itemEndDate.setSeconds(itemEndDate.getSeconds() + item.length_t)
                return filters.some((f) => {
                    return item.data[0].includes(f) || isChecked
                }) && itemEndDate > currentDate
            })
            let objects = Object.groupBy(allItemsOne, i => { return (new Date(i.scheduled)).toLocaleDateString() })
            console.log('setting objects')
            setItems(objects)
        }
        if (!Object.keys(items2).length && allItems2.length) {
            let allItemsTwo = allItems2.filter((item) => {
                let itemEndDate = new Date(item.scheduled)
                itemEndDate.setSeconds(itemEndDate.getSeconds() + item.length_t)
                return filters.some((f) => {
                    return item.data[0].includes(f) || isChecked
                }) && itemEndDate > currentDate
            })
            let objects2 = Object.groupBy(allItemsTwo, i => { return (new Date(i.scheduled)).toLocaleDateString() })
            console.log('setting objects')
            setItems2(objects2)
        }
    }


    /* 
    
    let filteredTwo = allItems2.filter((item) => {
        let itemEndDate = new Date(item.scheduled)
        itemEndDate.setSeconds(itemEndDate.getSeconds() + item.length_t)
        return filters.some((f) => {
            return item.data[0].includes(f)
        }) && itemEndDate > currentDate
    })
    setItems2(Object.groupBy(filteredTwo, i => { return (new Date(i.scheduled)).toLocaleDateString() }))

    /*
    fetch('/data.json').then(response => {
        return response.json()
    }).then(json => {
        loadedData(json.data)
        loadedData2(json.data)
    })
    */

    window.addEventListener('loadedData', e => {
        loadedData(e.detail.data)
    })

    window.addEventListener('loadedData2', e => {
        loadedData2(e.detail.data)
    })

    const checkHandler = () => {
        setIsChecked(!isChecked)
        setItems2({})
        setItems({})
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="stream-wrapper">
                    <div className="stream-header">Stream 1</div>
                    {Object.keys(items).length ? <EntryCollection items={items} streamUrl='https://twitch.tv/esamarathon2' /> : <img src={logo} className="App-logo" alt="logo" />}
                </div>
                <div className="stream-wrapper">
                    <div className="stream-header">Stream 2</div>
                    {Object.keys(items2).length ? <EntryCollection items={items2} streamUrl='https://twitch.tv/esamarathon2' /> : <img src={logo} className="App-logo" alt="logo" />}
                </div>
                <div className="switch-mode">
                    <label htmlFor="checkbox">Show all</label>
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={isChecked}
                        onChange={checkHandler}
                    />
                </div>
          </header>
        </div>
  );
}

export default App;


/*

                <div className="switch-mode">
                    <label htmlFor="checkbox">Show only next run</label>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={checkHandler}
                    />
                </div>

                */