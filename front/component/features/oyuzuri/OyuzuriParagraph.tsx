import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { IApiOyuzuri } from "../../../pages/posts/interfaces/apiOyuzuri";
import { Flex } from "../../../styles/components/Flex";
import { Spacing } from "../../../styles/components/Spacing";
import getColor from "../../../utility/getColor";
import IconButton from "../../atoms/IconButton";
import Modal from "../../atoms/Modal";
import Shadow from "../../atoms/Shadow";
import TextBudge from "../../atoms/TextBudge";
import Typography from "../../atoms/Typography";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const OyuzuriParagraph: React.FC<Props> = ({ oyuzuri }) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  return (
    <>
      <Gray>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Typography size="medium" weight="bold">
              おゆずりします！
            </Typography>
            <IconButton click={() => setIsModalActive(true)}>
              <Typography color="white" weight="bold">
                ?
              </Typography>
            </IconButton>
          </Flex>
          <Typography size="regular" margin="8px 0 0">
            {oyuzuri.oyuzuriComment}
          </Typography>
        </>
      </Gray>

      <Shadow isActive={isModalActive} />

      <Modal
        isActive={isModalActive}
        closeAction={() => setIsModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            おゆずり機能について
          </Typography>
          <Typography size="regular">
            ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
          </Typography>
          <Spacing mt={5}>
            <Flex alignItems="flex-start" justifyContent="space-between">
              <FlexWrap>
                <TextBudge>step 1</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 2</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 3</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 4</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
            </Flex>
          </Spacing>
        </>
      </Modal>
    </>
  );
};

const Gray = styled.div`
  margin: 32px 0 0;
  background-color: ${getColor("disable")};
  padding: 16px;
  border-radius: 4px;
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;

export default OyuzuriParagraph;
