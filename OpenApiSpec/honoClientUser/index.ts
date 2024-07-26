import { DefaultService } from "./generated";

async function main() {
  const response = await DefaultService.getUsers("1");
  console.log(response);
}

main();
