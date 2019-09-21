import React from 'react';
import {connect} from 'react-redux';
import {setStopsValue} from '../../actions';
import './tickets-list-filter.css'


const TicketsListFilter = ({stopsValue, setStopsValue}) => {
  return (
    
    <div className="tickets-filter-wrapper">
      <h2 className="tickets-filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>

      <ul className="tickets-filter__list">
        <li className="tickets-filter__list-item">
          <input
            className="check-box"
            id="check-all"
            type="checkbox"
            onChange={() => setStopsValue("all")}
            checked={stopsValue.all}
          />
          <label htmlFor="check-all"> Все</label>
        </li>
        <li className="tickets-filter__list-item">
          <input
            id="check-0"
            type="checkbox"
            onChange={() => setStopsValue("0")}
            checked={stopsValue.zero}
          />
          <label htmlFor="check-0"> Без пересадок</label>
        </li>
        <li className="tickets-filter__list-item">
          <input
            id="check-1"
            type="checkbox"
            onChange={() => setStopsValue("1")}
            checked={stopsValue.one}
          />
          <label htmlFor="check-1"> 1 пересадка</label>
        </li>
        <li className="tickets-filter__list-item">
          <input
            id="check-2"
            type="checkbox"
            onChange={() => setStopsValue("2")}
            checked={stopsValue.two}
          />
          <label htmlFor="check-2"> 2 пересадки</label>
        </li>
        <li className="tickets-filter__list-item">
          <input
            id="check-3"
            type="checkbox"
            onChange={() => setStopsValue("3")}
            checked={stopsValue.three}
          />
          <label htmlFor="check-3"> 3 пересадки</label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({stopsValue}) => {
  return {
    stopsValue
  }
}

const mapDispatchToProps = {
  setStopsValue
};

export default connect(mapStateToProps,mapDispatchToProps)(TicketsListFilter);
