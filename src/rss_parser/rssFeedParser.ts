import Parser from 'rss-parser';

const parser = new Parser();

export async function parseFeed(url: string) {
  try {
    const feed = await parser.parseURL(url);
    console.info(feed.title);
    feed.items.forEach(entry => {
      console.info(entry.title + '\n' + entry.link);
    });
  } catch (error) {
    console.error(error);
  }
}