import axios from 'axios';
import { useEffect, useState } from "react";
import './home.css'



const Home = () => {

    const [tags, setTags] = useState([]);
    const [pagesize, setPagesize] = useState(10);
    const [page, setPage] = useState();


    const getDane = () => {
        axios.get(`https://api.stackexchange.com/2.3/tags?pagesize=${pagesize}&order=desc&sort=popular&site=stackoverflow`,)
            .then((req) => {
                setTags(req.data.items)
                setPage(1)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDane();
    }, [pagesize])

    const tagName = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    const handleChangePageSize = (e) => {
        const newSize = e.target.value
        setPagesize(newSize)
    };

    const handleNextPage = () => { setPage(page - 1) }
    const handlePreviousPage = () => { setPage(page + 1) }

    /*   console.log(tags); */
    return (
        <div className="home" id='home'>
            <div className=''>
                <button className='pageChange' onClick={handleNextPage}>Previous </button>
                <span>{page} {page + 1} {page + 2} {page + 3 + '...'}</span>
                <button className='pageChange' onClick={handlePreviousPage}>Next </button>

                <div className='number'>
                    <label type="number">Quantity (between 1 and 15):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="15" onChange={handleChangePageSize} value={pagesize} ></input><br />

                    <label >Sortuj wedlug :</label>
                    <select type='text'  >
                        <option value={tags.sort(tagName)}> A-Z</option>
                        <option /* value={tags.reverse(tagName)} */> Z-A</option>
                    </select>
                </div>

                {tags.map((tag) => {
                    return (
                        <div className="tagItem">
                            <h3>Nazwa: {tag.name}</h3>
                            <p>Ilość wystąpień: {tag.count}</p>
                        </div>
                    );
                })}
            </div>
            <button className='pageChange' onClick={handleNextPage}>Previous </button>
            <span>{page} {page + 1} {page + 2} {page + 3 + '...'}</span>
            <button className='pageChange' onClick={handlePreviousPage}>Next </button>
        </div>

    );
};


export default Home;