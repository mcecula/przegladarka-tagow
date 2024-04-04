import axios from 'axios';
import { useEffect, useState } from "react";
import './home.css'



const Home = () => {

    const [tags, setTags] = useState([]);
    const [pagesize, setPagesize] = useState(10);

    const getDane = () => {
        axios.get('https://api.stackexchange.com/2.3/tags?pagesize=15&order=desc&sort=popular&site=stackoverflow',)
            .then((req) => {
                setTags(req.data.items)
                setPagesize()
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





    console.log(tags);
    return (
        <div className="home" id='home'>
            <div className=''>
                <div className='number'>
                    <label type="number">Quantity (between 1 and 15):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="15" onChange={handleChangePageSize} value={pagesize} ></input><br />

                    <label >Sortuj wedlug :</label>
                    <select type='text'  >
                        <option value={tags.sort(tagName)}> A-Z</option>
                        <option /* value={tags.reverse(tagName)} */> Z-A</option> {/* jak zrobic na odrowt */}
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


        </div>




    );
};


export default Home;