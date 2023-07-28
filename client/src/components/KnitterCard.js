import React from 'react';

function KnitterCard({ username, picture, bio, id }) {
    
    return(
        <a href={`/detail/${id}`}>
            <div className="w-80 rounded overflow-hidden shadow-lg auto-cols-auto bg-blue-200/50 m-6 ">
                <div className='container h-52 flex items-center overflow-hidden'>
                    <div className=''><img className="" src={picture} alt={username} /></div>
                </div>
                <div className='p-4'>
                    <div className='font-bold text-xl mb-2'>{username}</div>
                    <p className='text-gray-700 text-base'>BIO : {bio}</p>
                </div>
            </div>
        </a>
    )
}

export default KnitterCard;