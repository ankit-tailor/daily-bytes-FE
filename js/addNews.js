const form = document.querySelector('.add-news-form');
const headline = document.querySelector('#headline')
const author = document.querySelector('#author')
const description = document.querySelector('#description')
const upload = document.querySelector('#upload')
const submitButton = document.querySelector('.btn-submit')
const loaderDiv = document.querySelector('.loader-div')
const infoMessage = document.querySelector('.info-message')

async function getArticleById(id) {
    const result = await fetch("http://localhost:5000/api/v1/newsArticle/" + id)
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.log("Error while getting news article by id ", err)
        })
    return result;
}

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

    const res = await addNewsArticle(payload)
    if (res) {
        await fileUpload(file, res._id)
        window.location = "https://compassionate-volhard-4a1844.netlify.app/"
    } else {
        infoMessage.innerHTML = `<div class="error-message">Something went wrong, please check input fields !!</div>`
    }
    loaderDiv.innerHTML = "";
    submitButton.setAttribute("disabled", false);
    submitButton.style.cursor = "pointer";
})