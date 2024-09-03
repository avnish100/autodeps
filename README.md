# autodeps

autodeps is a CLI tool designed to streamline dependency management in NextJS projects. It automatically detects missing or unused imports in your TypeScript/JavaScript files and updates your package dependencies accordingly, while preserving essential NextJS-related dependencies.

## Features

- Analyzes your NextJS project's TypeScript/JavaScript files (including TSX/JSX) to identify used packages
- Detects and installs missing dependencies
- Removes unused dependencies
- 
- Runs as a pre-build script to ensure your dependencies are always up-to-date
- 

## Key Benefits

### Streamlined Dependency Management

autodeps takes the hassle out of managing your project's dependencies. It ensures that your `package.json` file always reflects the actual dependencies used in your code, reducing bloat and potential conflicts.

### Faster Iteration with LLM-Generated Code

When working with code generated by Large Language Models (LLMs), you often need to quickly add new dependencies to your project. This tool automates that process, allowing you to paste LLM-generated code into your project and have the necessary dependencies automatically installed. This significantly speeds up the development process and reduces the friction of integrating AI-assisted code into your NextJS projects.

## Installation

Install autodeps as a dev dependency in your project:

```bash
npm install --save-dev npm i @avnish100/autodeps
```

## Usage

### As a CLI Tool

You can run autodeps using npx:

```bash
npx autodeps
```

### As a Pre-build Script

To automatically run autodeps before your build process, add it to your `package.json` scripts:

```json
{
  "scripts": {
    "prebuild": "autodeps",
    "build": "next build"
  }
}
```

Now, whenever you run `npm run build`, autodeps will execute first, ensuring your dependencies are up-to-date before the build process starts.

## How It Works

1. Analyzes all TypeScript/JavaScript files in your NextJS project
2. Identifies packages imported in your code
3. Compares the used packages with your current dependencies
4. Installs missing dependencies
5. Removes unused dependencies
6. Preserves essential NextJS dependencies (next, react, react-dom, etc.)

## Essential NextJS Dependencies

The following dependencies are considered essential and will always be preserved:

- next
- react
- react-dom
- @types/react
- @types/react-dom
- @types/node
- typescript
- eslint
- eslint-config-next

## Configuration

Currently, autodeps works out of the box without any configuration. It's specifically tailored for NextJS projects and automatically preserves the essential NextJS dependencies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Roadmap

Future improvements may include:

- Support for custom configurations
- Integration with other NextJS-related tools and libraries
- Performance optimizations for larger projects
- Support for other JS frameworks

Stay tuned for updates!
