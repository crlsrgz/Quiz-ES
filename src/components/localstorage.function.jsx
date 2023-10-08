export default function setLocalStorage(
  userId,
  arrayAnswered,
  score,
  gamesPlayed,
  tries,
  won,
  played,
  lastPlayed,
) {
  return JSON.stringify({
    userId: userId,
    answered: arrayAnswered,
    score: score,
    gamesPlayed: gamesPlayed,
    tries: tries,
    playedHistory: { won: won, played: played, lastPlayed: lastPlayed },
  });
}
