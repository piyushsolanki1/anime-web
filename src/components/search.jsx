import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className='search'>
            <div>
                <img src="/search.svg" alt="search" />
                <input className='' type="text" placeholder='search animes' 
                value={searchTerm}
                onChange={(event)=> setSearchTerm(event.target.value)}/>
            </div>
        </div>
    )
    }
export default search