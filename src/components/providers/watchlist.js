import React, { useState, useEffect } from "react"


export const WatchListData = React.createContext(false)
export const FavoritesData = React.createContext(false)

export const WatchContext = (props) => {
    const [watched, setWatched] = useState(false)
    const [favorited, setFavorited] = useState(false)

    return (
        <WatchListData.Provider value={{watched, setWatched}}>
            <FavoritesData.Provider value={{favorited, setFavorited}}>
                {props.children}
            </FavoritesData.Provider>
        </WatchListData.Provider>
    )
}