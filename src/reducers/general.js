import { MOUNT } from '../constants/GeneralActionTypes';

const initialState = {
  mounted: false
};

export default function general(state = initialState, action) {
  switch (action.type) {
    case MOUNT:
      return {
        mounted: true
      };
    default:
      return state;
  }
}
