import { IOSFeedHandler } from './IOSFeedHandler';
import * as fs from 'fs';

describe('IOSFeedHandler', () => {
  describe('getFeed', () => {
    const scrapeJson = fs.readFileSync('src/IOSFeedHandler.test.json', 'utf8');
    const data = JSON.parse(scrapeJson);
    const appInfo = data.results[0];
    const handler = new IOSFeedHandler('535886823');
    handler.scrape(appInfo);
    const got_feed = handler.getFeed(); // Fix
    it('title', () => {
      expect(got_feed.getTitle()).toBe(
        'Chrome - Google のウェブブラウザfor iOS update information.',
      );
    });
    it('description', () => {
      expect(got_feed.getDescription()).toBe(
        'Chrome - Google のウェブブラウザfor iOS update information.',
      );
    });
    it('generator', () => {
      expect(got_feed.getGenerator()).toBe(
        'mobileapp-releasse-rss (https://github.com/sakamossan/mobileapp-release-rss)',
      );
    });
    it('id', () => {
      expect(got_feed.getId()).toBe('https://apps.apple.com/jp/app/id535886823');
    });
    it('updated', () => {
      expect(got_feed.getUpdated().toUTCString()).toBe('Tue, 22 Oct 2019 16:52:50 GMT');
    });
    it('image', () => {
      expect(got_feed.getImage()).toBe(
        'https://is3-ssl.mzstatic.com/image/thumb/Purple113/v4/b0/d2/d3/b0d2d3fa-659c-92e3-dfc2-67d88d8ef000/source/100x100bb.jpg',
      );
    });
    it('favicon', () => {
      expect(got_feed.getFavicon()).toBe('https://www.apple.com/favicon.ico');
    });
    it('copyright', () => {
      expect(got_feed.getCopyright()).toBe('Crawled from App Store');
    });
    it('item_title', () => {
      expect(got_feed.getItemTitle()).toBe(
        'Chrome - Google のウェブブラウザ for iOS updated. version:78.0.3904.67',
      );
    });
    it('item_guid', () => {
      expect(got_feed.getItemGuid()).toBe('iOS:535886823:v:78.0.3904.67');
    });
    it('item_link', () => {
      expect(got_feed.getItemLink()).toBe('https://apps.apple.com/jp/app/id535886823');
    });
    it('item_description', () => {
      expect(got_feed.getItemDescription()).toBe(
        'Chrome をご利用いただきありがとうございます。このバージョンの新機能は以下のとおりです。\n• Chrome をダークモードに切り替えられるようになりました（デバイスが iOS 13 に更新済みの場合）。\n• ブックマーク、履歴、最近使ったタブ、リーディング リストは、iOS 13 ではカードとして表示されます。\n• 新しいクレジット カードを Chrome の設定ページから直接追加できます。',
      );
    });
    it('item_date', () => {
      expect(got_feed.getItemDate().toUTCString()).toBe('Tue, 22 Oct 2019 16:52:50 GMT');
    });
  });
});
