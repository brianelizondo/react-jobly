import React from "react";


function PaginationCustom({ resultsPerPage, totalResults, paginate }){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={(evt) => {evt.preventDefault(); paginate(number) }} href="/companies" className="page-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default PaginationCustom;