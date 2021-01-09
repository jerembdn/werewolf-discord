import {
    Guild,
    GuildMember,
    Message,
    MessageEmbed,
    TextChannel,
} from "discord.js";

import { StateMachine } from 'javascript-state-machine';

import { fmtMSS } from '../utils/formatTime';
import GameEventListeners from "./listener";

export default class Game {
    private static _guild: Guild;
    private static _players: GuildMember[];

    private static _state: StateMachine;

    private static _timer: number;
    private static _waitingPlayersMessage: Message;

    constructor(guild: Guild, channel: TextChannel) {
        Game._guild = guild;
        Game._players = [];

        Game._state = StateMachine.create({
            initial: 'waiting',
            events : [
                { name: 'start', from: 'waiting',  to: 'starting' },
                { name: 'play',  from: 'starting', to: 'playing'  }
            ],
            callbacks: {
            }
        });

        // - Init game event listeners
        new GameEventListeners();

        this.searchPlayers(channel, 60).then(result => console.log('Promise arrivée'));
    }

    private searchPlayers(from: TextChannel, time: number): Promise<GuildMember[]> {
        Game._timer = time;
        const baseTitle: string = 'Recherche de joueurs...';
        const startingIn = (time: number): string => `Démarrage dans ${fmtMSS(time)}`;

        let embed: MessageEmbed = new MessageEmbed()
            .setAuthor(`${baseTitle}`)
            .addField('Joueurs en lice :', '_');
        from.send(embed).then((message: Message) => {
            Game._waitingPlayersMessage = message;

            const updateMessage = async () => {
                embed.setAuthor(`${baseTitle} - ${startingIn(Game._timer)}`);
                await message.edit(embed)
            };

            const interval = setInterval(async () => {
                if(Game._timer < 0) {
                    clearInterval(interval);
                }
                Game._timer--;

                if(Game._timer % 5 == 0) await updateMessage();
            }, 1000);
        });

        return new Promise((resolve) => {
            resolve([]);
        });
    }

    private handleStart(): void {}
}