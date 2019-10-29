import axios from 'axios';
import { load } from 'cheerio';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';
import { format } from 'date-fns';
import { FeedWrapper } from './FeedWrapper';

export async function androidRss(appId) {
  const url = `https://play.google.com/store/apps/details?id=${appId}&hl=ja`;
  const resp = await axios.get(url);
  const $ = load(resp.data);
  const datePublished: Date = strptime(
    resp.data.match(/(\d+年\d+月\d+日)/)[1],
    '%Y年%m月%d日',
  );
  const dateFormated = format(datePublished, 'yyyy/MM/dd');

  const name = $('[itemprop=name]').text();
  const image = $('img[itemprop=image]')
    .first()
    .attr('src');

  // 先に br を line break に変えておく
  $('div[itemprop=description]')
    .eq(1)
    .find('span')
    .find('br')
    .replaceWith('\n');

  const recentChange = $('div[itemprop=description]')
    .eq(1)
    .find('span')
    .text();

  const feed = new FeedWrapper();
  feed.setTitle(name + 'for Anroid update information.');
  feed.setDescription(name + 'for Android update information.');
  feed.setGenerator('mobileapp-releasse-rss (https://github.com/sakamossan/mobileapp-release-rss)',
  );
  feed.setId(url);
  feed.setLink(url);
  feed.setUpdated(datePublished);
  feed.setImage(image);
  feed.setFavicon('https://www.gstatic.com/android/market_images/web/favicon_v2.ico');
  feed.setCopyright('Crawled from GooglePlay');
  feed.setItemTitle(name + ' for Android updated. published:' + dateFormated);
  feed.setItemGuid(`Android:${appId}:v:${dateFormated}`);
  feed.setItemLink(url);
  feed.setItemDescription(recentChange);
  feed.setItemDate(datePublished);
  return feed;
}
