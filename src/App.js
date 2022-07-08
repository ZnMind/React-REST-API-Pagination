import React, { Component } from 'react';
import Pagination from './Pagination';
import './App.css';

class App extends Component {
  async componentDidMount() {
    //this.loadCoinDesk()
    await this.loadCoinCap()
  }

  async loadCoinDesk() {
    let data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    data = await data.json()
    console.log(data)
    this.setState({
      time: data.time.updated,
      chart: data.chartName,
      code: data.bpi.USD.code,
      rate: data.bpi.USD.rate_float
    })
  }

  async loadCoinCap() {
    let data = await fetch(`https://api.coincap.io/v2/assets`)
    data = await data.json()
    this.setState({ currencies: data.data })
  }

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      prices: [],
      time: null,
      chart: null,
      code: null,
      rate: 0
    }
  }

  render() {
    return (
      <div className="App">
        <div className='d-flex justify-content-between'>
          <Pagination
            data={this.state.currencies}
          />
        </div>
      </div>
    );
  }
}

export default App;
