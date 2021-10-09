const form = document.querySelector('.add-news-form');
const headline = document.querySelector('#headline')
const author = document.querySelector('#author')
const description = document.querySelector('#description')
const upload = document.querySelector('#upload')
const submitButton = document.querySelector('.btn-submit')
const loaderDiv = document.querySelector('.loader-div')
const infoMessage = document.querySelector('.info-message')

const articleId = localStorage.editArticle

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    loaderDiv.innerHTML = `<div class="loader"></div>`

    submitButton.setAttribute("disabled", true);
    submitButton.style.cursor = "not-allowed";

    const payload = {
        headline: headline.value,
        author: author.value,
        description: description.value,
    }

    const file = upload.files[0];

    const res = await editNewsArticle(payload, articleId)
    if (res) {
        await fileUpload(file, articleId)
        window.location = "https://compassionate-volhard-4a1844.netlify.app/"
    } else {
        infoMessage.innerHTML = `<div class="error-message">Something went wrong, please check input fields !!</div>`
    }
    loaderDiv.innerHTML = "";
    submitButton.setAttribute("disabled", false);
    submitButton.style.cursor = "pointer";
})

async function loadState() {
    if (localStorage.editArticle) {
        const newsArticle = await getArticleById(localStorage.editArticle)
        headline.value = newsArticle.headline
        author.value = newsArticle.author
        description.value = newsArticle.description
    }
    localStorage.removeItem("editArticle")
}

loadState()