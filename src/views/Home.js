import axios from 'axios';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './home.css'

const Home = () => {

    const [tags, setTags] = useState([]);
    const [pagesize, setPagesize] = useState(10);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);

    const getDane = () => {
        axios.get(`https://api.stackexchange.com/2.3/tags?page=1&pagesize=${pagesize}&pageNumber=${pageNumber}&order=desc&sort=popular&site=stackoverflow`,)
            .then((req) => {
                setTags(req.data.items)
              
            })
            .catch((err) => {
                console.log(err);
                setError(false)
            });
    };

    console.log(pageNumber);

    useEffect(() => {
        getDane();
        setPageNumber(Math.ceil(tags.length / itemsPerPage));
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

    /* pagination controler */
    const itemsPerPage = pagesize
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = tags.slice(startIndex, endIndex);

    

    const handleChangePage = (selectedPage) => {
        setPage(selectedPage.selected);
    };


    const handleNextPage = () => { setPage(page - 1) }
    const handlePreviousPage = () => { setPage(page + 1) }



    /*   console.log(tags); */
    return (
        <div className="home" id='home'>
            {!error && <img src='https://www.blogpoker.org/capung.gif' alt='error '></img>}
            {error && <div className=''>

                <div className='pagination' onChange={handleChangePage}>
                    <button className='pageChange' onClick={handleNextPage} disabled={page === 1} >Previous </button>
                    <a href='#' >{page}  </a>
                    <a href='#'>{page + 1}</a>
                    <a href='#'>{page + 2}</a>
                    <a href='#'>{page + 3}</a>
                    <a href='#'>{'...'}</a>
                    <button className='pageChange' onClick={handlePreviousPage} value={page} >Next </button>
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

                <div className='pagination'>
                    <button className='pageChange' onClick={handleNextPage} disabled={page === 1}>Previous </button>
                    <a href='#'>{page}  </a>
                    <a href='#'>{page + 1}</a>
                    <a href='#'>{page + 2}</a>
                    <a href='#'>{page + 3}</a>
                    <a href='#'>{'...'}</a>
                    <button className='pageChange' onClick={handlePreviousPage}>Next </button>
                </div>
            </div >}

        </div>



    );
};


export default Home;