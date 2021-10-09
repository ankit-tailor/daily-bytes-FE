const contentSection = document.querySelector('.content')

const addContent = async () => {
    contentSection.innerHTML = `<div class="loader></div>`
    if (localStorage.getItem("newsDetails")) {
        const articleId = localStorage.getItem("newsDetails")
        const result = await getArticleById(articleId)
        if (result) {
            const { headline, author, description, date, thumbnail } = result;
            let imageUrl = `${BASE_URL}/newsThumbnail/upload/${thumbnail}`

            if (!thumbnail) {
                imageUrl = "https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }

            contentSection.innerHTML = `
            <h1 class="details-heading"><strong>${headline}</strong></h1>
            <p class="details-date-author">${new Date(date).toLocaleDateString()}| author: ${author}</p>
            <img class="details-banner"
                src=${imageUrl}
                alt="news_thumbnail">
            <div class="description">
                <p>${description}</p>
            </div>
            `
        } else {
            contentSection.innerHTML = `<div class="error-message">The article you are trying to find is not found!! <a style="color: white" href="https://compassionate-volhard-4a1844.netlify.app/index.html">Click here </a> to go back to home.</div>`
        }
    } else {
        contentSection.innerHTML = `<div class="error-message">The article you are trying to find is not found!! <a style="color: white" href="https://compassionate-volhard-4a1844.netlify.app/index.html">Click here </a> to go back to home.</div>`
    }
}

addContent();