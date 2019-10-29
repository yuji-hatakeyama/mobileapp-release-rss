import axios from 'axios';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';
import { FeedWrapper } from './FeedWrapper';

export class IOSFeedHandler {
  private appId: string;
  private appInfo: any;

  public constructor(appId: string) {
    this.appId = appId;
  }

  public async scrape(appInfo: any = null) {
    if (!appInfo) {
      const url = `https://itunes.apple.com/lookup?id=${this.appId}&country=JP`;
      const resp = await axios.get(url);
      appInfo = resp.data.reults[0];
    }
    this.appInfo = appInfo;
  }

  public getFeed(): FeedWrapper {
    const name = this.appInfo.trackName;
    const releaseNotes = this.appInfo.releaseNotes;
    const image = this.appInfo.artworkUrl100;
    const updated: Date = strptime(
      this.appInfo.currentVersionReleaseDate,
      '%Y-%m-%dT%H:%M:%S%Z',
    );
    const version = this.appInfo.version;
    const link = 'https://apps.apple.com/jp/app/id' + this.appId;

    const feed = new FeedWrapper();
    feed.setTitle(name + 'for iOS update information.');
    feed.setDescription(name + 'for iOS update information.');
    feed.setGenerator(
      'mobileapp-releasse-rss (https://github.com/sakamossan/mobileapp-release-rss)',
    );
    feed.setId(link);
    feed.setUpdated(updated);
    feed.setImage(image);
    feed.setFavicon('https://www.apple.com/favicon.ico');
    feed.setCopyright('Crawled from App Store');
    feed.setItemTitle(name + ' for iOS updated. version:' + version);
    feed.setItemGuid(`iOS:${this.appId}:v:${version}`);
    feed.setItemLink(link);
    feed.setItemDescription(releaseNotes);
    feed.setItemDate(updated);

    return feed;
  }
}
