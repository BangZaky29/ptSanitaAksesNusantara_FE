<?php
/**
 * PHP ZIP Deployment Script for cPanel (Rumahweb)
 * Secure, fast, and bypasses FTP port 21 firewall blocks.
 * 
 * Instructions:
 * 1. Upload this file to your public_html (or target folder) ONCE via FileZilla.
 * 2. Set 'YOUR_SECRET_TOKEN' to a secure password (e.g. in cPanel and GitHub Secrets).
 * 3. GitHub Actions will build, zip, and upload directly to this script via HTTPS.
 */

// --- CONFIGURATION ---
define('DEPLOY_TOKEN', 'sanita_akses_nusantara_deploy_2026'); // Ganti dengan token rahasia yang aman!
define('TARGET_DIR', __DIR__); // Folder tujuan ekstraksi (sama dengan folder tempat script ini diletakkan)
// ---------------------

header('Content-Type: application/json');

// 1. Verifikasi Token Keamanan
if (!isset($_SERVER['HTTP_X_DEPLOY_TOKEN']) || $_SERVER['HTTP_X_DEPLOY_TOKEN'] !== DEPLOY_TOKEN) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid deploy token.']);
    exit;
}

// 2. Verifikasi Request Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed.']);
    exit;
}

// 3. Verifikasi Upload File
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded or file upload error occurred.']);
    exit;
}

$zipPath = $_FILES['file']['tmp_name'];

// 4. Ekstraksi File ZIP
$zip = new ZipArchive();
if ($zip->open($zipPath) === TRUE) {
    
    // Bersihkan file lama di folder target sebelum ekstraksi agar file sampah terhapus
    // Kita skip file deploy.php ini sendiri dan folder SSL verification (.well-known)
    $di = new RecursiveDirectoryIterator(TARGET_DIR, RecursiveDirectoryIterator::SKIP_DOTS);
    $ri = new RecursiveIteratorIterator($di, RecursiveIteratorIterator::CHILD_FIRST);
    
    foreach ($ri as $file) {
        $path = $file->getRealPath();
        
        // Lewati file script ini sendiri
        if (basename($path) === basename(__FILE__)) {
            continue;
        }
        
        // Lewati sertifikat SSL Let's Encrypt / cPanel
        if (strpos($path, DIRECTORY_SEPARATOR . '.well-known') !== false) {
            continue;
        }
        
        if ($file->isDir()) {
            rmdir($path);
        } else {
            unlink($path);
        }
    }

    // Ekstrak ZIP baru
    $zip->extractTo(TARGET_DIR);
    $zip->close();

    echo json_encode([
        'success' => true, 
        'message' => 'Deployment successfully completed! Your site is live.'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to open or extract ZIP archive.']);
}
