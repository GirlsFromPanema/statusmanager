"use strict";

const { Client } = require("discord.js");

// Database queries
const Guild = require("../models/setup");

module.exports.data = {
  name: "presenceUpdate",
  once: false,
};

/**
 * Handle the clients event.
 * @param {Client} client The client that triggered the event.
 */
module.exports.run = async (oldPresence, newPresence) => {
  const hasSetup = await Guild.findOne({ id: newPresence.guild.id });
  if (hasSetup) {
    const role = hasSetup.role;
    const statusmessage = hasSetup.statusmessage;

    if (!role || !statusmessage) return;

    try {
      // check if the user has a custom status + the status saved in the db
      if (newPresence.activities[0]?.type === "CUSTOM") {
        if (newPresence.activities[0]?.state === statusmessage) {
          newPresence.member.roles.add(role); // add role if everything is true
          console.log(
            `✅ | Successfully added role to ${newPresence.user.tag} | Reason: Added status message`
          );
          // if status is changed to something else
        } else {
          newPresence.member.roles.remove(role);
          console.log(
            `❌ | Successfully removed role from ${newPresence.user.tag} | Reason: Removed status message`
          );
        }
        // if custom status is removed
      } else {
        newPresence.member.roles.remove(role);
        console.log(
          `❌ | Successfully removed role from ${newPresence.user.tag} | Reason: Removed status message`
        );
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }
};
