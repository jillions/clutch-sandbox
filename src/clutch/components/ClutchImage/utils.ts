'use server';

import fsPromises from 'fs/promises';
import { posix as posixPath } from 'path';
import { unstable_cache } from 'next/cache';
import { getPlaiceholder } from 'plaiceholder';
import 'server-only';

const calculateImageInfo = unstable_cache(
  async (src: string) => {
    let buffer: Buffer;
    const isLocalImage = src.startsWith('/') && !src.startsWith('//');

    if (isLocalImage) {
      // Remove any query parameters from the src path
      const cleanSrc = src.split('?')[0];
      const publicPath = posixPath.join(
        process.cwd(),
        'public',
        cleanSrc,
      );


      try {
        buffer = await fsPromises.readFile(publicPath);
      } catch (err) {
        console.error('Error reading local image:', err);
        throw new Error(`Failed to read local image: ${src}`);
      }
    } else {
      const res = await fetch(src);

      if (!res.ok) {
        throw new Error('Failed to fetch image');
      }

      buffer = Buffer.from(await res.arrayBuffer());
    }

    let result;

    try {
      result = await getPlaiceholder(buffer, { size: 10 });
    } catch (err) {
      console.error('getPlaiceholder failed:', err);
      throw err;
    }

    const { base64, metadata, color, css } = result;

    if (!metadata.width || !metadata.height) {
      throw new Error('Invalid image metadata');
    }

    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      blurDataURL: base64,
      color: color?.hex,
      css,
    };
  },
  undefined,
  {
    tags: ['image-info'],
    revalidate: false,
  },
);

export const getImageInfo = async (src: unknown) => {
  let result = {
    width: 0,
    height: 0,
    blurDataURL: '',
    format: '',
    color: '',
    css: {},
  };

  if (typeof src === 'string' && src) {
    try {
      result = await calculateImageInfo(src);
    } catch (err) {
      console.error('Error getting image:', err);
    }
  }

  return result;
};

