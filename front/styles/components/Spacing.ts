import styled from "styled-components";

export const Spacing = styled.div`
  ${(props) => (props.mr ? "margin-right: calc(" + props.mr + " * 4px);" : "")}
  ${(props) => (props.ml ? "margin-left: calc(" + props.ml + " * 4px);" : "")}
  ${(props) => (props.mt ? "margin-top: calc(" + props.mt + " * 4px);" : "")} 
  ${(props) =>
    props.mb ? "margin-bottom: calc(" + props.mb + " * 4px);" : ""} 
  ${(props) => (props.ma ? "margin: " + props.ma + ";" : "")} 
  ${(props) =>
    props.pr ? "padding-right: calc(" + props.pr + " * 4px);" : ""} 
  ${(props) => (props.pl ? "padding-left: calc(" + props.pl + " * 4px);" : "")} 
  ${(props) => (props.pt ? "padding-top: calc(" + props.pt + " * 4px);" : "")} 
  ${(props) =>
    props.pb ? "padding-bottom: calc(" + props.pb + " * 4px);" : ""} 
  ${(props) => (props.pa ? "padding: " + props.pa + ";" : "")}
`;
