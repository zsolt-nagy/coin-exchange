import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
    line-height: 3rem;
`;

const Balance = styled.div`
    display: inline-block;
    min-width: 350px;
    text-align: right;
    vertical-align: middle;
    padding-right: 25px;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    let content = null;
    if ( props.showBalance ) {
        content = <>Balance: {formatter.format(props.amount)}</>;
    }
    return (
        <Section>
            <Balance>{content}</Balance>
            <button className={buttonClass} onClick={props.handleBalanceVisibilityChange}>{buttonText}</button>
            <button className="btn btn-success" onClick={props.handleBrrrr}><i className="fas fa-helicopter"></i></button>
        </Section>
    );

}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}