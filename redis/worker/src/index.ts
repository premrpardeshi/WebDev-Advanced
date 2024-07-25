import { createClient } from "redis";
const client = createClient();

async function main() {
  await client.connect();

  while (true) {
    const response = await client.brPop("submission", 0);
    console.log(response);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Processed user submissions");
  }
}

main();
