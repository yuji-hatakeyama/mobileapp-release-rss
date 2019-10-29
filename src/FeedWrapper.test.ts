import { FeedWrapper } from './FeedWrapper';
import * as fs from 'fs';

describe('FeedWrapper', () => {
  describe('FeedWrapper', () => {
    // feedWrapper を生成
    let feedWrapper = new FeedWrapper();
    it('title', () => {
      feedWrapper.setTitle('test title');
      expect(feedWrapper.getTitle()).toBe('test title');
    });

    it('description', () => {
      feedWrapper.setDescription('test description');
      expect(feedWrapper.getDescription()).toBe('test description');
    });

    it('generator', () => {
      feedWrapper.setGenerator('test generator');
      expect(feedWrapper.getGenerator()).toBe('test generator');
    });

    it('id', () => {
      feedWrapper.setId('test-id');
      expect(feedWrapper.getId()).toBe('test-id');
    });

    it('link', () => {
      feedWrapper.setLink('https://test-link.test');
      expect(feedWrapper.getLink()).toBe('https://test-link.test');
    });

    it('updated', () => {
      feedWrapper.setUpdated(new Date('2019-10-11T17:07:10Z'));
      expect(feedWrapper.getUpdated().toUTCString()).toBe(
        'Fri, 11 Oct 2019 17:07:10 GMT',
      );
    });

    it('image', () => {
      feedWrapper.setImage('https://test-image.test');
      expect(feedWrapper.getImage()).toBe('https://test-image.test');
    });

    it('favicon', () => {
      feedWrapper.setFavicon('https://test-favicon.test');
      expect(feedWrapper.getFavicon()).toBe('https://test-favicon.test');
    });

    it('copyright', () => {
      feedWrapper.setCopyright('test copyright');
      expect(feedWrapper.getCopyright()).toBe('test copyright');
    });

    it('item_title', () => {
      feedWrapper.setItemTitle('test item title');
      expect(feedWrapper.getItemTitle()).toBe('test item title');
    });

    it('item_guid', () => {
      feedWrapper.setItemGuid('TESTGUID');
      expect(feedWrapper.getItemGuid()).toBe('TESTGUID');
    });

    it('item_link', () => {
      feedWrapper.setItemLink('https://test-item-link.test');
      expect(feedWrapper.getItemLink()).toBe('https://test-item-link.test');
    });

    it('item_description', () => {
      feedWrapper.setItemDescription('test item description');
      expect(feedWrapper.getItemDescription()).toBe('test item description');
    });

    it('item_date', () => {
      feedWrapper.setItemDate(new Date('2019-10-11T17:16:57Z'));
      expect(feedWrapper.getItemDate().toUTCString()).toBe(
        'Fri, 11 Oct 2019 17:16:57 GMT',
      );
    });

    it('rss2', () => {
      const xml = feedWrapper.rss2();
      const expect_xml = fs.readFileSync('src/feed_wrapper_expect.xml', 'utf8');
      expect(xml + '\n').toEqual(expect_xml);
    });
  });
});
