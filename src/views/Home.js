import axios from 'axios';
import { useEffect, useState } from "react";

const Home = () => {

    const [tag, setTag] = useState([])

    const getDane = () => {
        axios.post('https://api.stackexchange.com/docs/tags')
            .then((req) => {
                console.log(req);
            })
    }

    useEffect(() => {
        getDane();
    }, [])

    return <h2>Home</h2>
}

export default Home;