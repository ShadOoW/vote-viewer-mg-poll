import './Player.css';

export const Player = ({player}) => {
  return (
    <div className="player">
      <span>{player.display}</span>
    </div>
  );
}
