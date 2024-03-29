import './VoteTimeline.css';
import { useState, useEffect } from "react";
import { Player } from './Player/Player';
import { VotesSlider } from './Slider/Slider';
import { VoteList } from './VoteList/VoteList';
import { game112PlayersD1, GAME112DAY1VOTES, game111PlayersD1, GAME111DAY1VOTES,game104PlayersD2, GAME104DAY1VOTES, GAME104DAY2VOTES } from '../../data';

import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, query, orderBy, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbRFM7Gse_R79vBxBW9Soz4qiowpiEXZY",
  authDomain: "mafia-vote-history.firebaseapp.com",
  projectId: "mafia-vote-history",
  storageBucket: "mafia-vote-history.appspot.com",
  messagingSenderId: "419610802089",
  appId: "1:419610802089:web:e2059b1d7a41f63401f6b8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const VoteTimeline = ({day}) => {
  const [mark, setMark] = useState(0);
  const [currentVote, setCurrentVote] = useState(undefined);
  const [votes, setVotes] = useState([]);

  useEffect(async () => {
    // const day1Ref = collection(db, `day${day}`);
    // const q = query(day1Ref, orderBy("timestamp"));
    // const querySnapshot = await getDocs(q);
    // const result = [];
    // querySnapshot.forEach((doc) => {
    //   result.push(doc.data());
    // });

    if (day === 1) {
      setVotes(GAME112DAY1VOTES);
    } else {
      setVotes(GAME104DAY2VOTES);
    }
  }, [day]);

  useEffect(() => {
    if (mark === 0) {
      setCurrentVote(undefined);
    } else {
      setCurrentVote(votes[mark - 1]);
    }
  }, [mark]);

  let players;
  switch (day) {
    case 1:
      players = game112PlayersD1;
      break;
    case 2:
      players = game104PlayersD2;
      break;
    case 3:
    default:
      players = game112PlayersD1;
      break;
  }

  // {currentVote && currentVote.timestamp.toDate().toLocaleString()}

  return (
    <>
      <VotesSlider count={votes.length} handleChange={(_, value) => { setMark(value) }} />
      <div className='time'>
        {currentVote && new Date(currentVote.timestamp).toLocaleString()}
        {!currentVote && 'N/A'}
      </div>
      {players.map((player) => (
        <div key={player.id} className="players">
          <Player player={player} currentVote={currentVote} />
          <VoteList player={player} currentVote={currentVote} />
        </div>
      ))}
    </>
  );
}
