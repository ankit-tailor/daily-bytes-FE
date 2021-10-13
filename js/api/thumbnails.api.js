async function fileUpload(newFile, articleId) {
  const url = API_ENDPOINT.fileUpload(BASE_URL, articleId);

  const formData = new FormData();
  formData.append("file", newFile);

  console.log(url);
  const result = await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.log("Failed to upload image ", err);
    });
  return result;
}
