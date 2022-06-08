import React from 'react'
import SearchBar from './autocomplete/SearchBar'
import SearchList from './autocomplete/SearchList'
import './scss/AutocompleteSearchComponent.scss'
const AutocompleteSearch = () => {
  return (
	<section className='component-search-autocomplete'>
		<SearchBar />
		<SearchList />
	</section>
  )
}

export default AutocompleteSearch