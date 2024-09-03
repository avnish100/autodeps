# autodeps

autodeps is a powerful CLI tool that automatically detects missing or unused imports in your TypeScript/JavaScript projects and updates your package dependencies accordingly. It's designed to work with various JavaScript frameworks while preserving essential dependencies.

## Features

- Analyzes your project's TypeScript/JavaScript files (including TSX/JSX) to identify used packages
- Detects and installs missing dev dependencies
- Removes unused dev dependencies
- Preserves essential dependencies for TypeScript and common frameworks (React, Vue, Angular)
- Framework-agnostic: works with various JavaScript ecosystems
- Runs as a pre-build script to ensure your dependencies are always up-to-date

## Installation

You can install autodeps globally or as a dev dependency in your project.

### Global Installation

```bash
npm install -g npm-import-manager
```

### Project Installation

```bash
npm install --save-dev npm-import-manager
```

## Usage

### As a CLI Tool

If installed globally, you can run autodeps from any project directory:

```bash
npm-import-manager
```

If installed as a project dependency, you can use npx:

```bash
npx npm-import-manager
```

### As a Pre-build Script

To automatically run autodeps before your build process, add it to your `package.json` scripts:

```json
{
  "scripts": {
    "prebuild": "npm-import-manager",
    "build": "your-existing-build-command"
  }
}
```

Now, whenever you run `npm run build`, autodeps will execute first, ensuring your dependencies are up-to-date before the build process starts.

## How It Works

1. Analyzes all TypeScript/JavaScript files in your project
2. Identifies packages imported in your code
3. Compares the used packages with your current dependencies
4. Installs missing dev dependencies
5. Removes unused dev dependencies
6. Preserves essential dependencies (TypeScript, framework-specific packages)

## Configuration

Currently, autodeps works out of the box without any configuration. It automatically detects your project structure and preserves essential dependencies based on your project's setup.

## Supported Frameworks

autodeps is designed to work with various JavaScript frameworks, including but not limited to:

- React
- Vue
- Angular
- Vanilla JavaScript/TypeScript projects

It automatically detects the presence of these frameworks and preserves their essential dev dependencies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Roadmap

Future improvements may include:

- User-defined configuration for essential dependencies
- Support for other package managers (Yarn, pnpm)
- More sophisticated project type detection

Stay tuned for updates!
