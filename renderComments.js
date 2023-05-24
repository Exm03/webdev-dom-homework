import {  boxOfComments } from "./comments.js";
import { commentClickListener, initEventListeners } from "./listeners.js";
import { allComments} from "./api.js";

let renderComments = () => {
    let commentsHtml = allComments
      .map((comment, id) => {
        let isLiked = ''
        if (comment.isLiked) {
          isLiked = '-active-like';
        }
        
        let date = formatDate(comment.date)
        return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class=" like-button ${isLiked}" data-id="${id}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
      
    boxOfComments.innerHTML = commentsHtml;
    initEventListeners();
    commentClickListener()
};

function renderLoaderComments () {
  boxOfComments.innerHTML = `<li class=" comment comment_loader loading">
<div class="comment-header comment__header_loader">
<div class="animated-background  comment__name_loader">
</div>
<div class="animated-background  comment__date_loader">
</div>
</div>
<div class="animated-background  comment-body comment__body_loader">
</div>
<div class="likes likes_loader">
<div class="animated-background  likes__counter_loader"></div>
<div class="animated-background  like__button_loader"></div>
</div>
</li>
<li class=" comment comment_loader loading">
<div class="comment-header comment__header_loader">
<div class="animated-background  comment__name_loader">
</div>
<div class="animated-background  comment__date_loader">
</div>
</div>
<div class="animated-background  comment-body comment__body_loader">
</div>
<div class="likes likes_loader">
<div class="animated-background  likes__counter_loader"></div>
<div class="animated-background  like__button_loader"></div>
</div>
</li>`
}

let addForm = document.querySelector('.add-form')
let loader = document.querySelector('.loader');

function renderForm (loadedComment) {
  if (loadedComment == true){
    addForm.classList.add('hide')
    loader.classList.remove('hide')
  } if(loadedComment == false){
    loader.classList.add('hide')
    addForm.classList.remove('hide')
  }
}

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

export {renderComments, renderLoaderComments, renderForm}