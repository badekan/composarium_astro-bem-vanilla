import "./styles/select-search.scss";
import React, { useEffect, useRef, useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

/* Types */
export interface SelectSearchItem {
  value: string;
  name: string;
  address: string;
}

export interface SelectSearchExtraItem {
  separator: string;
  value: string;
  label: string;
  icon: string;
  eventValue: string;
}

export interface SelectSearchProps {
  label: string;
  items: Array<SelectSearchItem>;
  extraItem?: SelectSearchExtraItem;
  targetInput: string;
}

/* Component */
const SelectSearch = (props: SelectSearchProps) => {
  const { label, items, extraItem, targetInput } = props;
  
  const [dopdownOpen, setdopdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setselectedValue] = useState({value:'', name:'', address:''});
  const inputSeach = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target && !target.closest('.select-search-dropdown')) {
        setdopdownOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener('click', handleClickOutside);

    // Remove event listener on unmount
    return () => document.removeEventListener('click', handleClickOutside); 
  }, [dopdownOpen]); 

  const handleChange = (event: any ) => {
    setSearchTerm(event.target.value);
  };
  
  const onClickItem = ({ value, name, address }:SelectSearchItem ) => {
    const target: HTMLInputElement | null = document.querySelector(targetInput);
    const data = {value, name, address};
    if(target) target.value = value;  
    if(target) setselectedValue(data);  
    setdopdownOpen(()=>false);
  };
  
  const handlClickSelect = (e) => {
    e.stopPropagation();
    if(inputSeach.current) inputSeach.current.focus();
    setdopdownOpen(()=>true);
  };

  const searchInTerms =  (string:string) => string.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredData = items.filter((item) =>
    searchInTerms(item.name) || searchInTerms(item.address) || searchInTerms(item.value)
  );

  const onClickExtraItem = (value:string) => {
    const dispatchEvent = new CustomEvent('selectSearchExtraItem', { detail: { value } });
    window.dispatchEvent(dispatchEvent);
  };

  return (
    <div className={`select-search ${(selectedValue.name||selectedValue.address) && "select-search--filled"}`}>
      <div className="select-search__input-container" onClick={handlClickSelect}>
        <label className={`select-search__label`} htmlFor="selectSearch">{label}</label>
        <button className="select-search__button-input" id="selectSearch">
          <div className="select-search-item select-search-item--unselectable">
            <div className="select-search-item__name">{selectedValue.name} </div>
            <div className="select-search-item__address">{selectedValue.address}</div>
          </div>
        </button>
      </div>
      <div className={`select-search__dropdown select-search-dropdown ${dopdownOpen && `select-search-dropdown--open`}`}>
        <div className="select-search-dropdown__head" >
          <input 
            className="select-search-dropdown__input" 
            placeholder="Rechercher..."
            value={searchTerm}
            ref={inputSeach}
            onChange={handleChange}
            type="text" />
        </div>
        <div className={`select-search-dropdown__body`} style={{'height': filteredData.length * 32 +'px'}}>
          <Scrollbar  {...{noScrollX: true}}
            >
            {filteredData.map((item, index) => (
              <button 
                className="select-search-item"
                key={index}
                onClick={()=>{onClickItem({value: item.value, name: item.name, address: item.address})}}>
                <div className="select-search-item__name">{item.name} </div>
                <div className="select-search-item__address">{item.address}</div>
              </button>
            ))}
          </Scrollbar>
        </div>
        { extraItem && (
          <div className="select-search-dropdown__foot">
            <div className="select-search-dropdown__separator"><span>{extraItem.separator}</span></div>
            <button className="select-search-extraitem" onClick={()=>{onClickExtraItem(extraItem.eventValue)}}>
              <span>{extraItem.label}</span>
              <span dangerouslySetInnerHTML={{__html: extraItem.icon}}></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSearch;