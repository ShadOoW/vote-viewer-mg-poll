import './VoteList.css';
import {Chip, Stack} from "@mui/material";

export const VoteList = ({player, currentVote}) => {
  if (!currentVote) {
    return <></>
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {[...currentVote.players[player.id]].reverse().map((vote) => (
        <Chip label={vote} color="info" size="small" />
      ))}
    </Stack>
  );
}
