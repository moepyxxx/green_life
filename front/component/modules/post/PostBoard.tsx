import React, { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { PostContext } from "../../../pages/posts/[id]";
import { Flex } from "../../../styles/components/Flex";
import { TextAlign } from "../../../styles/components/TextAlign";

import Typography from "../../parts/Typography";
import LikeField from "./LikeField";
import Tag from "../tag/Tag";
import Box from "../../parts/Box";
import Image from "next/image";
import { Spacing } from "../../../styles/components/Spacing";

export type TPostBoard = {
  name: string;
  username: string;
  date: string;
  description: string;
  tags: string[];
};

const PostBoard: React.FC = () => {
  const { post } = useContext(PostContext);

  if (!post) {
    return <></>;
  }

  return (
    <Box paddingH={5} paddingV={5} radius={2} marginH={5}>
      <>
        <Flex alignItems="center">
          <Image
            unoptimized
            src={post.user.thumbnailUrl}
            alt="ユーザー画像"
            width="32"
            height="32"
          />
          <Typography size="medium" margin="0 8px">
            {post.user.displayName}
          </Typography>
          <Typography
            size="medium"
            family="Bitter"
          >{`@${post.user.userName}`}</Typography>
        </Flex>

        <Typography
          margin="8px 0 0"
          size="medium"
          family="Bitter"
          color="secondary"
        >
          <span suppressHydrationWarning>
            {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss ddd")}
          </span>
        </Typography>
        <Typography margin="16px 0">{post.comment}</Typography>

        <Spacing mb={6}>
          {post.tags.map((tag) => {
            return <Tag key={tag._id} label={tag.label} />;
          })}
        </Spacing>

        <TextAlign align="right">
          <LikeField isActive={false} count={3000} />
        </TextAlign>
      </>
    </Box>
  );
};

export default PostBoard;
