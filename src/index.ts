#!/usr/bin/env node

import { YoutubeDownloader } from './youtube-downloader.js';

try {
  const download = await new YoutubeDownloader().download(process.argv[2]);

  console.log(download.message);

  download.stream.on('end', () => console.log('Download completed sucessfully!'));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
