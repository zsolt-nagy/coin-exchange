import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin: 0 auto 2rem auto;
    line-height: 3rem;
    display: inline-block;
`;

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5rem;
    text-align: left;
    vertical-align: middle;
`;

const Button = styled.button`
    margin: 0 8px;
`;

const BalanceToggleButton = styled(Button)`
    width: 150px;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    let content = '\u00A0';
    if ( props.showBalance ) {
        content = <>Balance: {formatter.format(props.amount)}</>;
    }
    return (
        <>
            <Balance>{content}</Balance>
            <Section>
                <BalanceToggleButton className={buttonClass} onClick={props.handleBalanceVisibilityChange}>{buttonText}</BalanceToggleButton>
                <Button className="btn btn-success" onClick={props.handleBrrrr}><i className="fas fa-helicopter"></i></Button>
            </Section>
        </>
    );

}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}