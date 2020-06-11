import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template: repeat(4, 40px) / repeat(3, 40px);
`;

const Key = styled.button`
  grid-row-start: {props.row};
  grid-col-start: {props.column};
  width: 100%;
  height: 100%;
`;

const ScoreEntry = ({scoreEntered}) => {
  let keys = [];
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      if ((i-1)*3+j < 11) {
        keys.push(<Key row={i} column={j+1} onClick={scoreEntered} value={(i-1)*3+j} key={(i-1)*3+j}>{(i-1)*3+j}</Key>);
      }
    }
  }
  return (
    <Grid>{ keys }</Grid>
  );
}

export default ScoreEntry;
