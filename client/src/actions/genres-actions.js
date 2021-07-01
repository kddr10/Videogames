import axios from 'axios'

export const getGenres = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
        .then(response => {
            dispatch({type: 'GET_GENRES', payload: response.data})
        })
    }
}