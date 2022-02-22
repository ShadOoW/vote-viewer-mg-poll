import './VoteTimeline.css';
import { useState, useEffect } from "react";
import { Player } from './Player/Player';
import { VotesSlider } from './Slider/Slider';
import { VoteList } from './VoteList/VoteList';
import { playersD1, playersD2 } from '../../data';

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
    const day1Ref = collection(db, `day${day}`);
    const q = query(day1Ref, orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    console.log({result, day});

    setVotes(result);
  }, [day]);

  useEffect(() => {
    if (mark === 0) {
      setCurrentVote(undefined);
    } else {
      setCurrentVote(votes[mark - 1]);
    }
  }, [mark]);

  const players = day === 1 ? playersD1 : playersD2;

  return (
    <>
      <VotesSlider count={votes.length} handleChange={(_, value) => { setMark(value) }} />
      <div className='time'>
        {currentVote && currentVote.timestamp.toDate().toLocaleString()}
      </div>
      {players.map((player) => (
          <div className="players">
            <Player player={player} />
            <VoteList player={player} currentVote={currentVote} />
          </div>
      ))}
    </>
  );
}
