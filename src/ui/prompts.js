import { select, confirm } from "@inquirer/prompts";

export async function promptCharacterSelect(playerLabel, characters, takenCharacter = null) {
    
    
    return select({
        message: `Jogador ${playerLabel}, escolha o seu personagem:`,
        choices: characters
        .filter((c) => c.name !== takenCharacter?.name)
        .map((c) => ({
            name: `${c.name} — Velocidade: ${c.speed} | Manobrabilidade: ${c.handling} | Poder: ${c.power}`,
            value: { ...c, points: 0 },
        }))
    })
}

export async function promptRollDice(characterName) {
  await confirm({
    message: `${characterName}, press Enter to roll the dice...`,
    default: true,
    transformer: () => "",
  });
}

export async function promptTryAgain() {
  return confirm({
    message: "Play again?",
    default: true,
  });
}