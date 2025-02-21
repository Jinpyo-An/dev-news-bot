import cron from 'node-cron';
import { TextChannel } from 'discord.js';
import { RSSParseFeed } from '@rss_parser/rssFeedParser';
import 'dotenv/config';

const rssFeedUrl = process.env.RSS_FEED_URL;

if (!rssFeedUrl) {
  throw new Error("Failed to load RSS_FEED_URL value.");
}

export function scheduleRSSFeed(channel: TextChannel) {
  cron.schedule('0 5 * * *', async () => {
    console.info('Running RSS feed update at 9 AM KST');
    try {
      if (!rssFeedUrl) return;

      await RSSParseFeed(rssFeedUrl, channel);
    } catch (error) {
      console.error('Error during scheduled RSS feed update:', error);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Seoul',
  });
}