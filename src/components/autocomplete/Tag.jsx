import React from 'react'
import '../scss/autocompleteElements/Tag.scss'
import { IoMdClose } from 'react-icons/io'
import { useGlobalContext } from '../../context'
const Tag = ({ tag }) => {
	const { value } = tag
	const { tagsPicked, setTagsPicked } = useGlobalContext()
	const deleteTag = (e) => {
		console.log(e.target.parentElement)
		const updatedTags = tagsPicked.filter((tag) => tag.value !== value)
		setTagsPicked(updatedTags)
	}
	return (
		<article className='tag'>
			<span className='tag-name'>{value}</span>
			<IoMdClose className='tag-close' onClick={(e) => deleteTag(e)} />
		</article>
	)
}

export default Tag