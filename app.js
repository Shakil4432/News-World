const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const categoryContainer = document.getElementById("category_container");
    data.data.news_category.forEach((category) => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList = "flex justify-between items-center bg-red-50";
        buttonDiv.innerHTML = `
        
        <button onclick="loadData('0' + ${category.category_id})" class="btn btn-button w-80 lg:w-auto">${category.category_name}</button>
        
        `
        categoryContainer.appendChild(buttonDiv);
    })
}

const searchData = () => {
    const searchByInput = document.getElementById("searchByInput");
    const value = searchByInput.value;
    loadData(value);
}
const loadData = async (id) => {
    const loadingCircleDiv = document.getElementById("loadingCircle");
    loadingCircleDiv.classList.remove("hidden");

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();

    const loadDataContainer = document.getElementById("loadData_container");
    loadDataContainer.innerHTML = "";

    data.data.forEach((item) => {
        const loadingCircleDiv = document.getElementById("loadingCircle");
        loadingCircleDiv.classList.add("hidden");
        const cardDiv = document.createElement('div');
        cardDiv.classList = "card card-side flex flex-col lg:flex-row bg-base-100 shadow-xl";
        cardDiv.innerHTML = `
            <figure class="w-auto lg:w-[30%]"><img class="h-[100%]" src=${item.image_url} alt="Movie"/></figure>
            <div class="card-body w-96">
                <h2 class="card-title">${item.title}</h2>
                <p class="text-wrap">${item.details.slice(0, 250)}</p>
                <div class="flex flex-col lg:flex-row justify-between items-center">
                <div class="flex gap-4 justify-center items-center">
                <div>
                <img class="rounded-full w-10 h-10" src="${item.thumbnail_url}" alt="Movie"/>
            </div>
            <div>
                <h3 class="text-lg font-bold">
                    ${item.author.name}
                </h3>
                <span>
                    ${item.author.published_date}
                </span>
            </div>
            </div>
        <div>
        <span>View :
        ${item.total_view}
        </span>
        </div>
        <div>
        <div class="rating">
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
        </div>
        </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">See Details</button>
            </div>
        </div>
        </div>
        `
        loadDataContainer.appendChild(cardDiv);
    })
    
}


loadData('01');
loadCategory();