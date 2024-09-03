// src/index.ts
import fs from 'fs';
import path from 'path';
import { Project, SourceFile } from 'ts-morph';
import { execSync } from 'child_process';

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export class ImportManager {
  private project: Project;
  private packageJson: PackageJson;
  private usedPackages: Set<string> = new Set();
  private essentialNextJSDependencies: Set<string> = new Set([
    'next',
    'react',
    'react-dom',
    '@types/react',
    '@types/react-dom',
    '@types/node',
    'typescript',
    'eslint',
    'eslint-config-next',
    'postcss'
  ]);

  constructor(private projectPath: string = process.cwd()) {
    this.project = new Project({
      tsConfigFilePath: path.join(this.projectPath, 'tsconfig.json'),
    });
    this.packageJson = JSON.parse(fs.readFileSync(path.join(this.projectPath, 'package.json'), 'utf-8'));
  }

  public run() {
    console.log('Analyzing imports ...');
    this.analyzeImports();
    console.log('Updating dependencies...');
    this.updateDependencies();
    console.log('Import management complete.');
  }

  private analyzeImports() {
    const sourceFiles = this.project.getSourceFiles();
    sourceFiles.forEach((sourceFile) => this.processFile(sourceFile));
  }

  private processFile(sourceFile: SourceFile) {
    const imports = sourceFile.getImportDeclarations();
    imports.forEach((importDecl) => {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      if (!moduleSpecifier.startsWith('.') && !moduleSpecifier.startsWith('/')) {
        this.usedPackages.add(moduleSpecifier.split('/')[0]);
      }
    });
  }

  private updateDependencies() {
    const allDeps = { ...this.packageJson.dependencies, ...this.packageJson.devDependencies };
    const deps = Object.keys(allDeps);

    const unusedDeps = deps.filter((dep) => 
      !this.usedPackages.has(dep) && !this.essentialNextJSDependencies.has(dep)
    );
    const missingDeps = Array.from(this.usedPackages).filter(
      (dep) => !deps.includes(dep)
    );

    if (unusedDeps.length > 0) {
      console.log('Removing unused dependencies:', unusedDeps.join(', '));
      this.uninstallPackages(unusedDeps);
    }

    if (missingDeps.length > 0) {
      console.log('Installing missing dependencies:', missingDeps.join(', '));
      this.installPackages(missingDeps);
    }
  }

  private uninstallPackages(packages: string[]) {
    execSync(`npm uninstall ${packages.join(' ')}`, { cwd: this.projectPath });
  }

  private installPackages(packages: string[]) {
    execSync(`npm install ${packages.join(' ')}`, { cwd: this.projectPath });
  }
}
