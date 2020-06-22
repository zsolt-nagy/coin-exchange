import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';

// import 'bootstrap/dist/css/bootstrap.min.css';

// https://www.npmjs.com/package/bootswatch
import "bootswatch/dist/spacelab/bootstrap.min.css"; 

// npm install @fortawesome/fontawesome-free --save
import "@fortawesome/fontawesome-free/js/all";

const Div = styled.div`
  text-align: center;
  background-color: rgb(20, 56, 97);
  color: #cccccc;
`;

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) { 
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    });
    setCoinData(coinPriceData);
  }  

  useEffect(function() {
    if (coinData.length === 0 ) {
      componentDidMount();
    }
  });


  const handleBalanceVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleBrrrr = () => {
    setBalance( oldBalance => oldBalance + 1200 );
  }

  const handleTransaction = (isBuy, valueChangeId) => { 
    const balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    });    
    setCoinData(newCoinData);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    debugger;
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });
    
    setCoinData(newCoinData);
  }

  return (
    <Div className="App">
      <ExchangeHeader />
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleBrrrr={handleBrrrr}
        handleBalanceVisibilityChange={handleBalanceVisibilityChange} />
      <CoinList 
        coinData={coinData} 
        showBalance={showBalance} 
        handleTransaction={handleTransaction}
        handleRefresh={handleRefresh} />
    </Div>
  );


}

export default App;
