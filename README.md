> [!IMPORTANT]
> This repo has moved to https://github.com/jacdac/react-jacdac. 

# React-Jacdac

A library of hooks and context for [Jacdac](https://aka.ms/jacdac).
React with hooks support required.

**Jacdac** is a plug-and-play hardware/software stack
for **microcontrollers** and their peripherals (sensors/actuators),
with applications to rapid prototyping, making, and physical computing.
-   **[Jacdac Protocol Documentation](https://aka.ms/jacdac/)**
-   **[Documentation](https://microsoft.github.io/jacdac-docs/clients/javascript/react/)**
-   **[API Reference](https://microsoft.github.io/react-jacdac/)**
-   Discussions at https://github.com/microsoft/jacdac/discussions
-   Issues are tracked on https://github.com/microsoft/jacdac/issues

The rest of this page is for developers of the react-jacdac library.

## Developer setup

-   clone this repository and pull all submodules

```
git clone https://github.com/microsoft/react-jacdac
git pull
```

-   install node.js
-   install yarn

```
npm install -g yarn
```

-   install dependencies

```
yarn install
```

-   run storybook

```
yarn storybook
```

### Visual Studio Code

You are welcome to use any editor you want! Visual Studio Code
provides seamless support for git sub-modules and is our preferred editor.

-   open [Visual Studio Code](https://code.visualstudio.com/)

```
code .
```

-   install the recommended extensions (**MDX**, **ESLint** and **Prettier** extensions)
-   in the Git view, click on the `jacdac` branch and select `main` so that changes are automatically synched

### Build

To have a watch developement,

```
yarn watch
```

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
