import React,{forwardRef} from 'react'

const SingleSearchElement = forwardRef((props,ref) => {
	const {element, index} = props
  return (
	<li className='search-list-element' ref={ref}>{element.name}</li>
  )
})

export default SingleSearchElement