import './Player.css';
import {useEffect, useState} from "react";

export const Player = ({player, currentVote}) => {
  const [count, setCount] = useState(0);
  const [isHighest, setIsHighest] = useState(false);

  useEffect(() => {
    if (currentVote && currentVote.players[player.id]) {
      setCount(calculateCount(currentVote.players[player.id]));
      setIsHighest(calculateIsHighest())
    } else {
      setCount(0);
    }
  }, [currentVote, player.id])

  useEffect(() => {
    if (currentVote) {
      setIsHighest(calculateIsHighest())
    } else {
      setIsHighest(false);
    }
  }, [currentVote, player.id, count])

  const calculateCount = (player) => {
    let tempCount = 0;
    for(let i=0; i< player.length; i++) {
      if (player[i].lock) {
        tempCount++;
      } else {
        if (!wasLocked(player[i])) {
          tempCount++;
        }
      }
    }
    return tempCount;
  }

  const calculateIsHighest = () => {
    let counts = [];
    for (const [_key, value] of Object.entries(currentVote.players)) {
      counts.push(calculateCount(value));
    }
    return Math.max(...counts) === count;
  }


  const wasLocked = (vote) => {
    let foundLockedVote = false;
    for (const [_key, value] of Object.entries(currentVote.players)) {
      foundLockedVote = value.some(item => item.lock && item.player === vote.player);
      if (foundLockedVote) {
        break;
      }
    }
    return foundLockedVote;
  }

  // const isHighest = () => {
  //   return true;
  // }

  return (
    <>
      <div className="player">
        <span>{player.display}</span>
      </div>

      <div className="player">
        <span className={`count ${isHighest ? 'highest' : ''}`}>{count}</span>
      </div>
    </>
  );
}
