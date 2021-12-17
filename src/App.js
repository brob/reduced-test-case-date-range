import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
  RangeInput,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import { DateRangePicker } from '@algolia/react-instantsearch-widget-date-range-picker';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch('3P95DOLH1H', '738ebb30c043c1192f53721a336c1180');

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">concerts</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="date-test">
          <div className="search-panel">
            <div className="search-panel__filters">
              <Configure facets={['*']} maxValuesPerFacet={20} />
              <DateRangePicker attribute="date" />
              <RangeInput attribute="date" />
            
              {/* <RefinementList attribute="location" /> */}
            </div>

            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit(props) {
  const humanDate = new Date(props.hit.date).toLocaleDateString();
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
      <p>
        <Highlight attribute="location" hit={props.hit} />
      </p>
      <p>
        {humanDate}
      </p>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
