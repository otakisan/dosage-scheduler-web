import { combineReducers } from 'redux'
import {
  SELECT_MEDICINE, INVALIDATE_MEDICINE,
  REQUEST_MEDICINES, RECEIVE_MEDICINES
} from '../actions/actions'

const selectedMedicine = (state = '', action) => {
  switch (action.type) {
    case SELECT_MEDICINE:
      return action.medicine
    default:
      return state
  }
}

const medicines = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_MEDICINE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MEDICINES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MEDICINES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.medicines,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const medicinesByBackendAPI = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_MEDICINE:
    case RECEIVE_MEDICINES:
    case REQUEST_MEDICINES:
      return {
        ...state,
        [action.medicine]: medicines(state[action.medicine], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  medicinesByBackendAPI,
  selectedMedicine
})

export default rootReducer