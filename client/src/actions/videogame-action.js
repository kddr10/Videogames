import axios from 'axios'

export const getVideogameDetail = (id) => {  
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then(response => {

            dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: response.data})

        })
    }
}