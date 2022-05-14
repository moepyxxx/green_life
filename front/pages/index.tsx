import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useFetch from "../utility/customhooks/useFetch";

import ThumbnailLinkList from "../component/modules/post/ThumbnailLinkList";
import TagList from "../component/modules/tag/TagList";
import DefaultTemplate from "../component/templates/Default";

import { IApiTag } from "./posts/interfaces/apiTag";
import { Spacing } from "../styles/components/Spacing";

export const PostContext = React.createContext(null);

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [tags, setTags] = useState<IApiTag[]>([]);
  const apiFetch = useFetch();

  useEffect(() => {
    (async () => {
      const apiTags: IApiTag[] = await apiFetch<IApiTag[]>("tags");
      setTags(apiTags);
    })();
  }, []);

  return (
    <DefaultTemplate>
      <>
        <Spacing mb={8}>
          <TagList tags={tags} />
        </Spacing>
        <PostContext.Provider value={posts}>
          <ThumbnailLinkList />
        </PostContext.Provider>
      </>
    </DefaultTemplate>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = new URLSearchParams({ page: "1", count: "27" });
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts?${query}`;

  const { page, posts } = await (await fetch(url)).json();

  return {
    props: {
      page,
      posts,
    },
    revalidate: 60,
  };
};
