import styles from './SearchBar.module.css'
import { searchOptions } from "../providers/searchoptions";
import React, { useState } from 'react';
import Suggestions from './Suggestions';
import Loading from '../Loading';

const SearchBar = () => {

  const { options } = React.useContext(searchOptions)
  const [search, setSearch] = useState('')

  const typeSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className={styles.search_container}>
        <h1>Procure por um título...</h1>
        <input onChange={typeSearch} type="text" placeholder="Ex: Stranger Things" />
        {search.length ? (
            <Suggestions text={search} />
        ) : ''}
    </div>
  )
}

export default SearchBar