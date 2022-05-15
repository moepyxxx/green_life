import { useEffect, useState } from "react";
import { ToastContext } from "../../utility/customhooks/useToast";
import styled from "styled-components";

import IconInfo from "../../img/icon/information.svg";
import Image from "next/image";
import Typography from "../parts/Typography";
import Box from "../parts/Box";

import { Flex } from "../../styles/components/Flex";

const ToastProvider: React.FC = ({ children }) => {
  const [showable, setShowable] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");

  // なんかおかしい
  useEffect(() => {
    const interval = setInterval(() => {
      setShowable(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [showable]);

  const toast = ({ text }) => {
    setToastText(text);
    setShowable(true);
  };

  return (
    <ToastContext.Provider value={toast}>
      <Toast visible={showable}>
        <Box paddingH={4} paddingV={3}>
          <Flex alignItems="center">
            <Image
              src={IconInfo}
              alt="お知らせアイコン"
              width="24"
              height="24"
            />
            <Text>
              <Typography size="regular">{toastText}</Typography>
            </Text>
          </Flex>
        </Box>
      </Toast>

      {children}
    </ToastContext.Provider>
  );
};

const Toast = styled.span`
  display: ${(prop) => (prop.visible ? "block" : "none")};
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: calc(100% - 40px);
`;

const Text = styled.span`
  width: calc(100% - 24px - 12px);
  padding-left: 12px;
`;

export default ToastProvider;
