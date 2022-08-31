

const fetchPhoneData = async (search, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const result = await res.json();
    displayPhoneData(result.data, dataLimit);
};

const displayPhoneData = (phones, dataLimit) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // show error message
    const errorMessage = document.getElementById('error-message');
    if (phones.length < 1) {
        errorMessage.classList.remove('d-none');
    } else {
        errorMessage.classList.add('d-none')
    }

    // display 10 items
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        showAll.classList.remove('d-none');
        phones = phones.slice(0, 10);
    } else {
        showAll.classList.add('d-none');
    }


    phones.forEach(phone => {
        console.log(phone)
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
        </div>
       `;

        cardContainer.appendChild(newDiv);
    });
    loadSpinner(false);
};


// load spinner 
const loadSpinner = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');
    }
}

// load phone data
const laodPhoneData = (dataLimit) => {
    loadSpinner(true);
    const searchInputFeild = document.getElementById('search-input-feild');
    const searchInputFeildValue = searchInputFeild.value;
    fetchPhoneData(searchInputFeildValue, dataLimit);
}


// search btn 
document.getElementById('search-btn').addEventListener('click', () => {
    laodPhoneData(10);
})


// show all button
document.getElementById('show-all-btn').addEventListener('click', () => {
    laodPhoneData();
});


// enter for search feild 
document.getElementById('search-input-feild').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        laodPhoneData(10);
    }
})

// fetchPhoneData('oppo');