import axios from 'axios'

const getInfoByUrl = async (url) => {
    const req = await axios.get(url)
    return req
}

export default getInfoByUrl