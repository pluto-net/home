import { fromJS } from "immutable";
import { ACTION_TYPES } from "./actions";

export const NEWHOME_INITIAL_STATE = fromJS({
  isTop: false,
});

export function reducer(state = NEWHOME_INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPES.ENTER_SCROLL_TOP: {
      return state.set("isTop", true);
    }

    case ACTION_TYPES.LEAVE_SCROLL_TOP: {
      return state.set("isTop", false);
    }

    default:
      return state;
  }
}
