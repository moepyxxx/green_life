import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type TSummaryThumbnail = {
  imagePath: string;
  linkPath: string;
}
type Props = {
  post: TSummaryThumbnail;
}

const PostThumbnailLink: React.FC<Props> = ( { post } ) => {

  return (
    <Link href={post.linkPath} passHref>
      <Image src={'/' + post.imagePath} alt='green画像' height="600" width="600" objectFit="cover" />
    </Link>
  )
}

export default PostThumbnailLink