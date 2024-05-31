import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'cbc38f28caed4572a2911a2da865039e'
    }
})