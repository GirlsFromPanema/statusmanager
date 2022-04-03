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
       const role = interaction.options.getRole("role");
       const statusmessage = interaction.options.getString("status");

       const hasSetup = await Guild.findOne({ id: interaction.guild.id });
       if(!hasSetup) {
            const newSetup = new Guild({
                id: interaction.guild.id,
                role: role.id,
                statusmessage: statusmessage
            })
            newSetup.save();

        interaction.reply({ content: `Successfully finished the setup`, ephemeral: true });
       } else {
           await Guild.findOneAndUpdate({
            id: interaction.guild.id,
            role: role.id,
            status: statusmessage
           })
           interaction.reply({ content: `Successfully updated setup`, ephemeral: true });
       }
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
    .setName("setup")
    .setDescription("Setup the Bot")
    .addRoleOption((option) => option.setName("role").setDescription("The role that will be given to the user.").setRequired(true))
    .addStringOption((option) => option.setName("status").setDescription("The status message the user should have.").setRequired(true))