// select items
const selectElem = document.querySelector('select#select');
// new option
function newOption(data) {
    // get title of data
    const title = data.title;
    if (typeof title != "undefined") {
        // create new element : option
        const optionBox = document.createElement("option");
        // countires
        optionBox.innerHTML = title;
        // append the new element
        selectElem.appendChild(optionBox);
    }
}
// fetch data _ singleData / manipuate data
function manipulateData(data) {
    // get country items : cases, deaths ....
    for  (eachItem in data.countryitems[0]){
        const signleData = data.countryitems[0][eachItem];
        newOption(signleData);
        selectElem.addEventListener('change', function(e) {
            // choose country => show single data
            if(e.target.value == signleData.title) {
                let totalCases = signleData.total_cases;
                let totalRecovered = signleData.total_recovered;
                let totalUnresolved = signleData.total_unresolved;
                let totalDeaths = signleData.total_deaths;
                let total_new_cases_today = signleData.total_new_cases_today;
                let total_new_deaths_today = signleData.total_new_deaths_today;
                let totalActive_today = signleData.total_active_cases;
                let totalSerious = signleData.total_serious_cases;

                // divs
                let cardTemplate = `
                <div class="row justify-content-center">
                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2" id="cases">Cases</h2>
                        <p>${totalCases}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2" id="recovered">Recovered</h2>
                        <p>${totalRecovered}</p>
                    </div>
                    
                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2">Unresolved</h2>
                        <p>${totalUnresolved}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2" id="deaths">Deaths</h2>
                        <p>${totalDeaths}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h3 class="mb-2">New cases for today</h3>
                        <p>${total_new_cases_today}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h3 class="mb-2">New deaths for today</h3>
                        <p>${total_new_deaths_today}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2" id="active">Active cases</h2>
                        <p>${totalActive_today}</p>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
                        <h2 class="mb-2">Serious cases</h2>
                        <p>${totalSerious}</p>
                    </div>
                `;
                // insert divs elements
                const wrapper = document.querySelector('.wrapper');
                wrapper.innerHTML = cardTemplate;
            }
        });
    }
}
// fetch API
const fetchData = fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL')
.then(response => {    // handle response data
    return response.json();
})
.then(data => {
    manipulateData(data);
})
.catch(err => {
    // if there is an error in fetching data
    err.alert("Feiled to fetch data !");
})

var time = new Date(),
    year = time.getFullYear();

document.querySelector('#footer').textContent = "© boularbah ismail - " + year;