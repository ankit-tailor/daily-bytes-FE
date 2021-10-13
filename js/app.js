const getMain = document.querySelector(".main");
const optionsGroup = document.querySelector(".filter-grp");
const loaderDiv = document.querySelector(".loader-div");
const displayMessage = document.querySelector(".display-message");
localStorage.setItem("bookmark", JSON.stringify([]));
let sort = -1;

getMain.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-icon")) {
    if (confirm("Are you sure you want to delete news article?")) {
      const res = await deleteNewsArticle(e.target.id);
      if (res) {
        printAllNews(sort);
      } else {
        console.log("Some error happen while deleting");
      }
    }
  } else if (e.target.classList.contains("edit-icon")) {
    localStorage.setItem("editArticle", e.target.id);
    window.location =
      "https://compassionate-volhard-4a1844.netlify.app/html/editNews.html";
  } else if (e.target.classList.contains("bookmark-icon")) {
    let bookmarkArr = [];
    if (localStorage.bookmark) {
      bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    }
    console.log(bookmarkArr);
    if (!bookmarkArr.includes(e.target.id)) bookmarkArr.push(e.target.id);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
  } else if (e.target.id) {
    localStorage.setItem("newsDetails", e.target.id);
    window.location =
      "https://compassionate-volhard-4a1844.netlify.app/html/news-details.html";
  }
});

optionsGroup.addEventListener("change", (e) => {
  sort = e.target.value;
  printAllNews(sort);
});

async function printAllNews(sort) {
  getMain.innerHTML = "";
  loaderDiv.innerHTML = `<div class="loader"></div>`;
  const result = await fetchAllNews(sort);
  if (result.length > 0) {
    result.forEach(
      ({ _id, headline, author, description, date, thumbnail }) => {
        let imageUrl = `${BASE_URL}/newsThumbnail/upload/${thumbnail}`;
        if (!thumbnail) {
          imageUrl =
            "https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
        }
        if (headline.length > 20) {
          headline = headline.substring(0, 20) + "...";
        }
        if (description.length > 30) {
          description = description.substring(0, 30) + "...";
        }
        const newNews = document.createElement("div");
        newNews.setAttribute("class", "card");
        newNews.setAttribute("id", _id);
        newNews.setAttribute("onclick", deleteNewsArticle);
        newNews.innerHTML = `
            <a href="https://compassionate-volhard-4a1844.netlify.app/html/news-details.html" style="text-decoration: none; color: #fff">
            <h3 id=${_id}>${headline}</h3>
                <div class="sub-info" id=${_id}>${new Date(
          date
        ).toLocaleDateString()} • ${author}</div>
                <img id=${_id} src=${imageUrl}
                alt="news_thumbnail" />
                <p class="description" id=${_id}>${description}</p>
            </a>
                <div class="option-icon">
                    <i id=${_id} class="icon edit-icon fas fa-edit"></i>
                    <i id=${_id} class="icon delete-icon far fa-trash-alt"></i>
                    <i id=${_id} class="icon bookmark-icon fas fa-bookmark"></i>
            </div>      
        `;
        getMain.appendChild(newNews);
      }
    );
  } else {
    displayMessage.innerHTML = `<div class="error-message" style="width: 80%; margin: auto;">There are articles at the moment, <a style="color: #fff" href="https://compassionate-volhard-4a1844.netlify.app/html/addNews.html">click here</a> to add one!!</div>`;
  }
  loaderDiv.innerHTML = "";
}

printAllNews(sort);
