import axios from 'axios';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';
import { FeedWrapper } from './FeedWrapper';

export async function iosRss(appId) {
  const url = 'https://itunes.apple.com/lookup?id=' + appId + '&country=JP';
  const resp = await axios.get(url);
  const appInfo = resp.data.results[0];
  const name = appInfo.trackName;
  const releaseNotes = appInfo.releaseNotes;
  const image = appInfo.artworkUrl100;
  const updated: Date = strptime(
    appInfo.currentVersionReleaseDate,
    '%Y-%m-%dT%H:%M:%S%Z',
  );
  const version = appInfo.version;
  const link = 'https://apps.apple.com/jp/app/id' + appId;

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
  feed.setItemGuid(`iOS:${appId}:v:${version}`);
  feed.setItemLink(link);
  feed.setItemDescription(releaseNotes);
  feed.setItemDate(updated);

  return feed;
}
