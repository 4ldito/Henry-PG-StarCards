import { TEST } from "../actions/ActionTypes";
const initialState = {
    testArray: []
}

export default function activities(state = initialState, { type, payload }) {

    switch (type) {
        case TEST:
            return { ...state, testArray: payload }
        default:
            return state;
    }
}