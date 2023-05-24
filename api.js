import { newName, newComment, addButton } from "./comments.js";
import { commentClickListener } from "./listeners.js";
import { renderComments, renderLoaderComments, renderForm } from "./renderComments.js";

let loadedComment = true
let allComments = []

function getComments () {
  renderLoaderComments()
  return fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } if (response.status === 500) {
      return Promise.reject(new Error("Сервер упал"))
    } else {
      return Promise.reject(new Error("неизвестная ошибка"))
    }
  }).then((responseData) => {
     allComments = responseData.comments.map((comment) => {
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
    console.log(error)
    alert(error)
    loadedComment = false
    renderForm(loadedComment)
  });
}
getComments()

function postComments () {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "POST",
    body: JSON.stringify({
      forceError: false,
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
        console.log(response.status)
        return Promise.reject(new Error("неизвестная ошибка"))
      }
    }).then((responseData) => {
      getComments()
      cleareInputs()
        renderComments();
    }).catch((error) => {
      loadedComment = false
      renderForm(loadedComment)
      if (error.message === "Сервер упал") {
        postComments()
      } if (error.message === 'Failed to fetch') {
        alert('Кажеться у вас сломался интернет, попробуйте позже')
      } else {
        alert(error.message)
      }
    });
}



 function addNewComment() {
      let date = new Date();
      loadedComment = true
      renderForm(loadedComment)
      postComments()
      renderComments()
      commentClickListener()
}

export {addNewComment, allComments}


function cleareInputs () {
  newName.value = ''
  newComment.value = ''
  addButton.setAttribute('disabled', 'disabled')
}