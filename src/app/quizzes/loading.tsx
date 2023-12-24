import Image from 'next/image'
import React from 'react'
import Spin from '@/assets/blocks-loader.svg'
export default function Loading() {
	return <Image alt='loader' src={Spin} />
}
