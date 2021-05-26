let apiKey = "dba5e76f812249659544212938c0328f";
let newsAccordion = document.getElementById("news-articles");
let serachElement = document.getElementById("search");
let mode = document.getElementById("mode");


const baseAPI = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

async function fetchNews() {
    const response = await fetch(`${baseAPI}`);
    const data = await response.json();
    const result = data.articles;
    const html = result.map(
        (element) => ` <li class="article" id="article">
                        <img class="article-img" src="${element["urlToImage"]}" alt="">
                        <h2 class="article-title">${element["title"]}</h2>
                        <p class= "article-description">${element["description"]}</p>
                        <span class="article-author">${element["author"]}</span><br>
                        <a  href="${element["url"]}" class="btn"> Read More ....</a>
                        </li>`
    );
    newsAccordion.innerHTML = html.join("");
}

async function handleSearch(event) {
    const value = event.target.value;
    if (value.length == 0) {
        fetchNews();
    } else {
      
        const serachAPI = `https://newsapi.org/v2/everything?q=${value}&apiKey=${apiKey}`;
        const searchResponse = await fetch(`${serachAPI}`);
        const serachData = await searchResponse.json();
        const searchResult = serachData.articles;
        if (searchResult.length == 0) {

            const html = ` <li class="article" id="article">
                            <h2 class="article-title">No articals was found on the</h2>
                            <p class= "article-description">${value}</p>
                            </li>`;
            newsAccordion.innerHTML = html;
        } else {
            const html = searchResult.map(
                (element) => ` <li class="article" id="article">
                    <img class="article-img" src="${element["urlToImage"]}" alt="">
                    <h2 class="article-title">${element["title"]}</h2>
                    <p class= "article-description">${element["description"]}</p>
                    <span class="article-author">${element["author"]}</span><br>
                    <a  href="${element["url"]}" class="btn"> Read More ....</a>
                    </li>`
            );
            newsAccordion.innerHTML = html.join("");
        }
    }
}
if (serachElement.value.length == 0) {
    fetchNews();
}

serachElement.addEventListener("keyup", handleSearch);


//change mode dark and light
mode.addEventListener("click", function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
});
