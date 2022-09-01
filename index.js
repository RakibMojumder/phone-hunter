

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
    if (dataLimit && phones.length > 8) {
        showAll.classList.remove('d-none');
        phones = phones.slice(0, 8);
    } else {
        showAll.classList.add('d-none');
    }


    phones.forEach(phone => {
        // console.log(phone)
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>

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


// load phone details
const loadPhoneDetails = async (slug) => {
    // console.log(slug)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const result = await res.json();
    displayPhoneDetails(result.data);
};


const displayPhoneDetails = phoneDetails => {
    console.log(phoneDetails)
    document.getElementById('modal-title').innerText = phoneDetails.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';

    const mainFeaturesDiv = document.createElement('div');
    mainFeaturesDiv.innerHTML = `
    <h3>Main Features :</h3>
    <p><span class="fw-bold">Chip Set :</span>  ${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : ''}</p>
    <p><span class="fw-bold">Display Size :</span> ${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : ''}</p>
    <p><span class="fw-bold">Memory :</span> ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : ''}</p>
    <p><span class="fw-bold">Stroge :</span> ${phoneDetails.mainFeatures.storage ? phoneDetails.mainFeatures.storage : ''}</p>
    <p><span class="fw-bold">Relase Date :</span> ${phoneDetails.releaseDate ? phoneDetails.releaseDate : ''}</p>
    `;

    modalBody.appendChild(mainFeaturesDiv);
}


// fetchPhoneData('oppo');