import KnitterCard from "./KnitterCard";

function KnitterCollection({ knitters, searchTerm }) {
  const filteredKnitters = knitters.filter((knitter) => {
    return knitter.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderKnittersToCards = filteredKnitters.map((knitter) => (
    <KnitterCard
      key={knitter.id}
      id={knitter.id}
      username={knitter.username}
      picture={knitter.picture}
      bio={knitter.bio}
    />
  ));

  return <ul className="cards flex flex-wrap">{renderKnittersToCards}</ul>;
}

export default KnitterCollection;
