import './VoteList.css';
import {Chip, Stack} from "@mui/material";

export const VoteList = ({player, currentVote}) => {
  if (!currentVote) {
    return <></>
  }

  if (!currentVote.players[player.id]) {
    console.log('player is undefined');
    console.log({player: player.id});
    console.log({currentVote: currentVote.players});
  }
  


  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {[...currentVote.players[player.id]].reverse().map((vote) => (
        <Chip label={vote} color="info" size="small" />
      ))}
    </Stack>
  );
}
