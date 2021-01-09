import { On } from "@typeit/discord";

import { MessageReaction, User } from "discord.js";
import Game from "..";

export default class GameEventListeners {
    constructor() {}

    @On('messageReactionAdd')
    private async messageReactionAddListener(reaction: MessageReaction, user: User) {
        console.log(reaction.users);
        // const member: GuildMember = Game._guild.members.resolve(user);
        // console.log(member);
        // Game._players.push(member);

        // const embed: MessageEmbed = Game._waitingPlayersMessage.embeds[0];
        // embed.fields[0].value = Game._players.map((member: GuildMember) => (
        //     member.displayName + '\n'
        // )).toString();
        // await Game._waitingPlayersMessage.edit(embed);
    }
}