import React, { useEffect, useRef } from 'react'
import Tag from './Tag'
import '../scss/autocompleteElements/SearchBar.scss'
const SearchBar = () => {
	const searchInput = useRef();
	useEffect(() => {
		searchInput.current.focus()
	},[])
  return (
	<section className='search-bar'>
		<input type="text" className='search-input' name="search-input" id="search-input" placeholder='Enter tag...' ref={searchInput} />
		<aside className='tags-picked'>
			<Tag />
			<Tag />
			<Tag />
			<Tag />
			<Tag />
			<Tag />
		</aside>
	</section>
  )
}

export default SearchBar