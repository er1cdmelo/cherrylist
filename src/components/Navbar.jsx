import styles from './Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { useState } from 'react'

const Navbar = () => {

  let location = useLocation()
  location = location.pathname.split('/')[1]
  console.log(location)

  const [showTab, setShowTab] = useState('true')


  return (
    <div className={styles.navbar_container}>
        <div className={styles.logo}><Link to="/"><h1>CherryList</h1><img src={require("./logo.png")} alt="logo" /></Link></div>
        <div className={styles.menu}><BiMenu onClick={() => {setShowTab('true')}} /></div>
        <ul className={styles[`${showTab}`]}>
            <div onClick={() => {setShowTab('false')}} className={styles.close}><AiOutlineCloseCircle /></div>
            <Link to='/profile'><li className={location === 'profile' ? styles.active : styles.li_item}>Meu Perfil</li></Link>
            <Link to='/watchlist'><li className={location === 'watchlist' ? styles.active : styles.li_item}>WatchList</li></Link>
            <Link to='/favorites'><li className={location === 'favorites' ? styles.active : styles.li_item}>Favoritos</li></Link>
        </ul>
    </div>
  )
}

export default Navbar