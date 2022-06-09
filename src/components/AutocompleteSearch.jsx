import React from 'react'
import useFetch from '../useFetch'
import SearchBar from './autocomplete/SearchBar'
import SearchList from './autocomplete/SearchList'
import './scss/AutocompleteSearchComponent.scss'
const AutocompleteSearch = () => {
	const { isLoading } = useFetch()
	return (
		<section className='component-search-autocomplete'>
			<SearchBar />
			{!isLoading && <SearchList />}
		</section>
	)
}

export default AutocompleteSearch