<p align="center">
  <a href="https://github.com/ArthurFiorette/steam-trader/network/members"><img
      src="https://img.shields.io/github/forks/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Forks"
      alt="Forks" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/issues"><img
      src="https://img.shields.io/github/issues/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Issues"
      alt="Issues" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/stargazers"><img
      src="https://img.shields.io/github/stars/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Stars"
      alt="Stars" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/blob/main/LICENSE"><img
      src="https://img.shields.io/github/license/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=License"
      alt="License" /></a>
</p>

<h1 align="center">
  <strong><a href="https://github.com/ArthurFiorette/steam-trader/">Steam Trader</a> 📈</strong>
</h1>
<p align="center">
  <i>Trade items smartly with multiple automated steam accounts at the same time!</i>
</p>

> <pre align="center">
> Now all your work can be done on your browser:
> <a href="https://github.com/ArthurFiorette/steam-trader/releases/tag/v1.3.0">Introducing the dashboard</a>!
> </pre>

<br />

<p align="center">
  <img src="https://raw.githubusercontent.com/ArthurFiorette/steam-trader/main/.github/assets/webpage.png"
        alt="Web panel empty" />
</p>

## About

This project is an open source initiative to host multiple steam accounts making them exchange bots, automatically calculating the prices and items in each exchange sent and responding to them at the same time, like the Trading Card Exchange bots. We still have a lot to improve, such as a better interface, smarter verification steps, etc. Feel free to ask any questions or suggestions.

## Downloading

Open this repository [releases](https://github.com/ArthurFiorette/steam-trader/releases) tab and download the latest source code **.zip** file.

## Configuration

A config.json file already existed in previous versions, however, now everything is officially configured by our panel. To access it, start the application correctly and go to [localhost:1227](http://localhost:1227)

#### SDA, Shared Secret and Identity Secret

To register a steam account with **steam-trader**, you need to know the `Shared Secret` and `Identity Secret` of your account. These two secrets are responsible for the automatic generation of the steam guard mobile code and auto reconnection.

To get them easily, you will need to enable [SDA](https://github.com/Jessecar96/SteamDesktopAuthenticator) on the account and after that, you will find it [here](https://www.youtube.com/watch?v=JjdOJVSZ9Mo).

## Executing

Now, to start this application, you can **_run the [`start.cmd`](start.cmd) script at the root of this project_** and follow the installation and startup steps or run it manually as follows:

1. ##### You can host it docker on any hosting service that supports containerized applications or using the docker locally, simply by typing:

```sh
$ docker-compose up

# Or in detached mnode:
$ docker-compose up -d
```

2. ##### If you have no access or knowledge to use Docker, you can run it having **Node.JS** installed. As we have a `package.json` in our root containing some scripts, all you need to do is follow these steps.

<p align="center">
  ⚠ <b>Attention:</b> Always prefer to use Docker, as this application was built based on it and is totally more optimized.
</p>

```sh
# Install yarn and concurrently globally.
$ npm run prepare

# Install all dependencies.
$ npm run install

# Build and compile all code.
$ npm run build

# Start concurrently the web and the app.
$ npm run start
```

After building and installing it for the first time, you are ready to go and you can start it every time only running the last command.

## License

Licensed under the **GNU General Public License v3.0**. See [`LICENSE`](LICENSE) for more informations.

## Contact

See my contact information on my [GitHub Profile Page](https://github.com/ArthurFiorette) or open a new issue.
