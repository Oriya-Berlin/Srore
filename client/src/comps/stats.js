import React,{useState, useEffect} from 'react';
import axios from 'axios';




const Stats = () => {

    const [top5Sold, setTop5Sold] = useState([]);
    const [top5UniqueSold, setTop5UniqueSold] = useState([]);
    const [past5Days, setTop5Days] = useState([]);


    useEffect(() => {

        axios.get('/stats/top5')
        .then(res => setTop5Sold(res.data))
        .catch(err => console.log(err))

        axios.get('/stats/top5unique')
        .then(res => setTop5UniqueSold(res.data))
        .catch(err => console.log(err))

        axios.get('/stats/past5')
        .then(res => setTop5Days(res.data))
        .catch(err => console.log(err))

    },[]);


    const width = {width: '26rem'}

    return (
        <div>

            <h1>Stats</h1>

            <div className="container">
                <div className="row">


                    <div className="col">
                        <div className="card" style={width}>
                            <div className="card-header">
                                Top 5 sold products
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    top5Sold.map((item, index) => (
                                        <li className="list-group-item">({index+1}) {item._id}: {item.count}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>


                    <div className="col">
                        <div className="card" style={width}>
                            <div className="card-header">
                                Top 5 unique sold products
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    top5UniqueSold.map((item, index) => (
                                        <li className="list-group-item">({index+1}) {item.product_id}: {item.counter}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>


                    <div className="col">
                        <div className="card" style={width}>
                            <div className="card-header">
                                Sales for the past 5 days
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    past5Days.map((item, index) => (
                                        <li className="list-group-item">({index+1}) {item._id}: {item.total}$</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )


}


export default Stats;
