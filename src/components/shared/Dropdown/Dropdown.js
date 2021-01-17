import React , { useRef } from 'react';
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
                        { props.viewedValueType === 'text' ?
                         <span>{item.name}</span> :
                        <img src={item.name} />
                        }</li>)
    })

    return <button ref={btnRef} className="dropdown-container">
        <div className="dropdown-value">
            {props.placeholder} :
            {
                props.viewedValueType === 'text' ?
                    <span>{ props.selectedValue ? props.selectedValue.name : props.defaultValue ? props.defaultValue.name : props.items[0].name}</span> :
                    <img src={ props.selectedValue ? props.selectedValue.name : props.defaultValue ? props.defaultValue.name : props.items[0].name } />
            }
        </div>
        <ul className="dropdown-list">
            {list}
        </ul>
    </button>
}

export default Dropdown;