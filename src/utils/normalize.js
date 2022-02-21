export const normalize = (players, votes) => {
  return players
    .filter(player => (
      votes.find(vote => vote.target === player.id)
    ))
    .map((player) => ({
      ...player,
      votes: votes
        .filter((vote) => vote.target === player.id)
        .sort((a, b) => a.postId - b.postId)
    }))
    .sort((a, b) => b.votes.length - a.votes.length);
}
