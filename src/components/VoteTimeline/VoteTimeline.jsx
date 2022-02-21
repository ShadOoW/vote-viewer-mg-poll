import './VoteTimeline.css';
import { useState, useEffect } from "react";
import { Player } from './Player/Player';
import { VotesSlider } from './Slider/Slider';
import { VoteList } from './VoteList/VoteList';
import { players, votes } from '../../data';
import { normalize } from '../../utils/normalize';

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

export const VoteTimeline = () => {
  const [mark, setMark] = useState(0);
  const [currentVote, setCurrentVote] = useState(undefined);
  const [votes, setVotes] = useState([]);

  useEffect(async () => {
    const day1Ref = collection(db, "day1");
    const q = query(day1Ref, orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    setVotes(result);
  }, []);

  useEffect(() => {
    if (mark === 0) {
      setCurrentVote(votes[0]);
    } else {
      setCurrentVote(votes[mark - 1]);
    }
  }, [mark]);

  const normalizedPlayers = normalize(players, votes);
  return (
    <>
      <VotesSlider count={votes.length} handleChange={(_, value) => { setMark(value) }} />
      {players.map((player) => (
        <div className="players">
          <Player player={player} />
          <VoteList player={player} currentVote={currentVote} />
        </div>
      ))}
    </>
  );
}
