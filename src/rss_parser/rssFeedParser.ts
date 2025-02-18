import Parser, {type Item} from 'rss-parser';
import {TextChannel} from "discord.js";

const parser = new Parser();

// RSS Feed Parsing
export async function RSSParseFeed(url: string, channel: TextChannel): Promise<void> {
  const now = new Date().getTime();
  let posts: string[] = [];

  try {
    const feed = await parser.parseURL(url);

    if (!feed.items) {
      console.warn("No Items in Feed", url);
      return;
    }

    feed.items.forEach((item: Item) => {

      if (item.pubDate && !isNaN(Date.parse(item.pubDate))) {
        const pubDate = new Date(item.pubDate);

        if (now - pubDate.getTime() < 60 * 60 * 24 * 1000) {
          posts.push(`${item.title}\n${item.link}\n`);
        }
      } else {
        console.warn("Invalid or missing pubDate", item.pubDate);
      }
    });

  } catch (error) {
    console.error('RSS 피드 파싱 중 오류가 발생했습니다: ' + error);
    await channel.send("RSS 피드 파싱 중 오류가 발생했습니다.")
  }

  if (posts.length > 0) {
    for (const post of posts) {
      try {
        await channel.send(post);
      } catch (sendError) {
        console.error("Discord 채널에 메시지 전송 중 오류 발생:", sendError);
      }
    }
  } else {
    console.info("업데이트된 게시물이 없습니다.");
  }
}

