import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import './section1.css'

const Search = () => {

    const users = useSelector(state => state.setSearchUsers.searchUsers)
    const [search,setSearch] = useState("")



        return(
            <div className='search'>
                <p>Conversation</p>
                <input
                 className='searchInput'
                  placeholder='⌕ Search'
                  onChange={(e)=>{
                    setSearch(e.target.value)
                  }}
                  value={search}
                  />
            </div>
        )
    }


export default Search;