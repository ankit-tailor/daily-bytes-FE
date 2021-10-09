const BASE_URL = "https://shrouded-castle-62232.herokuapp.com/api/v1"

const API_ENDPOINT = {
    getAllNews: (BASE_URL, sort) => `${BASE_URL}/getAllNews/${sort}`,

    getArticleById: (BASE_URL, articleId) => `${BASE_URL}/newsArticle/${articleId}`,

    addNewsArticle: (BASE_URL) => `${BASE_URL}/newsArticle`,

    editNewsArticle: (BASE_URL, articleId) => `${BASE_URL}/newsArticle/${articleId}`,

    deleteNewArticle: (BASE_URL, articleId) => `${BASE_URL}//newsArticle/${articleId}`,

    fileUpload: (BASE_URL, articleId) => `${BASE_URL}/newsThumbnail/upload/${articleId}`,

}