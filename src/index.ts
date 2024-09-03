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
  private essentialDevDependencies: Set<string> = new Set(['typescript', '@types/node']);

  constructor(private projectPath: string = process.cwd()) {
    this.project = new Project({
      tsConfigFilePath: path.join(this.projectPath, 'tsconfig.json'),
    });
    this.packageJson = JSON.parse(fs.readFileSync(path.join(this.projectPath, 'package.json'), 'utf-8'));
    this.initializeEssentialDependencies();
  }

  private initializeEssentialDependencies() {
    this.essentialDevDependencies.add('typescript');
    if (this.packageJson.dependencies['react'] || this.packageJson.devDependencies['react']) {
      this.essentialDevDependencies.add('@types/react');
      this.essentialDevDependencies.add('@types/react-dom');
    }
    if (this.packageJson.dependencies['vue'] || this.packageJson.devDependencies['vue']) {
      this.essentialDevDependencies.add('@vue/compiler-sfc');
    }
    if (this.packageJson.dependencies['angular'] || this.packageJson.devDependencies['@angular/core']) {
      this.essentialDevDependencies.add('@angular/compiler-cli');
    }
    // TODO : Add more framework-specific checks as needed
  }

  public run() {
    console.log('Analyzing imports...');
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
    const devDeps = Object.keys(this.packageJson.devDependencies || {});
    const deps = Object.keys(this.packageJson.dependencies || {});

    const unusedDevDeps = devDeps.filter((dep) => 
      !this.usedPackages.has(dep) && !this.essentialDevDependencies.has(dep)
    );
    const missingDevDeps = Array.from(this.usedPackages).filter(
      (dep) => !devDeps.includes(dep) && !deps.includes(dep)
    );

    if (unusedDevDeps.length > 0) {
      console.log('Removing unused dev dependencies:', unusedDevDeps.join(', '));
      this.uninstallPackages(unusedDevDeps);
    }

    if (missingDevDeps.length > 0) {
      console.log('Installing missing dev dependencies:', missingDevDeps.join(', '));
      this.installPackages(missingDevDeps);
    }

    // Ensure essential dev dependencies are installed
    const missingEssentialDevDeps = Array.from(this.essentialDevDependencies).filter(
      (dep) => !devDeps.includes(dep) && !deps.includes(dep)
    );
    if (missingEssentialDevDeps.length > 0) {
      console.log('Installing essential dev dependencies:', missingEssentialDevDeps.join(', '));
      this.installPackages(missingEssentialDevDeps);
    }
  }

  private uninstallPackages(packages: string[]) {
    execSync(`npm uninstall ${packages.join(' ')} --save-dev`, { cwd: this.projectPath });
  }

  private installPackages(packages: string[]) {
    execSync(`npm install ${packages.join(' ')} --save-dev`, { cwd: this.projectPath });
  }
}
