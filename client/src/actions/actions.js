/*
 * action types
 */

export const QUERY_MEDICINE = 'QUERY_MEDICINE'

/*
 * action creators
 */

export function queryMedicine(query) {
  return { type: QUERY_MEDICINE, query }
}


export const REQUEST_MEDICINES = 'REQUEST_MEDICINES'
export const RECEIVE_MEDICINES = 'RECEIVE_MEDICINES'
export const SELECT_MEDICINE = 'SELECT_MEDICINE'
export const INVALIDATE_MEDICINE = 'INVALIDATE_MEDICINE'

export const selectMedicine = medicine => ({
  type: SELECT_MEDICINE,
  medicine
})

export const invalidateMedicine = medicine => ({
  type: INVALIDATE_MEDICINE,
  medicine
})

export const requestMedicines = medicine => ({
  type: REQUEST_MEDICINES,
  medicine
})

export const receiveMedicines = (medicine, json) => ({
  type: RECEIVE_MEDICINES,
  medicine,
  medicines: json,
  receivedAt: Date.now()
})

const fetchMedicines = medicine => dispatch => {
  dispatch(requestMedicines(medicine))
  return fetch(`ormtest?q=${medicine}`, {
    accept: 'application/json',
    })
    .then(response => response.json())
    .then(json => dispatch(receiveMedicines(medicine, json)))
}

const shouldFetchMedicines = (state, medicine) => {
  const medicines = state.medicinesByBackendAPI[medicine]
  if (!medicines) {
    return true
  }
  if (medicines.isFetching) {
    return false
  }
  return medicines.didInvalidate
}

export const fetchMedicinesIfNeeded = medicine => (dispatch, getState) => {
  if (shouldFetchMedicines(getState(), medicine)) {
    return dispatch(fetchMedicines(medicine))
  }
}