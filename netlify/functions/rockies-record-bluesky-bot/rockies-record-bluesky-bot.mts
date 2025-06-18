import type { Config } from "@netlify/functions";
import { AtpAgent } from "@atproto/api";
import { TeamRecord } from "../../../interfaces/mlb-records.mts";

export default async (req: Request) => {
  const { next_run } = await req.json();

  console.log("Received event! Next invocation at:", next_run);

  // Create a Bluesky Agent
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  try {
    await main(agent);
    return new Response("Posted successfully!", { status: 200 });
  } catch (error) {
    console.error("Error posting to Bluesky:", error);
    return new Response("Failed to post.", { status: 500 });
  }
};

export const config: Config = {
  schedule: "0 8 * * *", // Run once a day at 8 am
};

async function getRockiesRecord(): Promise<TeamRecord> {
  try {
    // MLB Stats API - gets the Rockies team with ID 115
    const response = await fetch(
      "https://statsapi.mlb.com/api/v1/standings?leagueId=104&season=2024&standingsTypes=regularSeason&teamId=115"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Rockies record: ${response.status}`);
    }

    const data = await response.json();

    // Extract record from the standings data
    const teamRecord = data.records[0].teamRecords.find(
      (record: any) => record.team.id === 115
    );

    return teamRecord as TeamRecord;
  } catch (error) {
    console.error("Error fetching Rockies record:", error);
    throw error;
  }
}

async function main(agent: AtpAgent) {
  // await agent.login({
  //   identifier: Netlify.env.get("BLUESKY_USERNAME")!,
  //   password: Netlify.env.get("BLUESKY_PASSWORD")!,
  // });

  // Get the current Rockies record
  const rockiesRecord = await getRockiesRecord();

  // Create a message with the current record
  const message = `The Colorado Rockies' current record is ${rockiesRecord.wins}-${rockiesRecord.losses}.\n\n`;

  // Post the record to Bluesky
  // await agent.post({
  //   text: message,
  // });

  console.log("Just posted the Rockies record:", message);
}
