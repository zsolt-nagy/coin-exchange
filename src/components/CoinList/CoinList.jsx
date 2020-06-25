import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    font-size: 1rem;
`;

const Container = styled.div`
    margin: 0;
`;

export default function CoinList(props) {
  return (
    <Container>
      <Table className="table table-primary table-bordered">
      <thead className="thead-primary">
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.coinData.map( ({key, name, ticker, price, balance}) => 
            <Coin key={key} 
                  handleRefresh={props.handleRefresh} 
                  name={name} 
                  ticker={ticker} 
                  showBalance={props.showBalance}
                  handleTransaction={props.handleTransaction}
                  balance={balance}
                  price={price} 
                  tickerId={key} /> 
          )
        }                              
      </tbody>
    </Table>
  </Container>
  )
}
