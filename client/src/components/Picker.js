import React, { PropTypes } from 'react'

const Picker = ({ value, onChange }) => (
  <div>
    <input
      className='prompt'
      type='text'
      placeholder='Search medicines...'
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
)

Picker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker