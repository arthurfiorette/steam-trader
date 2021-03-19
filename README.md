<p align="center">
  <a href="https://github.com/ArthurFiorette/nickrep/network"><img
      src="https://img.shields.io/github/forks/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Forks"
      alt="Forks" /></a>
  <a href="https://github.com/ArthurFiorette/nickrep/issues"><img
      src="https://img.shields.io/github/issues/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Issues"
      alt="Issues" /></a>
  <a href="https://github.com/ArthurFiorette/nickrep/stargazers"><img
      src="https://img.shields.io/github/stars/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Stars"
      alt="Stars" /></a>
  <a href="https://github.com/ArthurFiorette/nickrep/blob/main/LICENSE"><img
      src="https://img.shields.io/github/license/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=License"
      alt="License" /></a>
</p>

<h1 align="center">
  <strong>Steam Trader 📈</strong>
</h1>
<p align="center">
  <i>An deployment ready and automated steam trade client!</i>
</p>

> <pre align="center">The first release was launched! Download it <a href=https://github.com/ArthurFiorette/steam-trader/releases>here</a>!</pre>

## About

This project aims to give an amazing trade client to you host it and auto trade steam items.

## Downloading

Open this repository [releases](https://github.com/ArthurFiorette/steam-trader/releases) tab and download the latest file.

## Configuration

At this moment, to run properly this app, you will need to configure the **config.json** file **BEFORE** executing it. This file is in the **app** folder.

### Attention!

The **config.json** file is renamed to **_config.json**, so you must rename and edit it before starting it.

**Asked questions:**

- How do i find my shared secret and identity secret?
  - You need to use [SDA](https://github.com/Jessecar96/SteamDesktopAuthenticator) and after that, you will find it [here](https://www.youtube.com/watch?v=JjdOJVSZ9Mo).

```js
{
  help: 'Need help? https://github.com/ArthurFiorette/steam-trader#configuration',
  debug: false /* Add complete debug messages to the logs*/,
  login: {
    username: 'username' /* The account username */,
    password: 'password' /* The account password */,
    sharedSecret: 'shared secret' /* The account shared secret */,
    identity: 'identity' /* The account identity secret */
  },
  status: {
    gameId: 730 /* The game id that the bot will play when online */
  },
  trading: {
    trashLimit: 0.04 /* The minimum item price to be exchanged (you will not want 10000
                        $0.01 cases for your knife) */,
    owners: ['steam id 64', 'other steam id 64'] /* The bot will ALWAYS accept trades from this
                                                      steam ids */,
    tradeWith0Profit: true /* If you want to accept a trade with the same price in both sides */
  }
}
```

## Executing

This application can be run in different ways.

- If you have docker installed on your machine, you can simply type `docker-compose up` after editing the **config.yml** and you are ready to go.

- If you are thinking of hosting it on any hosting platform, use the docker implementation to your advantage and host it easily.

- Or, in the most complicated way, you must have **Node.JS** installed on your pc. Open the app folder with `cd app`, install and compile by running `npm install` and after `npm run build`. Start by running `npm start`.

## License

Licensed under the **GNU General Public License v3.0**. See [`LICENSE`](LICENSE) for more informations.

## Contact

See my contact information on my [GitHub Profile Page](https://github.com/ArthurFiorette) or open a new issue.
