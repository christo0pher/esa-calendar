import Entry from './Entries/Entry.js'

const currentDate = new Date();

const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

function weekDay(date) {
    return weekDays[date.getDay()]
}

export default function EntryCollection({ items }) {
    return <div className="items-list">
        {Object.keys(items).map((key, index) => {
            let date = (new Date(items[key][0].scheduled))
            return <div className='sub-list-wrapper' key={ index }>
                <div className='sub-list-header'>{ weekDay(date)} {date.toLocaleDateString()}</div>
                <div key={key} className='sub-list'>
                {items[key].map((item, i) => (<Entry item={item} key={i} />))}
                </div>
            </div>
        })}
    </div>
}

export { currentDate };