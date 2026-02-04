import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

/**
 * Creates a ZIP archive from an array of file paths
 * @param {Array<string>} filePaths - Array of absolute file paths to include in the ZIP
 * @param {string} outputPath - Absolute path where the ZIP file should be created
 * @returns {Promise<void>} - Resolves when ZIP is complete
 */
export function createZip(filePaths, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    })

    // Event handlers
    output.on('close', () => {
      console.log(`ZIP created: ${archive.pointer()} bytes`)
      resolve()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    output.on('error', (err) => {
      reject(err)
    })

    // Pipe archive data to the output file
    archive.pipe(output)

    // Add files to archive
    filePaths.forEach((filePath, index) => {
      if (fs.existsSync(filePath)) {
        const fileName = path.basename(filePath)
        // Use numbered names if multiple files have same name
        const uniqueName = filePaths.length > 1
          ? `image-${index + 1}${path.extname(filePath)}`
          : fileName
        archive.file(filePath, { name: uniqueName })
      }
    })

    // Finalize the archive
    archive.finalize()
  })
}
