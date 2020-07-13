// select items
const selectElement = document.querySelector('select#select');
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
        selectElement.appendChild(optionBox);
    }
}
// fetch data _ singleData / manipuate data
function manipulateData(data) {
    // get country items : cases, deaths ....
    for  (eachItem in data.countryitems[0]){
        const signleData = data.countryitems[0][eachItem];
        newOption(signleData);
        selectElement.addEventListener('change', function(e) {
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
                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                    <h2 class="mb-2" id="cases">Total <br> cases</h2>
                        <h5 id='all'>${totalCases}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h2 class="mb-2" id="recovered">Total <br> recovered</h2>
                        <h5 id='all'>${totalRecovered}</h5>
                    </div>
                
                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h2 class="mb-2" id="deaths">Total <br> deaths</h2>
                        <h5 id='all'>${totalDeaths}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                    <h2 class="mb-2">Unresolved cases</h2>
                    <h5 id='all'>${totalUnresolved}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h3 class="mb-2">New cases for today</h3>
                        <h5 id='all'>${total_new_cases_today}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h3 class="mb-2">New deaths for today</h3>
                        <h5 id='all'>${total_new_deaths_today}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h2 class="mb-2" id="active">Total active cases</h2>
                        <h5 id='all'>${totalActive_today}</h5>
                    </div>

                    <div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown" id="card">
                        <h2 class="mb-2" id="qrib">Total serious cases</h2>
                        <h5 id='all'>${totalSerious}</h5>
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
const fetchData = fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL').then(response => {    // handle response data
    return response.json();
}).then(data => {
    // data fetched
    manipulateData(data);
})
.catch(err => {
    // error fetching data => error div
    console.log("Error fetching data " + err);
    document.querySelector('.my-3').style.filter = "blur(15px)";
    document.querySelector('#select').style.filter = "blur(15px)";
    document.querySelector('#footerhh').style.filter = "blur(15px)";
    document.querySelector('.warning-msg').style.display = "block";
    document.querySelector('.wrapper').style.filter = "blur(15px)";
    document.querySelector('#select').style.display = "none";
});
// current year
var time = new Date(),
    year = time.getFullYear();

var foo = document.querySelector('#footer');
foo.textContent = "© " + year + " BOULARBAH ISMAIL";
// console.log(fetchData);

const sl = document.getElementById("select").addEventListener('click', () => {
    document.getElementById("select").classList.toggle("start");
})


