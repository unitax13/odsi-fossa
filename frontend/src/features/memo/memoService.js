import axios from 'axios';

const API_URL = '/api/memos/'

// post a memo
// create new memo
const createMemo = async (memoData, token) => {
    // console.log("Createservice called with memodata of " + JSON.stringify(memoData))
    const config = {
        headers : {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.post(API_URL, memoData, config)

    return response.data
}

// get user memos
const getMemos = async (token) => {
    // console.log("get memos service called")
    const config = {
        headers : {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//delete a memo
const deleteMemo = async (id, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data
}

//delete a memo
const updateMemo = async (a, token) => {
    const memoData = {markdown: a.markdown};
    const id = a.id;
    // console.log("Update service called with memodata of " + memoData + " and id of " + id)
    const config = {
        headers : {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.put(API_URL + id, memoData, config)

    return response.data
}
 
const memoService = {
    createMemo,
    getMemos,
    deleteMemo,
    updateMemo
}

export default memoService;