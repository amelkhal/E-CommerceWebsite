import axios from 'axios';
import { 
    BOOK_LIST_REQUEST, 
    BOOK_LIST_SUCCESS, 
    BOOK_LIST_FAIL,
    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL
} from '../constants/bookConstants';

// Action to fetch list of books
export const listBooks = () => async (dispatch) => {
    try {
        dispatch({ type: BOOK_LIST_REQUEST });

        const { data } = await axios.get('/api/books');
        
        // Check if the response data is an array
        if (Array.isArray(data)) {
            dispatch({
                type: BOOK_LIST_SUCCESS,
                payload: data
            });
        } else {
            console.error('Unexpected data format:', data);
            dispatch({
                type: BOOK_LIST_FAIL,
                payload: 'Unexpected response format'
            });
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        dispatch({
            type: BOOK_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to fetch details of a single book by ID
export const getBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/books/${id}`);

        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error('Error fetching book details:', error);
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
