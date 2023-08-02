import React from 'react';
import ProjectCollection from './ProjectCollection';
import { useState } from "react";
import Search from './Search';

function ProjectsPage({ projects }){
   
    const [ searchTerm, setSearchTerm ] = useState("")
   
    function handleSearch(e) {
        e.preventDefault()
        
        setSearchTerm(e.target.searchTerm.value)
    }
   
    return (
        <>
            <div className="flex justify-center "><Search handleSearch={handleSearch} /></div>
            <div className='flex justify-center product-page'>
                <div className='max-w-4xl p-10'><ProjectCollection projects={projects} searchTerm={searchTerm} /></div>
            </div>
        </>
    )
}

export default ProjectsPage;