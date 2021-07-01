import axios from 'axios'

export const getVideogames = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
        .then(response => {
            dispatch({type: 'GET_VIDEOGAMES', payload: response.data});
        })
    }
}

export const getVideogamesByName = (name) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then(response => {
            dispatch({type: 'GET_VIDEOGAMES_BY_NAME', payload: response.data})
        })
        .catch(error => {
            dispatch({type: 'SET_ERROR', payload: error.response.data})
        })
    }
}

export const cleanError = (name) => {
    return (dispatch) => {
        dispatch({type: 'SET_ERROR', payload: ''})
    }
}

export const setOriginFilter = (value) => {
    return (dispatch) => {
        dispatch({type: 'SET_FILTER_BY_ORIGIN', payload: value})
    }
}

export const setGenresFilter = (value) => {
    return (dispatch) => {
        dispatch({type: 'SET_FILTER_BY_GENRES', payload: value})
    }
}

export const getVideogamesOrderedAz = () => {
    return (dispatch) => {
        dispatch({type: 'GET_VIDEOGAMES_ORDERED_AZ'})
    }
}

export const getVideogamesOrderedZa = () => {
    return (dispatch) => {
        dispatch({type: 'GET_VIDEOGAMES_ORDERED_ZA'})
    }
}

export const getVideogamesOrderedLowerRating = () => {
    return (dispatch) => {
        dispatch({type: 'GET_VIDEOGAMES_ORDERED_LOWER_RATING'})
    }
}

export const getVideogamesOrderedHigherRating = () => {
    return (dispatch) => {
        dispatch({type: 'GET_VIDEOGAMES_ORDERED_HIGHER_RATING'})
    }
}