import { GET_ALL_BRANDS } from "store/types";

export default function brandsReducer(state ={}, action){
    switch(action.type){
        case GET_ALL_BRANDS:
        return {
            ...state, all: action.payload
        }
        default:
            return state;
    }
}