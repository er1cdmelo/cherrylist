import React, { useEffect, useState } from 'react'
import styles from './Suggestions.module.css'
import { searchOptions } from "../providers/searchoptions";
import { Link } from 'react-router-dom'

import Loading from '../Loading';

const Suggestions = ({ text } ) => {

  const { options, setOptions } = React.useContext(searchOptions)

  useEffect(() => {
    if(text.length > 3) {
        var textSplited = text.split(' ')
        var textFormated = textSplited.join('+')
        fetch(`https://api.tvmaze.com/search/shows?q=${textFormated}`)
        .then(res => res.json())
        .then(data => {
            setOptions(data)
            console.log(options)
            localStorage.setItem('testando', options)
        })
        .catch(err => {
            console.log(err)
        })
    }
  }, [text])

  useEffect(() => {
    console.log(options)
  }, [options])

  return (
    <div className={styles.options_container}>
        <ul>
            {options ? (
                options.map(opt => (
                    <Link to={`/shows/${opt.show.id}`}>
                        <li>
                            <img src={opt.show.image ? opt.show.image.medium : 'https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg'} alt="cover" />
                            {opt.show.name}
                        </li>
                    </Link>
                ))
            ) : (<Loading />)}
        </ul>
    </div>
  )
}

export default Suggestions