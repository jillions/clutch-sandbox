import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { getImageInfo } from "./utils.ts";

type TClutchImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
  loading?: string;
  className?: string;
  "data-d"?: string;
};

async function ClutchImage({src, className, placeholder, sizes = '100vw', ...props}: TClutchImageProps) {
  if (!src) return null;

  const { width, height, format, blurDataURL } = typeof src === 'string' ? await getImageInfo(src) : src;

  let placeholderVal = placeholder ? 'blur' : 'empty';
  const size = width + height;

  if (placeholder === undefined && format !== 'svg' && size > 80) {
    placeholderVal = 'blur';
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      placeholder={placeholderVal}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}

export default ClutchImage;
