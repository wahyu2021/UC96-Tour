import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const filePathArray = resolvedParams.path;
    
    if (!filePathArray || filePathArray.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    const filename = filePathArray.join('/');
    // Amankan path agar tidak bisa path traversal (e.g. ../../)
    const sanitizedFilename = filename.replace(/\.\./g, '');
    
    // File di-upload ke /public/uploads
    const filepath = path.join(process.cwd(), 'public', 'uploads', sanitizedFilename);

    if (!existsSync(filepath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = readFileSync(filepath);
    
    // Tentukan mime type sederhana
    let mimeType = 'image/jpeg';
    if (filename.endsWith('.png')) mimeType = 'image/png';
    else if (filename.endsWith('.webp')) mimeType = 'image/webp';
    else if (filename.endsWith('.gif')) mimeType = 'image/gif';
    else if (filename.endsWith('.svg')) mimeType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
