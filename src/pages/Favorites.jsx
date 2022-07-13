import styles from './Favorites.module.css'
import { useState, useEffect} from 'react'
import Loading from '../components/Loading'
import MovieCard from '../apiComponents/MovieCard'

const Favorites = () => {

  document.title = `CherryList - Favorites`
  
  const [list, setList] = useState([])
  useEffect(() => {
    if(localStorage.getItem('favorites')) {
      setList(JSON.parse(localStorage.getItem('favorites')))
      console.log(list)
    }
  }, [])
  



  return (
    <div className={styles.fav_global_container}>
      <h1>My Favorites</h1>
      <div className={styles.fav_container}>
        {list.length ? (
          list.map(li => (
            <MovieCard search={li} />
          ))
        ) : <div className={styles.none}>Lista de favoritos vazia...</div>}
      </div>
    </div>
  )
}

export default Favorites