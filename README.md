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

> <pre align="center">We are building the web panel for this app. Probably launched at 1.3.0. Wait for it <a href=https://github.com/ArthurFiorette/steam-trader/releases>here</a>!</pre>

## About

This project aims to give an amazing trade client to you host it and auto trade steam items.

## Downloading

Open this repository [releases](https://github.com/ArthurFiorette/steam-trader/releases) tab and download the latest source code **.zip** file.

## Configuration

A config.json file already existed in previous versions, however, now everything is officially configured by our panel. To access it, start the application correctly and go to [localhost:1227](http://localhost:1227)

### Asked questions:

#### SDA, Shared Secret and Identity Secret
To register a steam account with **steam-trader**, you need to know the `Shared Secret` and `Identity Secret` of your account. These two secrets are responsible for the automatic generation of the steam guard mobile code and auto reconnection.

To get them easily, you will need to enable [SDA](https://github.com/Jessecar96/SteamDesktopAuthenticator) on the account and after that, you will find it [here](https://www.youtube.com/watch?v=JjdOJVSZ9Mo).

## Executing

This application can be run in different ways.

1. If you have docker installed on your machine, you can simply type `docker-compose up` after editing the **config.yml** and you are ready to go.

2. If you are thinking of hosting it on any hosting platform, use the docker implementation to your advantage and host it easily. Maybe you will need to change the volumes at the **docker-compose** file.

3. Or, in the most complicated way, you must have **Node.JS** installed on your PC.

- To start the server, open the app folder, install and compile by running `npm install` and after `npm run build`. Start by running `npm start`.
- To start the web page, open the web folder, install with `npm install` and build running `npm run build` and `npm run build:server`. Start by running `npm start`.

## License

Licensed under the **GNU General Public License v3.0**. See [`LICENSE`](LICENSE) for more informations.

## Contact

See my contact information on my [GitHub Profile Page](https://github.com/ArthurFiorette) or open a new issue.