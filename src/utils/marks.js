export const normalizeMarks = (votes) => {
  return votes
    .map(vote => ({
      value: vote.postId,
      label: vote.postId,
    }))
    .sort((a, b) => a.postId - b.postId);
}
