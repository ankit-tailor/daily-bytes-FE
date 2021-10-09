async function fetchAllNews(sort) {
    let url = API_ENDPOINT.getAllNews(BASE_URL, sort)
    const result = await fetch(url)
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log("Some error occured.")
        })
    return result;
}

async function getArticleById(id) {
    const url = API_ENDPOINT.getArticleById(BASE_URL, id)
    const result = await fetch(url)
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.log("Error while getting news article by id ", err)
        })
    return result;
}

async function addNewsArticle(payload) {
    const url = API_ENDPOINT.addNewsArticle(BASE_URL)
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.log("Error while adding news ", err);
        })
    return result;
}

async function editNewsArticle(payload, articleId) {
    const url = API_ENDPOINT.editNewsArticle(BASE_URL, articleId)

    const result = await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.log("Error while updating news article: " + err)
            return err;
        })
    return result
}

async function deleteNewsArticle(articleId) {
    const url = API_ENDPOINT.deleteNewArticle(BASE_URL, articleId)
    const result = await fetch(url, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.log("Error while deleting article ", err);
        })
    return result;
}