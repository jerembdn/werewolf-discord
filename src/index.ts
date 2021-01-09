import {
    Discord,
    Client,
    Command,
    CommandMessage,
    Description,
    Infos,
    CommandInfos
} from "@typeit/discord";
import { GuildChannel, MessageEmbed, TextChannel } from "discord.js";
import * as dotenv from 'dotenv';

import Game from "./game";

@Discord('!lg ')
export class AppDiscord {
    private static _client: Client;
    private static _games: Game[];
  
    static start(): void {
        this._client = new Client();
        this._games = [];

        this._client.login(
            process.env.BOT_TOKEN,
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js`
        );
    }

    @Command('help')
    @Description('Obtenir la liste des commandes.')
    private helpCommand(message: CommandMessage): void {
        const embed: MessageEmbed = new MessageEmbed();
        embed.setAuthor('COMMANDES');

        Client.getCommands().forEach((command: CommandInfos)=> {
            embed.addField(`${command.prefix}${command.commandName}`, command.description, true);
        });

        message.reply(embed);
    }

    @Command('start')
    @Description('Commencer une partie de Loup-Garous.')
    private async helloCommand(message: CommandMessage) {
        if(message.guild && message.channel.type === 'text') {
            const channel: TextChannel = message.channel;
            const game = new Game(message.guild, channel);
            AppDiscord._games.push(game);
        } else {
            message.reply('Tu ne peux pas effectuer cette commande ici.');
        }
    }
}

dotenv.config();

AppDiscord.start();