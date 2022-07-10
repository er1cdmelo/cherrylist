import styles from './Home.module.css'

import ShowsContainer from '../components/ShowsContainer'
import MovieCard from '../apiComponents/MovieCard'
import SearchBar from '../components/Search/SearchBar'
import { SearchContext } from "../components/providers/searchoptions"

const Home = () => {
  document.title = `CherryList - Home`
  return (
    <div className={styles.global_container}>
      <SearchContext>
        <SearchBar />
      </SearchContext>
      <ShowsContainer title='Em alta'>
        <MovieCard search='Stranger Things' />
        <MovieCard search='The Boys' />
        <MovieCard search='The Umbrella Academy' />
        <MovieCard search='Ms Marvel' />
        <MovieCard search='Obi-wan Kenobi' />
      </ShowsContainer>
      <ShowsContainer title='Recomendados para você'>
        <MovieCard search='Moon Knight' />
        <MovieCard search='Barry' />
        <MovieCard search='Superman Lois' />
        <MovieCard search='Severance' />
        <MovieCard search='Bel-air' />
      </ShowsContainer>
    </div>
  )
}

export default Home