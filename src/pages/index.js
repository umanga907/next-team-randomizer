// pages/randomize.js
import { useState } from "react";
import "../assets/styles/styles.scss";
const Randomize = () => {
  const [names, setNames] = useState("");
  const [teamCapacity, setTeamCapacity] = useState(1);
  const [teams, setTeams] = useState([]);

  const handleShuffle = () => {
    // Split names by commas or new lines
    const allNames = names.split(/,|\r\n|\r|\n/).map((name) => name.trim());
    const shuffledNames = allNames.sort(() => 0.5 - Math.random());

    const tempTeams = [];
    while (shuffledNames.length) {
      tempTeams.push(shuffledNames.splice(0, teamCapacity));
    }
    setTeams(tempTeams);
  };

  const getNumberOfNames = () => {
    const allNames = names.split(/,|\r\n|\r|\n/).filter((name) => name.trim() !== ""); // Make sure to filter out empty names
    return allNames.length;
  };

  const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return [...new Set(results)]; // Returns unique duplicates
  };

  return (
    <div className="container pt-30 gap-20">
      <div>
        <div>
          <label>Names: </label>
          <textarea onChange={(e) => setNames(e.target.value)} value={names} rows="5" placeholder="Enter names with comma separated or each person name on each line" />
          <h3>{getNumberOfNames()} names entered</h3>
          {findDuplicates(names.split(/,|\r\n|\r|\n/).map((name) => name.trim())).length > 0 && (
            <div className="card mb-15">
              <span style={{ color: "red" }}>
                Duplicate names detected: 
                <span className="text-success ml-5">{findDuplicates(names.split(/,|\r\n|\r|\n/).map((name) => name.trim())).join(", ")}</span>
              </span>
            </div>
          )}
        </div>
        <div>
          <label>Team capacity: </label>
          <input type="number" onChange={(e) => setTeamCapacity(parseInt(e.target.value))} value={teamCapacity} />
        </div>
        <button onClick={handleShuffle}>Shuffle Teams</button>
      </div>
      <div className="teams">
        {teams.map((team, index) => (
          <div key={index} className="team">
            <h2>Team {index + 1}</h2>
            <ul>
              {team.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Randomize;
