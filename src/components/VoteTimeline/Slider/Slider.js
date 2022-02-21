import './Slider.css';
import Slider from '@mui/material/Slider';

export const VotesSlider = ({handleChange, count}) => {
  function valuetext(value) {
    return `${value}-vote`;
  }

  return (
    <div className="slider">
      <Slider
        aria-label="Votes"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={count}
        onChange={handleChange}
      />
    </div>
  );
}
