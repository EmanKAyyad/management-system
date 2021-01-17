import React, { useRef } from 'react';
import './dropdown.scss';

const Dropdown = (props) => {

    const btnRef = useRef(null);
    const onChangeHandler = (event) => {
        props.onChangeHandle(props.items.find(z => z.value === event.currentTarget.getAttribute("value")));
        btnRef.current.blur();
    };
    const list = []
    props.items.map(item => {
        list.push(<li
            onClick={onChangeHandler}
            className="list-item"
            key={item.value}
            value={item.value}>
            {props.propertyViewed === 'src' ?
                <img src={item[props.propertyViewed]} /> :
                <span>{item[props.propertyViewed]}</span> 
            }</li>)
    })

    return <button ref={btnRef} className="dropdown-container">
        <div className="dropdown-value">
            {props.placeholder}:&nbsp;
            {
                props.propertyViewed === 'src' ?
                <img src={props.selectedValue ? props.selectedValue[props.propertyViewed] : props.defaultValue ? props.defaultValue[props.propertyViewed] : props.items[0][props.propertyViewed]} /> :
                    <span>{props.selectedValue ? props.selectedValue[props.propertyViewed] : props.defaultValue ? props.defaultValue[props.propertyViewed] : props.items[0][props.propertyViewed]}</span> 
            }
            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.39062 0.296875L8 6.94141L14.6094 0.296875L15.4531 1.14062L8.42188 8.17188L8 8.52344L7.57812 8.17188L0.546875 1.14062L1.39062 0.296875Z" fill="#778CA2" />
            </svg>

        </div>
        <ul className="dropdown-list">
            {list}
        </ul>
    </button>
}

export default Dropdown;