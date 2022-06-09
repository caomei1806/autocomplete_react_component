import React, { useState, useContext, useEffect } from 'react'
import normalizeStringValue from './utils/normalizeStringValue'

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [tagsPicked, setTagsPicked] = useState([])
  const [currentTag, setCurrentTag] = useState({
    value: '',
    add: false
  })
  const [data, setData] = useState([])

  const filterData = (searchProp) => {
    const regExString = `.*${searchProp}.*`
    const regEx = new RegExp(regExString, 'gi');
    const filteredData = data.filter((dataElement) => dataElement.name.match(regEx) !== null)
    return filteredData
  }

  useEffect(() => {
    //add tag
    if (currentTag.value !== '' && currentTag.value !== undefined && currentTag.value !== null && currentTag.add) {
      const tagExists = tagsPicked.find(tag => normalizeStringValue(tag.value) === normalizeStringValue(currentTag.value))
      if (tagExists === undefined) {
        setTagsPicked([...tagsPicked, currentTag])
        setCurrentTag('')
      }

      // add new tag to the list
      const isTagNew = data.filter(singleSearchValue => {
        const value = normalizeStringValue(singleSearchValue.name)
        return value === normalizeStringValue(currentTag.value)
      })
      console.log(isTagNew)
      if (isTagNew.length === 0) {
        console.log('new')
        setData([...data, { name: currentTag.value }])
      }
    }
  }, [currentTag])

  return <AppContext.Provider value={{ tagsPicked, setTagsPicked, currentTag, setCurrentTag, data, setData, filterData }}>{children}</AppContext.Provider>
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }