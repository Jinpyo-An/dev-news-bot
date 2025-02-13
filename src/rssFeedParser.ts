import RSSParser from 'rss-parser';

const parser = new RSSParser();

export async function parseRSSFeed(url: string) {
  try {
    const feed = await parser.parseURL(url);
    console.info(feed.title);
    feed.items.forEach(entry => {
      console.info(entry.title + ':' + entry.link);
    });
  } catch (error) {
    console.error(error);
  }
}