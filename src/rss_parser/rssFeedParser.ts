import Parser from 'rss-parser';

const parser = new Parser();

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  return `${year}년${month}월${day}일${hours}시`;
}

// RSS 피드 파싱 및 게시물 저장
export async function RSSParseFeed(url: string): Promise<void> {
  const now = new Date().getTime(); // 현재 시간

  try {
    const feed = await parser.parseURL(url);

    feed.items.forEach((item: any) => {
      if (now - new Date(item.pubDate).getTime() < 60 * 60 * 24 * 1000) {
        console.info(`발행일: ${formatDate(new Date(item.pubDate))}\n제목: ${item.title}\n링크: ${item.link}`);
      }
    });
  } catch (error) {
    console.error('RSS 피드 파싱 중 오류가 발생했습니다: ' + error);
    throw new Error('RSS 피드 파싱 실패');
  }
}

