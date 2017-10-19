import { fromJS } from 'immutable';
import { ACTION_TYPES } from './actions';

export const OLDHOME_INITIAL_STATE = fromJS({
  isLoading: false,
  email: '',
  isTop: false,
  enBlogPosts: [],
  koBlogPosts: [],
});

export function reducer(state = OLDHOME_INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_EMAIL_INPUT: {
      return state.set('email', action.payload.email);
    }

    case ACTION_TYPES.ENTER_SCROLL_TOP: {
      return state.set('isTop', true);
    }

    case ACTION_TYPES.LEAVE_SCROLL_TOP: {
      return state.set('isTop', false);
    }

    case ACTION_TYPES.START_TO_FETCH_BLOG_POSTS: {
      return state.set('isLoading', true);
    }

    case ACTION_TYPES.SUCCEEDED_TO_FETCH_BLOG_POSTS: {
      return state.withMutations((currentState) => currentState
          .set('isLoading', false)
          .set('enBlogPosts', action.payload.enPosts)
          .set('koBlogPosts', action.payload.koPosts),
        );
    }

    case ACTION_TYPES.FAILED_TO_FETCH_BLOG_POSTS: {
      // TODO: Add error handling UI/UX
      return state.set('isLoading', false);
    }


    default:
      return state;
  }
}
