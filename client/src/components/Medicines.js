import React, { PropTypes } from 'react'

const Medicines = ({medicines}) => (
  <ul>
    {medicines.map((medicine, i) =>
      <li key={i}>{medicine.summary}</li>
    )}
  </ul>
)

Medicines.propTypes = {
  medicines: PropTypes.array.isRequired
}

export default Medicines