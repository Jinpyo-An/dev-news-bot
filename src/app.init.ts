import {Client, GatewayIntentBits, Events, TextChannel} from 'discord.js';
import 'dotenv/config';
import * as process from "node:process";
import {scheduleRSSFeed} from "@/utils/cron.ts";

const botToken = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!botToken) throw new Error("BOT_TOKEN 값을 불러오지 못했습니다.");

if (!channelId) throw new Error("CHANNEL_ID 값을 불러오지 못했습니다.");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
  ],
});

client.once(Events.ClientReady, async (c) => {
  console.log(`${c.user.tag}에 로그인 했습니다.`);

  try {
    const channel = await client.channels.fetch(channelId as string) as TextChannel;
    if (!channel || !(channel instanceof TextChannel)) {
      console.error(`ID가 ${channelId}인 채널을 찾을 수 없거나, 텍스트 채널이 아닙니다.`);
      return;
    }

    scheduleRSSFeed(channel);

  } catch (error) {
    console.error('채널 가져오기 오류:', error);
  }
});

client.login(botToken);