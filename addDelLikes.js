

import { allComments } from "./api.js";
import { renderComments } from "./renderComments.js";

 function AddLikeOrDelLike (e) {
    e.target.classList.add('loading-like')
      let comment = allComments[e.target.dataset.id];
      delay(2000).then(() => {
        comment.likes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        e.target.classList.remove('loading-like')
        renderComments();
      });
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export {AddLikeOrDelLike}