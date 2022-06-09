import React, { useState, useEffect } from 'react'
import { useGlobalContext } from './context'
const API_ENDPOINT = `./data.json`

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({ show: false, msg: '' })
    const { data, setData } = useGlobalContext()
    const fetchData = async (url) => {
        setIsLoading(true)
        try {
            const response = await fetch('./data.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()

            if (data) {
                setData(data)
                setError({ show: false, msg: '' })
            } else {
                setError({ show: true, msg: data.Error })
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(`${API_ENDPOINT}`)
    }, [])
    return { isLoading, error }
}

export default useFetch