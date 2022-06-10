import React, { useEffect, useState, useRef } from 'react'
import SingleSearchElement from './SingleSearchElement'
import '../scss/autocompleteElements/SearchList.scss'
import { useGlobalContext } from '../../context'
const SearchList = () => {
	const { data, currentTag, setCurrentTag, filterData, searchItemsRef} = useGlobalContext()
	const [filteredData, setFilteredData] = useState(data)
	useEffect(() => {
		searchItemsRef.current[0].parentNode.scrollTop = 0
	},[])
	useEffect(() => {
		const newData = filterData(currentTag.value)
		setFilteredData(newData)
		focusOnFirst()
	}, [currentTag])
	const focusOnFirst = () => {
		const firstFilteredElement = filteredData[0]
		const a = searchItemsRef.current.filter((el) => {
			if(el)
			return el.innerText === firstFilteredElement.name})
			console.log(a)
		a.className = 'search-list-element focus'
	}
	const focusOnMe = (tabIndex = 0, action = 'none') => {
		if (tabIndex === 0 && searchItemsRef.current[0]){
			searchItemsRef.current[0].className = 'search-list-element focus'
			if(searchItemsRef.current[1])
			searchItemsRef.current[1].className = 'search-list-element'
		
		}
		else {
			if (action === 'ArrowDown') {
				searchItemsRef.current[tabIndex - 1].className = 'search-list-element'
				searchItemsRef.current[tabIndex].className = 'search-list-element focus'
			}
			if (action === 'ArrowUp') {
				searchItemsRef.current[tabIndex + 1].className = 'search-list-element'
				searchItemsRef.current[tabIndex].className = 'search-list-element focus'
			}
		}
	}
	const handleKeyPress = (e) => {
		const browserZoomLevel = Math.round(window.devicePixelRatio);
		console.log(browserZoomLevel, e.target.scrollTop)
		if(e.target.tabIndex === 1)	e.target.scrollTop = 40
		if (e.key === 'ArrowDown') {
			const currentListLength = e.target.children.length
			if(e.target.tabIndex < currentListLength - 1){
			e.target.tabIndex += 1
			focusOnMe(e.target.tabIndex, 'ArrowDown')
			const singleElementHeight = searchItemsRef.current[e.target.tabIndex].getBoundingClientRect().height
			const scrollHeight = singleElementHeight * parseInt(e.target.tabIndex - 1) * browserZoomLevel
			e.target.scrollTop = scrollHeight
			}
		}
		if (e.key === 'ArrowUp') {
			if (e.target.tabIndex > 0) {
				e.target.tabIndex -= 1
				focusOnMe(e.target.tabIndex, 'ArrowUp')
				const singleElementHeight = searchItemsRef.current[e.target.tabIndex].getBoundingClientRect().height
				const scrollHeight = singleElementHeight * parseInt(e.target.tabIndex + 1) * browserZoomLevel
				e.target.scrollTop = scrollHeight
			}
			else{
				focusOnMe()
			}
		}
		if(e.key === "Enter"){
			const element = searchItemsRef.current[e.target.tabIndex]
			const elementValue = element.innerText
			setCurrentTag({value: elementValue, add: true})
		}

	}
	const handleClick = (e) => {
		if(e.target){
		const elementValue = e.target.innerText
		setCurrentTag({value: elementValue, add: true})
		}

	}
	const displaySearchList = () => {
		const searchList = filteredData.map((element, index) => {
			const elProps = { "element": element, "index": index }
			return (
				<SingleSearchElement key={index} {...elProps} ref={el => searchItemsRef.current[index] = el} />
			)
		})
		return searchList
	}
	useEffect(() => {
		displaySearchList()
		focusOnMe()
	}, [data])
	return (
		<ul className='search-list' onKeyDown={handleKeyPress} tabIndex="0" onClick={handleClick} autoFocus>
			{data && displaySearchList()}
		</ul>
	)
}

export default SearchList