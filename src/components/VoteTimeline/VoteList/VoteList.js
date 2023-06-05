import './VoteList.css';
import {Chip, Stack} from "@mui/material";

export const VoteList = ({player, currentVote}) => {
  if (!currentVote) {
    return <></>
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

  if (!currentVote.players[player.id]) {
    console.log('player is undefined');
    console.log({player: player.id});
    console.log({currentVote: currentVote.players});
    return <></>;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {[...currentVote.players[player.id]].map((vote, index) => (
        <Chip
          key={vote.player + index}
          className="strong"
          disabled={!vote.lock && wasLocked(vote)}
          label={vote.player}
          variant={vote.dead || vote.annon ? 'outlined' : 'filled'}
          color={vote.dead || vote.annon ? 'secondary' : vote.lock ? 'error' : wasLocked(vote) ? 'info' : 'success'}
          size="small"
        />
      ))}
    </Stack>
  );
}
