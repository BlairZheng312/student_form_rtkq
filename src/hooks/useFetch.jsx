import { useCallback, useState } from 'react'

export default function useFetch(reqObj, reload) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch(`http://localhost:1337/api/${reqObj.url}`, {
                method: reqObj.method || 'get',
                body: body ? JSON.stringify({ data: body }) : null,
                headers: {
                    'Content-type': reqObj.type || 'application/json'
                }
            })
            if (res.ok) {
                const data = await res.json()
                setData(data.data)
                reload && reload()
            } else {
                throw new Error('Loading failed')
            }
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        data,
        loading,
        error,
        fetchData
    }
}
