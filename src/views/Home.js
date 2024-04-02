import axios from 'axios';
import { useEffect, useState } from "react";
import './home.css'
/* import { usePagination } from "@src/hooks"; */


const Home = () => {

    const [tags, setTags] = useState([]);
    const [pagesize, setPagesize] = useState([]);

    const getDane = () => {
        axios.get('https://api.stackexchange.com/2.3/tags?pagesize=15&order=desc&sort=popular&site=stackoverflow')
            .then((req) => {
                setTags(req.data.items)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDane();
    }, [])

    const tagName = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    console.log(tags);
    return (
        <div className="home" id='home'>
            <div className=''>
                <div className='number'>
                <label type="number">Quantity (between 1 and 15):</label>
                <input type="number" id="quantity" name="quantity" min="1" max="15" value={setTags} ></input><br />

                <label >Sortuj wedlug :</label>
                <select type='text'  >
                    <option value={tags.sort(tagName)}> A-Z</option>
                    <option value={tags.reverse(tagName)}> Z-A</option> {/* jak zrobic na odrowt */}
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

/* const MyComponent: React.FC = () => {
    const paginationRange = usePagination({
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 3,
    });
  
    return (
      <div>
        {paginationRange.map((pageNumber, index) => (
          <span key={index}>{pageNumber}</span>
        ))}
      </div>
    );
  }; */

export default Home;