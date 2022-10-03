// we are using the Luxon libray here
// click the cog to see the included file

// find all output tags
const locations = document.querySelectorAll("section.times div")

// run this every frame of the page
setInterval(function () {
    // for each output tag
    locations.forEach(location => {

        const output = location.querySelector("output")

        // get the data-tz bit
        // based on the database name
        // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
        const tz = location.getAttribute("data-tz")

        // get the time in that timezone
        const now = luxon.DateTime.now().setZone(tz)

        // set that to the contents, based on the format
        output.innerHTML = now.toFormat("HH:mm:ss")

        const hour = parseInt(now.toFormat("H"), 10)
        console.log(hour)
        if (hour >= 9 && hour < 17) {
            location.classList.add("tts")
        }
    })
}, 1000)
