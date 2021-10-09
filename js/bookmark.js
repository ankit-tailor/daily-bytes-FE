const getMain = document.querySelector('.main')
const optionsGroup = document.querySelector('.filter-grp');
const loaderDiv = document.querySelector('.loader-div');
const displayMessage = document.querySelector('.display-message');
let bookmarkArr = JSON.parse(localStorage.getItem("bookmark"))

getMain.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-icon")) {
        if (confirm("Are you sure you want to remove article from bookmark?")) {
            bookmarkArr = bookmarkArr.filter((id) => id !== e.target.id)
            localStorage.setItem("bookmark", JSON.stringify(bookmarkArr))
            printBookmarkNews()
        }
    } else if (e.target.id) {
        localStorage.setItem("newsDetails", e.target.id)
        window.location = "https://compassionate-volhard-4a1844.netlify.app/html/news-details.html"
    }
})

async function printBookmarkNews() {
    getMain.innerHTML = ''
    loaderDiv.innerHTML = `<div class="loader"></div>`

    if (bookmarkArr.length > 0) {
        bookmarkArr.forEach(async (articleId) => {
            let { _id, headline, author, description, date, thumbnail } = await getArticleById(articleId)
            let imageUrl = `${BASE_URL}/newsThumbnail/upload/${thumbnail}`
            if (!thumbnail) {
                imageUrl = "https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            if (headline.length > 20) {
                headline = headline.substring(0, 20) + "..."
            }
            if (description.length > 30) {
                description = description.substring(0, 30) + "..."
            }
            const newNews = document.createElement('div');
            newNews.setAttribute('class', 'card')
            newNews.setAttribute('id', _id)
            newNews.setAttribute('onclick', deleteNewsArticle)
            newNews.innerHTML = `
            <a href="https://compassionate-volhard-4a1844.netlify.app/html/news-details.html" style="text-decoration: none; color: #fff">
            <h3 id=${_id}>${headline}</h3>
                <div class="sub-info" id=${_id}>${new Date(date).toLocaleDateString()} • ${author}</div>
                <img id=${_id} src=${imageUrl}
                alt="news_thumbnail" />
                <p class="description" id=${_id}>${description}</p>
            </a>    
            <div class="option-icon">
                    <i id=${_id} class="icon delete-icon far fa-trash-alt"></i>
            </div>   
        `
            getMain.appendChild(newNews)
        })
    } else {
        displayMessage.innerHTML = `<div class="error-message" style="width: 80%; margin: auto;">There is no bookmark articles at the moment, <a style="color: #fff" href="https://compassionate-volhard-4a1844.netlify.app/index.html">click here</a> to add few!!</div>`
    }
    loaderDiv.innerHTML = ''
}

printBookmarkNews();