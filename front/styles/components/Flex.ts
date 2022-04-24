import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${(props) =>
    props.alignItems ? "align-items: " + props.alignItems + ";" : ""}
  ${(props) =>
    props.justifyContent
      ? "justify-content: " + props.justifyContent + ";"
      : ""}
`;
