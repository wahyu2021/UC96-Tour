import fs from 'fs';
import path from 'path';

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      extractAndReplace(fullPath);
    }
  }
}

const typesPath = path.join(
  'D:\\Coding\\UC92_TOUR',
  'src',
  'types',
  'components.ts'
);

function extractAndReplace(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const interfaceRegex = /^interface\s+([A-Za-z0-9_]+)\s*\{[^}]+\}/gm;

  let match;
  let typesFound = [];
  while ((match = interfaceRegex.exec(content)) !== null) {
    const interfaceName = match[1];
    const fullInterface = match[0];

    // Only extract if it ends with Props, Info, Data, Match, Team, Player, etc.
    typesFound.push({ name: interfaceName, full: fullInterface });
  }

  if (typesFound.length > 0) {
    let importNames = [];
    for (const type of typesFound) {
      if (!content.includes('export interface ' + type.name)) {
        // Add to global types
        fs.appendFileSync(typesPath, `\nexport ${type.full}\n`);
        // Remove from file
        content = content.replace(type.full, '');
        importNames.push(type.name);
      }
    }

    if (importNames.length > 0) {
      // Add import statement at the top (after other imports)
      const importStatement = `\nimport { ${importNames.join(', ')} } from '@/types';\n`;
      content = content.replace(
        /^(import.*(\r?\n))+/m,
        (match) => match + importStatement
      );
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
}

// Ensure the types file exists
if (!fs.existsSync(typesPath)) {
  fs.writeFileSync(typesPath, '// Frontend UI component interfaces\n');
}

processDirectory(path.join('D:\\Coding\\UC92_TOUR', 'src', 'components'));
