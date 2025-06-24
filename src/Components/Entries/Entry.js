// const formatter = new Intl.DateTimeFormat(navigator.language).format(date)
import { currentDate } from '../EntryCollection.js'

function intToDuration(seconds) {

    let hours = Math.floor(seconds / 3600)
    let hoursString = hours ? hours + 'h' : ''

    let minutes = Math.floor((seconds - hours * 3600) / 60)
    let minutesString = minutes ? minutes + 'm' : ''

    let connector = hours && minutes ? ' ' : ''

    return hoursString + connector + minutesString
}

function endDate(item) {
    let d = new Date(item.scheduled)
    d.setSeconds(d.getSeconds() + item.length_t)
    return d
}

function RunnersDisplay({ runners }) {
    const urlRegex = /\[(.*)\]\((.*)\)/

    const runnersArray = runners.split(',')
    return <>
        {runnersArray.map((r, i) => {
            let runner = r.trim()

            let result = urlRegex.exec(runner)

            if (result && result.length === 3) {
                return <span className='runner-display' key={i}><a href={result[2]} target='_blank'>{result[1]}</a></span>
            }
            else {
                return <span className='runner-display' key={i}>{runner}</span>
            }
        })}
    </>
}

export default function Entry({ item }) {
    const date = new Date(item.scheduled)
    const platformName = (item.data[2] ?? '').replace('Nintendo Entertainment System', "NES")
    const actualRunners = item.data[1] ?? ''

    return <div className={'entry' + (date < currentDate ? ' active' : '')} >
        <div className='run-time-wrapper'>
            <div className='run-time'>{date.toLocaleTimeString().replace(':00 ', ' ')} - {endDate(item).toLocaleTimeString().replace(':00 ', ' ')}</div>
            <div className='run-duration'>{intToDuration(item.length_t)}</div>
            {item.data[2] !== 'N/A' ? <div className='platform'>{platformName}</div> : ''}
        </div>
        <div className='run-title'>{item.data[0]} {item.data[3] ? ' - ' + item.data[3] : ''}</div>
        {actualRunners ? <div className='runner'>Runner{actualRunners.trim().includes(' ') ? 's' : ''}: <RunnersDisplay runners={actualRunners} /></div> : ''}
        <div className='hidden'>
            {JSON.stringify(item)}
        </div>
    </div>
}