# Statusmanager :: Discord
Manage the roles of users with custom statuses.

> ## 🧒🏻 What?
- *If a user has a custom status in their profile like "hello", a special role is added to their profile.*

- Once they remove or change it, the role is automatically removed.

> ## ❓ Why?
- It's a cool feature to have if you want to return something back to your users. 

> ## 🧸 How?

- Local setup 
```
$ git clone https://github.com/GirlsFromPanema/statusmanager
$ cd statusmanager
$ npm i
```
Fill out `mongodb`, `bot token`, `guild` and `client id` in the `.env` file (you may have to create or rename it first)

```
$ npm run deploy
$ npm run dev

... Bot is online! 🎉
```

---
- Deployment 

Go through the local steps above.
Upload your bot files to your server (through SFTM) and run the same commands

```
$ npm i 
$ npm run deploy
$ pm2 start index.js --name statusmanager

... Bot should be up and running! 🎉
```

pm2 is just an example, you can use any other server manager.

## Information 
This bot is only developed for this purpose (managing statuses) and has no other feature implemented. If you would like to see another cool project like this, feel free to join the [Discord](https://discord.gg/UDNcTrBagN) or open an issue. 

Feel free to implement this small but powerful feature into your own bot, it works the same everywhere. 😉

Don't forget to leave a star ⭐.