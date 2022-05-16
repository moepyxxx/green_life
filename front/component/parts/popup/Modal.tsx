import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../../utility/getColor";
import CloseButton from "./CloseButton";

type Props = {
  isActive: boolean;
  children: ReactChild;
  closeAction: () => void;
  position?: "absolute" | "fixed";
};

const Modal: React.FC<Props> = ({
  isActive,
  children,
  closeAction,
  position = "fixed",
}) => {
  return (
    <>
      <InnerModal isActive={isActive} position={position}>
        <CloseButton click={closeAction} />
        {children}
      </InnerModal>
    </>
  );
};

export default Modal;

const InnerModal = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: ${(props) => props.position};
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-height: 80%;
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  text-align: left;
`;
