import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default function Coin(props) {
 
    const handleInfo = (event) => {
        // Prevent the default action of submitting the form 
        event.preventDefault();

        props.handleRefresh(props.tickerId); 
    }

    const handleBuy = (event) => {
        event.preventDefault();
        props.handleTransaction(true, props.tickerId);
    }

    const handleSell = (event) => {
        event.preventDefault();
        props.handleTransaction(false, props.tickerId);
    }    
    
    return (
        <tr> 
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td> 
            <Td>${props.price}</Td>
            <Td>{props.showBalance ? props.balance : '-'}</Td>
            <Td>
                <form action="#" method="POST">
                    <button className="btn btn-info" onClick={handleInfo}>Refresh</button>
                    <button className="btn btn-success" onClick={handleBuy}>Buy</button>
                    <button className="btn btn-danger" onClick={handleSell}>Sell</button>
                </form>
            </Td>
        </tr>
        );

}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}