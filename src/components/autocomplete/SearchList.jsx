import React, { useEffect, useState,useRef } from 'react'
import SingleSearchElement from './SingleSearchElement'
import '../scss/autocompleteElements/SearchList.scss'
const SearchList = () => {
	const [data, setData] = useState([])
	const searchItemsRef = useRef([]);
	const fetchSearchList = async () => {
		const res = await fetch('./data.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
		const data = await res.json()
		setData(data)
	}
	useEffect(() => {
		fetchSearchList()
	},[])
	const focusOnMe = (tabIndex = 0, action = 'none') => {
		if(tabIndex === 0 && searchItemsRef.current[0])
		searchItemsRef.current[0].className = 'search-list-element focus'
		else{
			if(action === 'ArrowDown'){
				searchItemsRef.current[tabIndex - 1].className = 'search-list-element'
				searchItemsRef.current[tabIndex].className = 'search-list-element focus'
			}
			if(action === 'ArrowUp'){
				searchItemsRef.current[tabIndex + 1].className = 'search-list-element'
				searchItemsRef.current[tabIndex].className = 'search-list-element focus'
			}
		}
	}
	const handleKeyPress = (e) => {
		console.log(e.key, e.target)
		if(e.key === 'ArrowDown'){
		e.target.tabIndex += 1
		focusOnMe(e.target.tabIndex, 'ArrowDown')
		
		const scrollHeight = 30 + 40 * parseInt(e.target.tabIndex - 2)
		e.target.scrollTop = scrollHeight
		}
		if(e.key === 'ArrowUp'){
			if(e.target.tabIndex > 0){
				e.target.tabIndex -=1
				focusOnMe(e.target.tabIndex, 'ArrowUp')
				const scrollHeight = 40 * parseInt(e.target.tabIndex + 1)+ 10
				e.target.scrollTop = scrollHeight
			}
		}
		
	}
	const displaySearchList = () => {
		const searchList = data.map((element, index) => {
			const elProps = {"element": element, "index": index}
				return (
					<SingleSearchElement key={index} {...elProps} ref={el => searchItemsRef.current[index] = el} />
				)
		})
		return searchList
	}
	useEffect(() => {
		displaySearchList()
		focusOnMe()
	},[data])
  return (
	<ul className='search-list' onKeyDown={handleKeyPress} tabIndex="0">
		{data && displaySearchList()}
	</ul>
  )
}

export default SearchList