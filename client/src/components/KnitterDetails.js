import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KnitterDetails() {
  const params = useParams();

  const [knitter, setKnitter] = useState({});

  useEffect(() => {
    fetch(`/api/knitters/${params.knitterId}`)
      .then((resp) => resp.json())
      .then((knitter) => setKnitter(knitter));
  }, [params.knitterId]);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-white m-6 center ">
            <div className="flex">
              <img
                className="w-auto h-96"
                src={knitter.picture}
                alt={knitter.username}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <h1>{knitter.username}</h1>
                </div>
                <p className="text-gray-700 text-base">
                  <b>Summary:</b> {knitter.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KnitterDetails;
