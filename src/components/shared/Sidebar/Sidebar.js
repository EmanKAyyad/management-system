import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.scss';
import logo from '../../../assets/logo.jpg';
import { withRouter } from "react-router";
import {connect} from 'react-redux';



const Sidebar = (props) => {
  const [submenuTwoFlag, setSubMenuTwoFlag] = useState({ flag: false });
  const openedSideBar = {
    width: '0',
    opacity: 0
  }

  const closedSideBar = {
    width: '242px',
    opacity: 1
  }

  const sidebarTwoItems = [
    { name: "operating cost", link: "operating-cost" },
    { name: "fuel history", link: "fuel-history" },
    { name: "total cost", link: "total-cost" },
    { name: "cost/meter", link: "cost-meter" },
    { name: "expense summary", link: "expense-summary" },
    { name: "utilization", link: "utilization" },
    { name: "maintenance", link: "maintenance" },
    { name: "service", link: "service" }
  ];

  const subMenuTwo = []
  for (let i = 0; i < sidebarTwoItems.length; i++) {
    subMenuTwo.push(
      <li key={'sub-menu02-item' + i}><NavLink to={sidebarTwoItems[i].link}>{sidebarTwoItems[i].name}</NavLink></li>
    )
  }

  const updateSidebarStatus = () => {
    const pathname = props.location.pathname.slice(1);
    if (sidebarTwoItems.find(z => z.link === pathname)) setSubMenuTwoFlag(() => true);
    else setSubMenuTwoFlag(() => false);
  }

  useEffect(() => {
    updateSidebarStatus();
  })


  return <div className="sidebar d-none d-md-block"  style={props.Flag ? openedSideBar : closedSideBar}>
    <div className="logo-container" style={props.Flag ? openedSideBar : closedSideBar}>
      <Link to="/">
        <img className="logo" alt="management system logo" src={logo} />
      </Link>
    </div>
    <nav>
      <ul className="main-menu" style={props.Flag ? openedSideBar : closedSideBar}>
        <li><a data-toggle="collapse" href="#sub-menu01" role="button" aria-expanded="false" aria-controls="sub-menu01">
          <span className="list-icon"><svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.53125 0.875H14.4688C14.9271 0.875 15.3281 1.01823 15.6719 1.30469C16.0443 1.5625 16.3021 1.90625 16.4453 2.33594L17.3906 5.51562L18.7227 5.04297L19.1523 6.33203L17.8203 6.80469L18.25 8.26562C18.25 8.29427 18.25 8.33724 18.25 8.39453V8.4375V13.25C18.25 13.2786 18.25 13.3073 18.25 13.3359V13.9375C18.25 14.138 18.1784 14.3099 18.0352 14.4531C17.9206 14.5677 17.763 14.625 17.5625 14.625H15.5L15.2422 13.9375H4.75781L4.5 14.625H2.4375C2.23698 14.625 2.0651 14.5677 1.92188 14.4531C1.80729 14.3099 1.75 14.138 1.75 13.9375V13.3359C1.75 13.3073 1.75 13.293 1.75 13.293C1.75 13.2643 1.75 13.25 1.75 13.25V8.4375V8.39453C1.75 8.33724 1.75 8.29427 1.75 8.26562L2.17969 6.80469L0.847656 6.33203L1.27734 5.04297L2.60938 5.51562L3.55469 2.33594C3.69792 1.90625 3.94141 1.5625 4.28516 1.30469C4.65755 1.01823 5.07292 0.875 5.53125 0.875ZM5.53125 2.25C5.1875 2.25 4.95833 2.42188 4.84375 2.76562L3.98438 5.6875H16.0156L15.1562 2.76562C15.0417 2.42188 14.8125 2.25 14.4688 2.25H5.53125ZM3.55469 7.0625L3.125 8.56641V12.5625H5.1875H16.875V8.56641L16.4453 7.0625H3.55469ZM4.11328 8.05078C4.3138 7.85026 4.55729 7.75 4.84375 7.75C5.13021 7.75 5.3737 7.85026 5.57422 8.05078C5.77474 8.2513 5.875 8.49479 5.875 8.78125C5.875 9.06771 5.77474 9.3112 5.57422 9.51172C5.3737 9.71224 5.13021 9.8125 4.84375 9.8125C4.55729 9.8125 4.3138 9.71224 4.11328 9.51172C3.91276 9.3112 3.8125 9.06771 3.8125 8.78125C3.8125 8.49479 3.91276 8.2513 4.11328 8.05078ZM14.4258 8.05078C14.6263 7.85026 14.8698 7.75 15.1562 7.75C15.4427 7.75 15.6862 7.85026 15.8867 8.05078C16.0872 8.2513 16.1875 8.49479 16.1875 8.78125C16.1875 9.06771 16.0872 9.3112 15.8867 9.51172C15.6862 9.71224 15.4427 9.8125 15.1562 9.8125C14.8698 9.8125 14.6263 9.71224 14.4258 9.51172C14.2253 9.3112 14.125 9.06771 14.125 8.78125C14.125 8.49479 14.2253 8.2513 14.4258 8.05078ZM7.25 9.8125H12.75L13.6094 11.875H12.1484L11.8047 11.1875H8.19531L7.85156 11.875H6.39062L7.25 9.8125Z" />
          </svg>
          </span>vehicles</a></li>
        <li><a className={submenuTwoFlag ? 'active' : null} data-toggle="collapse" href="#sub-menu02" role="button" aria-expanded={submenuTwoFlag ? "true" : "false" }aria-controls="sub-menu02">
          <span className="list-icon" >
            <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.4375 0.8125H1.125H9.375H9.63281L9.89062 0.984375L14.0156 5.10938L14.1875 5.36719V5.625V18V18.6875H13.5H1.125H0.4375V18V1.5V0.8125ZM1.8125 2.1875V17.3125H12.8125V6.3125H9.375H8.6875V5.625V2.1875H1.8125ZM10.0625 3.17578V4.9375H11.8242L10.0625 3.17578ZM3.875 7.6875H10.75V9.0625H3.875V7.6875ZM3.875 10.4375H10.75V11.8125H3.875V10.4375ZM3.875 13.1875H10.75V14.5625H3.875V13.1875Z" />
            </svg>
          </span>report</a>
          <ul className={submenuTwoFlag ? "sub-menu collapse show" : "sub-menu collapse"} id="sub-menu02">
            {subMenuTwo}
          </ul>
        </li>
        <li><a data-toggle="collapse" href="#sub-menu03" role="button" aria-expanded="false" aria-controls="sub-menu03">
          <span className="list-icon">
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.91797 1.60547C4.86328 0.660156 5.99479 0.1875 7.3125 0.1875C8.63021 0.1875 9.76172 0.660156 10.707 1.60547C11.6523 2.55078 12.125 3.68229 12.125 5C12.125 5.80208 11.9245 6.5612 11.5234 7.27734C11.151 7.99349 10.6354 8.56641 9.97656 8.99609C11.237 9.54036 12.2539 10.3854 13.0273 11.5312C13.8008 12.6484 14.1875 13.9089 14.1875 15.3125H12.8125C12.8125 13.7943 12.2682 12.5052 11.1797 11.4453C10.1198 10.3568 8.83073 9.8125 7.3125 9.8125C5.79427 9.8125 4.49089 10.3568 3.40234 11.4453C2.34245 12.5052 1.8125 13.7943 1.8125 15.3125H0.4375C0.4375 13.9089 0.824219 12.6484 1.59766 11.5312C2.37109 10.3854 3.38802 9.54036 4.64844 8.99609C3.98958 8.56641 3.45964 7.99349 3.05859 7.27734C2.6862 6.5612 2.5 5.80208 2.5 5C2.5 3.68229 2.97266 2.55078 3.91797 1.60547ZM9.71875 2.59375C9.0599 1.90625 8.25781 1.5625 7.3125 1.5625C6.36719 1.5625 5.55078 1.90625 4.86328 2.59375C4.20443 3.2526 3.875 4.05469 3.875 5C3.875 5.94531 4.20443 6.76172 4.86328 7.44922C5.55078 8.10807 6.36719 8.4375 7.3125 8.4375C8.25781 8.4375 9.0599 8.10807 9.71875 7.44922C10.4062 6.76172 10.75 5.94531 10.75 5C10.75 4.05469 10.4062 3.2526 9.71875 2.59375Z" />
            </svg>

          </span>people</a>
        </li>
      </ul>
    </nav>
  </div>
}

const mapStateToProps = state => {
  return {
    Flag: state.openSideBarFlag
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar));