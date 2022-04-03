"use strict"

const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Permissions, MessageEmbed } = require("discord.js");

// Database
const Guild = require("../../models/setup");

module.exports.cooldown = {
    length: 90000,
    users: new Set()
};

/**
 * @param {CommandInteraction}
 * @param {any}
 */
module.exports.run = async (interaction, utils) =>
{
    try
    {
       const hasSetup = await Guild.findOne({ id: interaction.guild.id });
      
        if(!hasSetup) return interaction.reply({ content: `No setup found, could not delete anything.`, ephemeral: true });

        hasSetup.delete();
        interaction.reply({ content: `Successfully deleted the setup`, ephemeral: true });
       
    }
    catch (err)
    {
        return Promise.reject(err);
    }
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.ADMINISTRATOR]
};

module.exports.data = new SlashCommandBuilder()
    .setName("removesetup")
    .setDescription("Remove the setup of the Bot")
    