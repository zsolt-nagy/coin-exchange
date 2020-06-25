import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 22vh;
`;

const TdControls = styled(Td)`
    width: 34vh;
`;

const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
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
            <TdControls>
                <form action="#" method="POST">
                    <Button className="btn btn-info" onClick={handleInfo}>Refresh</Button>
                    <Button className="btn btn-success" onClick={handleBuy}>Buy</Button>
                    <Button className="btn btn-danger" onClick={handleSell}>Sell</Button>
                </form>
            </TdControls>
        </tr>
        );

}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}