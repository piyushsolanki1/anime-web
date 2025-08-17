import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
    return (
      <div className='search'>
          <div>
              <img src="src/assets/search.svg" alt="search" />
              <input className='' type="text" placeholder='search animes' 
              value={searchTerm}
              onChange={(event)=> setSearchTerm(event.target.value)}/>
          </div>
      </div>
    )
  }

export default Search