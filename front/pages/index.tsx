import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useFetch from "../utility/customhooks/useFetch";

import ThumbnailLinkList from "../component/modules/post/ThumbnailLinkList";
import TagList from "../component/modules/tag/TagList";
import DefaultTemplate from "../component/templates/Default";

import { IApiTag } from "./posts/interfaces/apiTag";
import { Spacing } from "../styles/components/Spacing";
import useToast from "../utility/customhooks/useToast";

export const PostContext = React.createContext(null);

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const apiFetch = useFetch();
  const toast = useToast();
  const [tags, setTags] = useState<IApiTag[]>([]);

  useEffect(() => {
    (async () => {
      const apiTags: IApiTag[] = await apiFetch<IApiTag[]>("tags");
      setTags(apiTags);
    })();
  }, []);

  useEffect(() => {
    if (!router.query) return;

    if (router.query.type === "signin") {
      console.log("hoge");
      toast({
        text: "サインインしました。さっそくgreenをポストしてみましょう！",
      });
    }
  }, [router.query]);

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
