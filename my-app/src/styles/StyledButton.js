import styled from 'styled-components';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)`
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-transform: none;
  &:hover {
    background-color: #3700b3;
  }
`;

export default StyledButton;