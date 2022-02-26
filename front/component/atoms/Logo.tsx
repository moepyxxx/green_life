import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LogoDefault from '../../img/logo/default.svg'
import LogoWhite from '../../img/logo/white.svg'


type Props = {
  color?: 'default' | 'white'
}

const Logo: React.FC<Props> = ( { color = 'default' } ) => {
  return (
    <Link href="/" passHref>
      <Image src={ color === 'default' ? LogoDefault : LogoWhite} alt="ロゴ" />
    </Link>
  );;

}
export default Logo
