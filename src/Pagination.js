import React, { useState } from "react";
import './Pagination.css'

const Pagination = data => {
    const [pages] = useState(Math.round(data.data.length / 10))
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * 10 - 10;
        const endIndex = startIndex + 10;
        return data.data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 10) * 10;
        return new Array(10).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <h2 className="text-align-center">Top 100 Cryptocurrencies</h2>
            <h4 className="text-align-center">(By market cap)</h4>
            <div className="header-box">
                <div className="box">
                    <h5 className="header-row">Rank</h5>
                    <h5 className="header-row">Symbol</h5>
                    <h5 className="header-row">USD</h5>
                    <h5 className="header-row">24h Change</h5>
                </div>
            </div>

            <div className="dataContainer">

                {getPaginatedData().map((data, index) => (
                    <div key={index} className="box">
                        <div className="column">
                            {data.rank}
                        </div>
                        <div className="column">
                            {data.symbol}
                        </div>
                        <div className="column">
                            ${data.priceUsd > 1 ?
                                Math.floor(data.priceUsd * 100) / 100 :
                                data.priceUsd < 0.0001 ?
                                    Math.floor(data.priceUsd * 10000000) / 10000000 :
                                    Math.floor(data.priceUsd * 10000) / 10000}
                        </div>
                        <div className="column">
                            {data.changePercent24Hr > 0 ?
                                <span className='text-success'> {Math.floor(data.changePercent24Hr * 100) / 100}%</span> :
                                <span className='text-danger'> {Math.floor(data.changePercent24Hr * 100) / 100}%</span>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === 10 ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default Pagination;