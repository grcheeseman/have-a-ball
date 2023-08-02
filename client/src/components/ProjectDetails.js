import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectDetails( ) {

    const params = useParams();

    const [ projectId, setProjectId ] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:5555/projects/${params.projectId}`)
            .then(resp=> resp.json())
            .then(projectId => setProjectId(projectId))
    }, [params.projectId])

    return(
        <div >

            <div className="flex justify-center">
                <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-blue-200/50 m-6 center ">
                    <div className= "flex">
                        <img  className="w-auto h-96" src={projectId.picture} alt={projectId.pattern_name} />
                        <div className='px-6 py-4'>
                            <div className="font-bold text-xl mb-2"><h1>{projectId.pattern_name}</h1></div>
                            <p className="text-gray-700 text-base"><b>Project Summary:</b> {projectId.body}</p>
                            <p className="text-gray-700 text-base"><b>Likes:</b> {projectId.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;