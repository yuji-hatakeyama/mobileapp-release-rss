import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { androidRss } from './src/android';
import { iosRss } from './src/ios';
import { FeedWrapper } from './src/FeedWrapper';

export const MobileappReleaseRss: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: '',
    };
  }
  let feed: FeedWrapper;
  if (event.queryStringParameters.android_app_id) {
    feed = await androidRss(event.queryStringParameters.android_app_id);
  } else if (event.queryStringParameters.ios_app_id) {
    feed = await iosRss(event.queryStringParameters.ios_app_id);
  }
  return {
    statusCode: 200,
    body: feed.rss2(),
  };
};
