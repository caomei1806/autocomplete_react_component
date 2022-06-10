import React, { useState } from 'react'
import Tag from './Tag'
import '../scss/autocompleteElements/SearchBar.scss'
import { useGlobalContext } from '../../context';
import normalizeStringValue from '../../utils/normalizeStringValue';
const SearchBar = () => {
	const { tagsPicked, currentTag, setCurrentTag, searchItemsRef, focusOnMe } = useGlobalContext()
	const [inputState, setInputState] = useState('')
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setCurrentTag({ ...currentTag, add: true })
			setInputState('')
		}
		if(e.key === "ArrowDown"){
			searchItemsRef.current[0].parentNode.tabIndex = 0	
			searchItemsRef.current[0].parentNode.focus()

		}
	}
	return (
		<section className='search-bar'>
			<input type="text" className='search-input' name="search-input" id="search-input" placeholder='Enter tag...' value={inputState} onChange={(e) => {
				const value = e.target.value
				setInputState(value)
				setCurrentTag({ value: value, add: false })
			}} onKeyPress={(e) => handleKeyPress(e)} onKeyDown={(e) =>handleKeyPress(e)} autoFocus autoComplete="off"/>
			<aside className='tags-picked'>
				{
					tagsPicked.map((tag) => <Tag key={`tag-${tag.value}`} tag={tag} />)
				}
			</aside>
		</section>
	)
}

export default SearchBar