const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// selectors
const movieBox = document.querySelector(".movie-area");
const searchmovieBox = document.querySelector(".search-movie-area");

const getmovies = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();
    console.log(responseData);
    showMovies(responseData);
}

const showMovies = (data) => {
    movieBox.innerHTML = "";
    data.results.forEach(element => {
        const items = document.createElement("div");
        items.classList.add("item");
        const imageabsolutepath = element.poster_path === null ? "/movie-image.png" : IMGPATH + element.poster_path;
        items.innerHTML = `
        <img src="${imageabsolutepath}" alt="${element.original_title}" id="${element.original_title}" height="200px" width="200px">
        <div class="details">
            <h2 class="title" onclick="movieshow()">${element.original_title}</h2>
            <span class="rating">${element.vote_average}</span>
            <p><b>Overview:</b> ${element.overview.slice(0, 100) + "..."}</p>
        </div>
        `;
        movieBox.appendChild(items);
    });
}
const searchInput = document.querySelector("#search-item");
searchInput.addEventListener('keyup', (e) => {
    if (!e.target.value == "") {
        getmovies(SEARCHAPI + e.target.value);
    }
    else {
        getmovies(APIURL);
    }
});

// init call 
getmovies(APIURL);

async function movieshow(){
    // let detail = document.getElementsByClassName("item");
    let title = document.getSelection("title").anchorNode.data;
    console.log(title);
    let searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`);
    let searchResponsedata = await searchResponse.json();
    let fetchData = searchResponsedata.results;
    for (let index = 0; index < 1; index++) {
        const e = fetchData[index];
        if(e.original_title === title){
        const singleimageabsolutepath = e.poster_path === null ? "/movie-image.png" : IMGPATH + e.poster_path;
        const singletitle = e.original_title === null ? "No title found" :e.original_title;
        const singlerating = e.vote_average === null ? "No rating found" :e.vote_average;
        const singleoverview = e.overview === null ? "No overview found" :e.overview;
        movieBox.innerHTML = `
        <div class="single-movie">
        <button id="back-btn" onclick="redirect()">Back to the movies screen</button>
        <img src="${singleimageabsolutepath}" alt="movie" width="80%">
        <h2>${singletitle}</h2>
        <span class="single-rating">Rating: ${singlerating}</span>
            <h3>Overview</h3>
            <p>${singleoverview}</p>
            <p>Release Date: ${e.release_date}</p>
            <p>Language: ${e.original_language}</p>
            <p>Popularity: ${e.popularity}</p>
            <p>Vote Count: ${e.vote_count}</p>
        </div>
        `;}
        else{
            movieBox.innerHTML = `<h2>Movie Details Not Found</h2>`;
        }
        
    }
    // searchResponsedata.results.forEach((e)=>{
    //     const singleimageabsolutepath = e.poster_path === null ? "/movie-image.png" : IMGPATH + e.poster_path;
    //     const singletitle = e.original_title === null ? "No title found" :e.original_title;
    //     const singlerating = e.vote_average === null ? "No rating found" :e.vote_average;
    //     const singleoverview = e.overview === null ? "No overview found" :e.overview;
    //     movieBox.innerHTML = `
    //     <div class="single-movie">
    //     <button id="back-btn" onclick="redirect()">Back to the movies screen</button>
    //     <img src="${singleimageabsolutepath}" alt="movie" height="600px" width="600px">
    //     <h2>${singletitle}</h2>
    //     <span class="single-rating">Rating: ${singlerating}</span>
    //         <h3>Overview</h3>
    //         <p>${singleoverview}</p>
    //     </div>
    //     `;
    // })
}
function redirect(){
    window.location = "http://127.0.0.1:5500/index.html";
}