import axios from 'axios';
import { useEffect, useState } from "react";
import './home.css'
import Box from '@mui/system/Box';


const Home = () => {

    const [tags, setTags] = useState([]);
    const [pagesize, setPagesize] = useState(10);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(true);


    const getDane = () => {
        axios.get(`https://api.stackexchange.com/2.3/tags?pagesize=${pagesize}&page=${page}&order=desc&sort=popular&site=stackoverflow`,)
            .then((req) => {
                setTags(req.data.items)
            })
            .catch((err) => {
                console.log(err);
                setError(false)
            });
    };

    /* console.log(pageNumber); */

    useEffect(() => {
        getDane();
    }, [pagesize, page])

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

    const handleChangePage = (selectedPage) => {
        setPage(selectedPage);
    };

    const handleNextPage = () => { setPage(page - 1) }
    const handlePreviousPage = () => { setPage(page + 1) }

    /*   console.log(tags); */
    return (
        <Box className="home" id='home'>
            {!error && <img src='https://www.blogpoker.org/capung.gif' alt='error '></img>}
            {error && <div className=''>

                <div className='pagination' onChange={handleChangePage}>
                    <button className='pageChange' onClick={handleNextPage} disabled={page === 1} >Previous{" "}</button>
                    <span onClick={() => handleChangePage(page)}>{page}</span>
                    <span onClick={() => handleChangePage(page + 1)}>{page + 1}</span>
                    <span onClick={() => handleChangePage(page + 2)}>{page + 2}</span>
                    <span onClick={() => handleChangePage(page + 3)}>{page + 3}</span>
                    <button className='pageChange' onClick={handlePreviousPage} value={page} >Next{" "} </button>
                </div>

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

                <div className='pagination' >
                    <button className='pageChange' onClick={handleNextPage} disabled={page === 1}>Previous{" "} </button>
                    <span onClick={() => handleChangePage(page)}>{page}</span>
                    <span onClick={() => handleChangePage(page + 1)}>{page + 1}</span>
                    <span onClick={() => handleChangePage(page + 2)}>{page + 2}</span>
                    <span onClick={() => handleChangePage(page + 3)}>{page + 3}</span>
                    <button className='pageChange' onClick={handlePreviousPage}>Next{" "} </button>
                </div>
            </div >}
        </Box>
    );
};


export default Home;