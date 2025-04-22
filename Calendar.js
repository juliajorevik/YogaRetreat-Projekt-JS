const Calendar = document.getElementById('Calendar');
const monthElement= document.getElementById('month')

const days = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

const months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj', 
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
];

const STORYBLOK_URL = 'https://api.storyblok.com/v2/cdn/stories?filter_query%5BTime%5D%5Bgt_date%5D=2023-12-31+09%3A00&starts_with=event&token=zGoAgQmLWYO2QAk7ebmi0Att';
let events

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const loadEvents = async () => {
    const response = await fetch(STORYBLOK_URL)
    const data = await response.json()
    const stories = data.stories
    events = stories.reduce((accumulator, event)=> {
        const eventTime = new Date(event.content.time)
        const eventDate = new Date(eventTime.toDateString())
        accumulator[eventDate] = event.content
        return accumulator
        
    }, {})
    console.log(events)
}
loadEvents()

const drawEmptyCalendar = () => {
    for(let i = 0; i <42; i++){
        const day = document.createElement('div');
        day.classList.add('day');

        const dayText = document.createElement('p');
        dayText.classList.add('day-text');
        dayText.innerText = days[i % 7];

        const date = document.createElement('p');
        date.classList.add('date');

        const eventName = document.createElement('small');
        eventName.classList.add('event-name');


        day.appendChild(dayText);
        day.appendChild(date); 
        day.appendChild(eventName);
        Calendar.appendChild(day);
        console.log(date);
    }
};


const updateCalendar = (month, year, events)=> {
    const dayElements = document.querySelectorAll('.day');

    const theFirst = new Date();
    theFirst.setDate(1)
    theFirst.setMonth(month);
    theFirst.setYear(year);
    
    console.log(year, month)

    const theFirstDayOfWeek = (theFirst.getDay() === 0) ? 6 : theFirst.getDay() - 1
    const monthOfYear = months[month];
    const monthYear = `${year} - ${monthOfYear}`;
    monthElement.innerText = monthYear;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    

    let dayCounter = 1;
    for (let i = 0; i < dayElements.length; i++){
        const day = dayElements[i];
        
        const date = day.querySelector('.date');

        if (i >= theFirstDayOfWeek && dayCounter <= daysInMonth){
            const thisDate = new Date(year, month, dayCounter)

            const eventName = day.querySelector('.event-name')
            if(events[thisDate]){
                const event = events[thisDate]
                eventName.innerText = `* ${event.title}`
            }
            else {
                eventName.innerText = ``
            }
            console.log(thisDate)

            date.innerText = dayCounter;
            dayCounter++;
            
        } else {
            date.innerText = '';
        }

    }
    
};


const previousMonth = () => {
    if (currentMonth === 0){
        currentMonth = 12;
        currentYear--;
    }
    updateCalendar(--currentMonth, currentYear, events);
};

const nextMonth = () => {
    if (currentMonth === 11){
        currentMonth = -1
        currentYear++;
    }
    updateCalendar(++currentMonth, currentYear, events);
};

const load = async () => {
    await loadEvents()
    drawEmptyCalendar()
    updateCalendar(currentMonth, currentYear, events)

}

load()

addEventListener('DOMContentLoaded', () =>{
    /*updateCalendar(currentMonth, currentYear);*/
})