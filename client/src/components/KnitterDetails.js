import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KnitterDetails( ) {

    const params = useParams();

    const [ knitterId, setKnitterId ] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:5555/knitters/${params.knitterId}`)
            .then(resp=> resp.json())
            .then(knitterId => setKnitterId(knitterId))
    }, [params.knitterId])

    return(
        <div >

            <div className="flex justify-center">
                <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-blue-200/50 m-6 center ">
                    <div className= "flex">
                        <img  className="w-auto h-96" src={knitterId.picture} alt={knitterId.username} />
                        <div className='px-6 py-4'>
                            <div className="font-bold text-xl mb-2"><h1>{knitterId.username}</h1></div>
                            <p className="text-gray-700 text-base"><b>Summary:</b> {knitterId.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KnitterDetails;