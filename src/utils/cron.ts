import cron from 'node-cron';
import { TextChannel } from 'discord.js';
import { RSSParseFeed } from '@rss_parser/rssFeedParser.ts';
import 'dotenv/config';
import * as process from "node:process";

const rssFeedUrl = process.env.RSS_FEED_URL;

if (!rssFeedUrl) {
  throw new Error("RSS_FEED_URL 환경변수를 불러오지 못했습니다.");
}

export function scheduleRSSFeed(channel: TextChannel) {
  cron.schedule('*/1 * * * *', async () => {
    console.log('Running RSS feed update at 9 AM KST');
    try {
      if (!rssFeedUrl) return;

      await RSSParseFeed(rssFeedUrl, channel);
    } catch (error) {
      console.error('Error during scheduled RSS feed update:', error);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Seoul', // 한국 시간 설정
  });
}