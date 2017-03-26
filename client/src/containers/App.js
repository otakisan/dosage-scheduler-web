import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectMedicine, fetchMedicinesIfNeeded, invalidateMedicine } from '../actions/actions'
import Picker from '../components/Picker'
import Medicines from '../components/Medicines'

class App extends Component {
  static propTypes = {
    selectedMedicine: PropTypes.string.isRequired,
    medicines: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedMedicine } = this.props
    dispatch(fetchMedicinesIfNeeded(selectedMedicine))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMedicine !== this.props.selectedMedicine) {
      const { dispatch, selectedMedicine } = nextProps
      dispatch(fetchMedicinesIfNeeded(selectedMedicine))
    }
  }

  handleChange = nextMedicine => {
    this.props.dispatch(selectMedicine(nextMedicine))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedMedicine } = this.props
    dispatch(invalidateMedicine(selectedMedicine))
    dispatch(fetchMedicinesIfNeeded(selectedMedicine))
  }

  render() {
    const { selectedMedicine, medicines, isFetching, lastUpdated } = this.props
    const isEmpty = medicines.length === 0
    return (
      <div>
        <Picker value={selectedMedicine}
                onChange={this.handleChange} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Medicines medicines={medicines} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedMedicine, medicinesByBackendAPI } = state
  const {
    isFetching,
    lastUpdated,
    items: medicines
  } = medicinesByBackendAPI[selectedMedicine] || {
    isFetching: true,
    items: []
  }

  return {
    selectedMedicine,
    medicines,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)