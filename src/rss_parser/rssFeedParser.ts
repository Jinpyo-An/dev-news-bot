import Parser from 'rss-parser';
import {TextChannel} from "discord.js";

const parser = new Parser();



// Published Date Formatting
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 ${hours}시`;
}

// RSS Feed Parsing
export async function RSSParseFeed(url: string, channel: TextChannel): Promise<void> {
  const now = new Date().getTime();
  const posts: string[] = [];

  try {
    const feed = await parser.parseURL(url);

    if (!feed.items) {
      console.warn("피드에 아이템이 없습니다.", url);
      return;
    }

    feed.items.forEach((item: any) => {
      const pubDate = new Date(item.pubDate);
      const pubDateFormatted = formatDate(pubDate);

      if (now - pubDate.getTime() < 60 * 60 * 24 * 1000) {
        posts.push(`발행일: ${pubDateFormatted}\n제목: ${item.title}\n링크: ${item.link}`);
      }
    });

  } catch (error) {
    console.error('RSS 피드 파싱 중 오류가 발생했습니다: ' + error);
    await channel.send("RSS 피드 파싱 중 오류가 발생했습니다.")
  }

  if (posts.length > 0) {
    for (const post of posts) {
      await channel.send(post);
    }
  } else {
    console.info("업데이트된 게시물이 없습니다.");
    await channel.send("업데이트된 게시물이 없습니다.");
  }
}

