function getComments () {
  loadrComments()
  return fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "GET"
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } if (response.status === 500) {
      return Promise.reject(new Error("Сервер упал"))
    } else {
      return Promise.reject(new Error("неизвестная ошибка"))
    }
  }).then((responseData) => {
    usersComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      }
    })
    loadedComment = false
    renderForm(loadedComment)
    renderComments();
  }).catch((error) => {
    alert(error)
    loadedComment = false
    renderForm(loadedComment)
  });
}

function postComments () {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "POST",
    body: JSON.stringify({
      forceError: true,
      "text": newComment.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replace("|", "<div class='quote'>")
            .replace("|", "</div>"),
      "name": newName.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
    })}).then((response) => {
      if (response.status === 201) {
        return response.json()
      } if (response.status === 400 || newComment.value.length < 3 && newName.value.length < 3) {
        return Promise.reject(new Error("Имя или коммент слишком короткие"))
      } if (response.status === 500) {
        return Promise.reject(new Error("Сервер упал"))
      } else {
        return Promise.reject(new Error("неизвестная ошибка"))
      }
    }).then((responseData) => {
      getComments()
      cleareInputs()
        renderComments();
    }).catch((error) => {
      alert(error.message)
      loadedComment = false
      renderForm(loadedComment)
      if (error.message === "Сервер упал") {
        postComments()
      }
    });
}


function addNewComment() {
      const dateNow = new Date();
      let loadedComment = true
      renderForm(loadedComment)
      postComments()
      renderComments()
      commentClickListener()
      
}
getComments()

function formatDate(date) {
  
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    
    let hh = date.getHours() % 100
    if (hh < 10) hh = '0' + hh;
  
    let mi = date.getMinutes() % 100
    if (mi < 10) mi = '0' + mi;
    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
}

function cleareInputs () {
    newName.value = ''
    newComment.value = ''
    // addButton.setAttribute('disabled', 'disabled')
}