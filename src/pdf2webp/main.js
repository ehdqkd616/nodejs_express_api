const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-poppler');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'input');
const OUTPUT_DIR = path.join(__dirname, 'output');

async function convertPdfToWebp(pdfPath) {
    const fileName = path.basename(pdfPath, path.extname(pdfPath));
    const tempDir = path.join(OUTPUT_DIR, fileName, 'temp');

    await fs.ensureDir(tempDir);

    // PDF → PNG (페이지별)
    await pdf.convert(pdfPath, {
        format: 'png',
        out_dir: tempDir,
        out_prefix: 'page',
        page: null, // 전체 페이지
        dpi: 900 // 인쇄 수준 품질 300이 원래 값, 900이 아마 최대?
    });

    const images = (await fs.readdir(tempDir))
        .filter(f => f.endsWith('.png'));

    for (const image of images) {
        const inputImage = path.join(tempDir, image);
        const outputImage = path.join(
            OUTPUT_DIR,
            fileName,
            image.replace('.png', '.webp')
        );

        // await sharp(inputImage)
        //     .webp({
        //         // quality: 85,
        //         // effort: 6

        //         // 선명도 유지
        //         lossless: true,
        //         nearLossless: false,
        //         smartSubsample: true,
        //         effort: 6
        //     })
        //     .toFile(outputImage);

        await sharp(inputImage, { limitInputPixels: false })
            .withMetadata() // 🔥 ICC profile 유지
            .webp({
                lossless: true,
                effort: 6
            })
            .toFile(outputImage);
    }

    // 임시 PNG 제거
    await fs.remove(tempDir);
}

async function run() {
    await fs.ensureDir(OUTPUT_DIR);

    const files = (await fs.readdir(INPUT_DIR))
        .filter(file => file.endsWith('.pdf'));

    for (const file of files) {
        console.log(`변환 중: ${file}`);
        await convertPdfToWebp(path.join(INPUT_DIR, file));
    }

    console.log('모든 PDF 변환 완료');
}

run().catch(console.error);