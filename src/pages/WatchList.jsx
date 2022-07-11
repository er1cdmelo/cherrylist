import styles from './WatchList.module.css'
import { useState, useEffect} from 'react'
import Loading from '../components/Loading'
import MovieCard from '../apiComponents/MovieCard'

const WatchList = () => {
  
  const [list, setList] = useState([])
  useEffect(() => {
    if(localStorage.getItem('watchlist')) {
      setList(JSON.parse(localStorage.getItem('watchlist')))
      console.log(list)
    }
  }, [])
  



  return (
    <div className={styles.watch_global_container}>
      <h1>My WatchList</h1>
      <div className={styles.watch_container}>
        {list.length ? (
          list.map(li => (
            <MovieCard search={li} />
          ))
        ) : 'Watchlist vazia...'}
      </div>
    </div>
  )
}

export default WatchList