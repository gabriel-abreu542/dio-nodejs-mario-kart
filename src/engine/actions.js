import { promptRollDice } from "../ui/prompts.js";

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
  await promptRollDice(characterName);
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );

  return diceResult + attribute;
}

async function straightBlock(player1, player2) {
  const player1Roll = await logRollResult(player1.name, "RETA", await rollDice(), player1.speed);
  const player2Roll = await logRollResult(player2.name, "RETA", await rollDice(), player2.speed);

  if (player1Roll > player2Roll) {
    console.log("Player 1 venceu a reta!");
    player1.points++;
  }
  else if (player2Roll > player1Roll) {
    console.log("Player 2 venceu a reta!");
    player2.points++;
  }

}

async function curveBlock(player1, player2) {
  const player1Roll = await logRollResult(player1.name, "CURVA", await rollDice(), player1.handling);
  const player2Roll = await logRollResult(player2.name, "CURVA", await rollDice(), player2.handling);

  if (player1Roll > player2Roll) {
    console.log("Player 1 venceu a curva!");
    player1.points++;
  }
  else if (player2Roll > player1Roll) {
    console.log("Player 2 venceu a curva!");
    player2.points++;
  }

}

async function confrontBlock(player1, player2) {
  const player1Roll = await logRollResult(player1.name, "CONFRONTO", await rollDice(), player1.power);
  const player2Roll = await logRollResult(player2.name, "CONFRONTO", await rollDice(), player2.power);

  if (player1Roll > player2Roll) {
    console.log("Player 1 venceu ao confronto!");
    player2.points = Math.max(0, player2.points - 1);
  }
  else if (player2Roll > player1Roll) {
    console.log("Player 2 venceu ao confronto!");
    player1.points = Math.max(0, player1.points - 1);
  }

}

export async function playRound(player1, player2) {
  const block = await getRandomBlock();

  switch (block) {
    case "RETA":
      await straightBlock(player1, player2);
      break;
    case "CURVA":
      await curveBlock(player1, player2);
      break;
    case "CONFRONTO":
      await confrontBlock(player1, player2);
      break;
  }

  console.log(`Placar atual: ${player1.name} ${player1.points} x ${player2.points} ${player2.name}\n`);
  
}