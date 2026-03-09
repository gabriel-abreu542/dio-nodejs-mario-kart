import { promptCharacterSelect, promptTryAgain } from "./ui/prompts.js";
import { characters } from "./characters/characters.js";
import { playRound } from "./engine/actions.js";

let tryAgain = true;


while (tryAgain) {
    // escolher personagem 1
    let player1 = await promptCharacterSelect(1, characters, null);

    // escolher personagem 2
    let player2 = await promptCharacterSelect(2, characters, player1);

    console.log(`Jogadores selecionados: ${player1.name} vs ${player2.name}`);

    // 5 rodadas
    for (let round = 1; round <= 5; round++)
        await playRound(player1, player2);

    // calcular pontos
    console.log(`Placar final: ${player1.name} ${player1.points} x ${player2.points} ${player2.name}`);


    //mensagem de fim de jogo
    tryAgain = await promptTryAgain();
}
