import Axios from 'axios';
import { fromJS } from 'immutable';

export const ACTION_TYPES = {
  CHANGE_EMAIL_INPUT: 'HOME.CHANGE_EMAIL_INPUT',
  ENTER_SCROLL_TOP: 'HOME.ENTER_SCROLL_TOP',
  LEAVE_SCROLL_TOP: 'HOME.LEAVE_SCROLL_TOP',

  START_TO_FETCH_BLOG_POSTS: 'HOME.START_TO_FETCH_BLOG_POSTS',
  SUCCEEDED_TO_FETCH_BLOG_POSTS: 'HOME.SUCCEEDED_TO_FETCH_BLOG_POSTS',
  FAILED_TO_FETCH_BLOG_POSTS: 'HOME.FAILED_TO_FETCH_BLOG_POSTS',
};

export function getRecentBlogPosts() {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.START_TO_FETCH_BLOG_POSTS,
    });

    try {
      const response = await Axios.get('https://a026bxmb46.execute-api.us-east-1.amazonaws.com/prod/getLatestPosts?username=pluto-network');
      const posts = fromJS(response.data);
      const slicedPosts = posts.slice(0, 3);

      dispatch({
        type: ACTION_TYPES.SUCCEEDED_TO_FETCH_BLOG_POSTS,
        payload: {
          posts: slicedPosts,
        },
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.FAILED_TO_FETCH_BLOG_POSTS,
      });
    }
  };
}

/**
 * @param {string} email user's email input
 */
export function changeEmailInput(email) {
  return {
    type: ACTION_TYPES.CHANGE_EMAIL_INPUT,
    payload: {
      email,
    },
  };
}

export function enterScrollTop() {
  return {
    type: ACTION_TYPES.ENTER_SCROLL_TOP,
  };
}

export function leaveScrollTop() {
  return {
    type: ACTION_TYPES.LEAVE_SCROLL_TOP,
  };
}
