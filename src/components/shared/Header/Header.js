import React from 'react';
import './header.scss';
import { connect } from 'react-redux';

const Header = (props) => {
    return <header>
        <div className="left-side">
            <button onClick={props.toggleSidebar}>
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 0.5625H17.25V1.9375H0.75V0.5625ZM0.75 6.0625H17.25V7.4375H0.75V6.0625ZM0.75 11.5625H17.25V12.9375H0.75V11.5625Z" fill="#778CA2" />
                </svg>
            </button>
            <span>PLN Asset Management System</span>
        </div>
        <div className="right-side"></div>
    </header>
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' })
    }
}
export default connect(null, mapDispatchToProps)(Header);