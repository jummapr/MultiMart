import { FC } from 'react'
import Image from 'next/image'
import {Tab} from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
  image:ImageType
}

const GalleryTab: FC<GalleryTabProps> = ({image}) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5] ">
        {({selected}) => (
            <div >
                <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md inline-block'>
                    <Image 
                        fill
                        src={image.url}
                        alt=''
                        className=''
                    />
                </span>
                <span className={cn(
                    "absolute inset-0 rounded-md ring-2 ring-offset-2",
                    selected ? "ring-primary" : "ring-transparent"
                )} />
            </div>
        )}
    </Tab>
  )
}

export default GalleryTab