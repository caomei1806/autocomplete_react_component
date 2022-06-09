import React, { useState } from 'react'
import Tag from './Tag'
import '../scss/autocompleteElements/SearchBar.scss'
import { useGlobalContext } from '../../context';
const SearchBar = () => {
	const { tagsPicked, setTagsPicked, currentTag, setCurrentTag } = useGlobalContext()
	const [inputState, setInputState] = useState('')
	const addTag = (e) => {
		if (e.key === 'Enter') {
			setCurrentTag({ ...currentTag, add: true })
			setInputState('')
		}
	}
	return (
		<section className='search-bar'>
			<input type="text" className='search-input' name="search-input" id="search-input" placeholder='Enter tag...' value={inputState} onChange={(e) => {
				const value = e.target.value
				setInputState(value)
				setCurrentTag({ value: value, add: false })
			}} onKeyPress={(e) => addTag(e)} autoFocus />
			<aside className='tags-picked'>
				{
					tagsPicked.map((tag) => <Tag key={`tag-${tag.value}`} tag={tag} />)
				}
			</aside>
		</section>
	)
}

export default SearchBar