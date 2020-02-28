import {  RECEIVE_LANGUAGE } from '../actions/languages_action';


export default function (state = { language: "English"}, action) {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_LANGUAGE:
            nextState["language"] = action.language
            return nextState
        default:
            return state;
    }
}