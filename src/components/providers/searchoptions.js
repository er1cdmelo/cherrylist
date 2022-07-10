import React, { useState } from "react"

export const searchOptions = React.createContext([])

export const SearchContext = (props) => {
    const [options, setOptions] = useState([])

    return (
        <searchOptions.Provider value={{options, setOptions}}>
            {props.children}
        </searchOptions.Provider>
    )
}