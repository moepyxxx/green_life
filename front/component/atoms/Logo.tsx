import React from 'react'
import Image from 'next/image'

import LogoDefault from '../../img/logo/default.svg'
import LogoWhite from '../../img/logo/white.svg'


type Props = {
  color?: 'default' | 'white'
}

const Logo: React.FC<Props> = ( { color = 'default' } ) =>
  (<Image src={ color === 'default' ? LogoDefault : LogoWhite} alt="ロゴ" />);

export default Logo
