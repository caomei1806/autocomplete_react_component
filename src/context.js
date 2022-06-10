import React, { useState, useContext, useEffect, useRef } from 'react'
import normalizeStringValue from './utils/normalizeStringValue'

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [tagsPicked, setTagsPicked] = useState([])
	const [currentTag, setCurrentTag] = useState({
		value: '',
		add: false,
	})
	const [data, setData] = useState([])
	const searchItemsRef = useRef([])

	const filterData = (searchProp) => {
		if (searchProp === '') return data
		const searchPropWithSpecialCharacters = searchProp
			.split('')
			.map((char) => {
				const specialCharRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
				const isSpecialCharacter = char.match(specialCharRegex)
				return isSpecialCharacter ? `\\${char}` : char
			})
			.join('')
		console.log(searchPropWithSpecialCharacters)
		const regExString = `.*${searchPropWithSpecialCharacters}.*`
		const regEx = new RegExp(regExString, 'gi')
		const filteredData = data.filter(
			(dataElement) => dataElement.name.match(regEx) !== null
		)
		return filteredData
	}
	const checkIfTagIsNew = (tagSearched) => {
		const isTagNew = data.filter((singleSearchValue) => {
			const value = normalizeStringValue(singleSearchValue.name)
			return value === normalizeStringValue(tagSearched)
		})
		return isTagNew.length === 0 ? true : false
	}

	useEffect(() => {
		//add tag
		if (
			currentTag.value !== '' &&
			currentTag.value !== undefined &&
			currentTag.value !== null &&
			currentTag.add
		) {
			const tagAlreadyExists = tagsPicked.find(
				(tag) =>
					normalizeStringValue(tag.value) ===
					normalizeStringValue(currentTag.value)
			)
			if (tagAlreadyExists === undefined) {
				const findFirstSearchFromList = filterData(currentTag.value)[0]
				if (findFirstSearchFromList) {
					const tagAlreadyExists = tagsPicked.find(
						(tag) =>
							normalizeStringValue(tag.value) ===
							normalizeStringValue(findFirstSearchFromList.name)
					)
				}
				if (
					findFirstSearchFromList !== undefined &&
					tagAlreadyExists === undefined
				) {
					setTagsPicked([
						...tagsPicked,
						{ ...currentTag, value: findFirstSearchFromList.name },
					])
				} else {
					setTagsPicked([...tagsPicked, currentTag])
				}
				setCurrentTag({ value: '', add: false })
			}

			// add new tag to the list
			const isTagNew = checkIfTagIsNew(currentTag.value)
			const isFilteredDataEmpty = filterData(currentTag.value)
			if (isTagNew && isFilteredDataEmpty.length === 0) {
				console.log('new')
				setData([...data, { name: currentTag.value }])
			}
			setCurrentTag({ value: '', add: false })
		}
	}, [currentTag])

	return (
		<AppContext.Provider
			value={{
				tagsPicked,
				setTagsPicked,
				currentTag,
				setCurrentTag,
				data,
				setData,
				filterData,
				searchItemsRef,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
