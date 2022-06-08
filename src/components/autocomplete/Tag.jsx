import React from 'react'
import '../scss/autocompleteElements/Tag.scss'
import {IoMdClose} from 'react-icons/io'
const Tag = () => {
	const deleteTag = (e) => {
		console.log(e.target.parentElement)
		e.target.parentElement.remove()
	}
  return (
	<article className='tag'>
		<span className='tag-name'>Tag</span>
		<IoMdClose className='tag-close' onClick={(e) => deleteTag(e)} />
	</article>
  )
}

export default Tag