import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MedicineSearch from './MedicineSearch';
import DosageScheduleList from './DosageScheduleList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  addFood = (medicine) => {
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="App-content">
            <MedicineSearch onMedicineClick={this.addFood} />
          </div>
          <div className="App-content">
            <DosageScheduleList onMedicineClick={this.addFood} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
