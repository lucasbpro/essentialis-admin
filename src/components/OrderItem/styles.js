import styled from 'styled-components';

export const TableItem = styled.tr`
  color: var(--black);
  text-align: left;
  td:last-child {
    text-align: center
  }
  ul {
    padding: 0;
    list-style-type: none
  }
  li {
    margin-bottom:5px;
  }

  @media (max-width: 800px) {
    margin-bottom: 10px;
  }
`;
