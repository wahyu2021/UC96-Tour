import fs from 'fs';
import path from 'path';

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceAny(fullPath);
    }
  }
}

function replaceAny(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace session.user as any
  const pattern1 = /\(session\.user as any\)\?\.role/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, 'session.user?.role');
  }

  // Replace session?.user as any
  const pattern2 = /\(session\?\.user as any\)\?\.role/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, 'session?.user?.role');
  }

  // Replace dataToUpdate: any in tournaments/[id]/route.ts
  const pattern3 = /const dataToUpdate: any =/g;
  if (pattern3.test(content)) {
    content = content.replace(
      pattern3,
      'const dataToUpdate: Record<string, unknown> ='
    );
  }

  // Replace whereClause: any in matches.ts and teams.ts
  const pattern4 = /const whereClause: any =/g;
  if (pattern4.test(content)) {
    content = content.replace(
      pattern4,
      "const whereClause: import('@prisma/client').Prisma.MatchWhereInput | import('@prisma/client').Prisma.TeamWhereInput ="
    ); // Not perfect but OK
  }

  // Replace (tour as any).backgroundUrl
  const pattern5 = /\(tour as any\)\.backgroundUrl/g;
  if (pattern5.test(content)) {
    content = content.replace(pattern5, 'tour.backgroundUrl');
  }

  // Remove eslint-disable-next-line @typescript-eslint/no-explicit-any
  content = content.replace(
    /\s*\/\/\s*eslint-disable-next-line\s+@typescript-eslint\/no-explicit-any/g,
    ''
  );

  fs.writeFileSync(filePath, content);
}

processDirectory(path.join('D:\\Coding\\UC92_TOUR', 'src'));
