import * as fs from 'fs';
import ytdl from 'ytdl-core';

export class YoutubeDownloader {
  public async download(url: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        this.validateUrl(url);

        const info = await ytdl.getInfo(url);
        const title = info.player_response.videoDetails.title;
        const stream = ytdl.downloadFromInfo(info);

        stream.pipe(fs.createWriteStream(`${this.fileName(title)}.mp4`));

        resolve({
          message: `Downloading '${title}'...`,
          stream: stream,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private validateUrl(url: string): void
  {
    if (!url || ! ytdl.validateURL(url)) {
      throw new Error('Plese enter a valid YouTube URL.');
    }
  }

  private fileName(title: string): string {
    return title.toLowerCase()
      .replaceAll(/[^\dA-Za-z\s]/g, '')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(' ', '-');
  }
}
