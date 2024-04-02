import axios from 'axios';
import { useEffect, useState } from "react";

const Home = () => {

    const [tags, setTags] = useState([]);

    const getDane = () => {
        axios.get('https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow')
            .then((req) => {
                setTags(req.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDane();
    }, [])

    console.log(tags.items);
    return (
        <div className='home'>
            <div>{tags.map((tag) => {
                return <h2>{tag}</h2>
            })}</div>
        </div>
    );
};

export default Home;