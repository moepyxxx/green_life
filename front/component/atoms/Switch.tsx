import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";

type Props = {
  action: (isActive: boolean) => void;
  checked: boolean;
};

const Switch: React.FC<Props> = ({ action, checked = false }) => {
  const [isChecked, setIsCheked] = useState<boolean>(checked);

  useEffect(() => {
    action(isChecked);
  }, [isChecked]);

  const change = () => {
    setIsCheked(!isChecked);
  };

  return (
    <SwitchWrap>
      <input
        type="checkbox"
        id="switch"
        defaultChecked={isChecked}
        onChange={change}
      />
      <label htmlFor="switch"></label>
      <span className="switchimg"></span>
    </SwitchWrap>
  );
};

export default Switch;

const SwitchWrap = styled.div`
  letter-spacing: 0;
  text-align: center;
  position: relative;
  width: 52px;
  background: #fff;

  input {
    display: none;
  }

  label {
    display: block;
    box-sizing: border-box;
    height: 28px;
    border-radius: 30px;
    border: 2px solid ${getColor("secondary")};
    background-color: ${getColor("white")};
  }

  input:checked + label {
    border-color: ${getColor("secondary")};
    background-color: ${getColor("secondary")};
  }

  .switchimg {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 4px;
    left: 4px;
    border-radius: 50%;
    transition: 0.5s;
    background: ${getColor("secondary")};
  }

  input:checked ~ .switchimg {
    transform: translateX(24px);
    background: ${getColor("white")};
  }
`;
