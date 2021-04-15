<p align="center">
  <a href="https://github.com/ArthurFiorette/steam-trader/network/members"><img
      src="https://img.shields.io/github/forks/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Forks"
      target="_blank"
      alt="Forks" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/issues"><img
      src="https://img.shields.io/github/issues/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Issues"
      target="_blank"
      alt="Issues" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/stargazers"><img
      src="https://img.shields.io/github/stars/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=Stars"
      target="_blank"
      alt="Stars" /></a>
  <a href="https://github.com/ArthurFiorette/steam-trader/blob/main/LICENSE"><img
      src="https://img.shields.io/github/license/ArthurFiorette/steam-trader?logo=github&style=flat-square&label=License"
      target="_blank"
      alt="License" /></a>
</p>

<h1 align="center">
  <strong><a href="https://github.com/ArthurFiorette/steam-trader/" target="_blank">Steam Trader</a> 📈</strong>
</h1>
<p align="center">
  <i>Trade items smartly with multiple automated steam accounts at the same time!</i>
</p>

> <pre align="center">
> Now more stable and with fewer bugs.
> Check it out in <a href="https://github.com/ArthurFiorette/steam-trader/releases/tag/v1.4.0" target="_blank">v1.4.0</a>!
> </pre>

## 📖 About

This project is an open source initiative to host multiple steam bot accounts to trade inventory items, automatically calculating the prices and items in each exchange sent and responding to them at the same time, like some Trading Card Exchange bots, but with any item. We still have a lot to improve, and that is what i'll do in the next days, Feel free to send a PR or open a new issue.

## 📁 Downloading

> _The main branch is used for development, to download the code, prefer to download a specific tag._

Open this repository <a href="https://github.com/ArthurFiorette/steam-trader/releases" target="_blank">releases</a> tab and download the latest source code **.zip** file.

## ⚙️ Configuration

A `config.json` file already existed in previous versions, however, now everything is officially configured by our panel. To access it, start the application correctly and go to localhost at the specified port.

#### 🔐 SDA, Shared Secret and Identity Secret

To register a steam account with **steam-trader**, you need to know the `Shared Secret` and `Identity Secret` of your account. These two secrets are responsible for the automatic generation of the steam guard mobile code and auto reconnection.

To get them easily, you will need to enable <a href="https://github.com/Jessecar96/SteamDesktopAuthenticator" target="_blank">SDA</a> on the account and after that, you will find it <a href="https://www.youtube.com/watch?v=JjdOJVSZ9Mo" target="_blank">here</a>.

## 🏃 Executing

You can host it docker on any hosting service that supports containerized applications or use docker locally, simply by typing:

> _For any help with docker, here are the <a href="https://docs.docker.com/compose/" target="_blank">docs</a>._

```sh
# Install, build and run with docker
$ docker-compose up

# Or in detached mode:
$ docker-compose up -d
```

If you have no access or knowledge to use Docker, you can run it having **Node.JS** installed. As we have a `package.json` in our root containing some scripts, all you need to do is follow these steps.

> _Always prefer to use Docker, as this application was built based on it and is totally faster._

```sh
# (At the project root)

# Install yarn and concurrently to run the next scripts.
$ npm install

# Install all dependencies.
$ npm run install

# Build and compile all code.
$ npm run build

# Start concurrently the web and the app.
$ npm run start
```

After building and installing it for the first time, you are ready to go and you can start it every time only running the last command.

## 📃 License

Licensed under the **GNU General Public License v3.0**. See <a href="LICENSE.txt" target="_blank">`LICENSE`</a> for more informations.

## 📧 Contact

See my contact information on my <a href="https://github.com/ArthurFiorette" target="_blank">GitHub Profile Page</a> or open a new issue.
