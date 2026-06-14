<?php
// guestbook-api - stores Najwa's messages in SQLite (PHP + SQL).
// Run: php -S 0.0.0.0:8083 index.php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$dbPath = $dataDir . '/guestbook.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $schema = file_get_contents(__DIR__ . '/../../db/schema.sql');
    if ($schema !== false) {
        $pdo->exec($schema);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db init failed']);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($path === '/health') {
    echo json_encode(['status' => 'ok']);
    exit;
}

if ($path !== '/guestbook' && $path !== '/') {
    http_response_code(404);
    echo json_encode(['error' => 'not found']);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $name = trim((string)($body['name'] ?? 'Najwa'));
    $message = trim((string)($body['message'] ?? ''));

    if ($name === '') $name = 'Najwa';
    if (mb_strlen($message) === 0 || mb_strlen($message) > 1000) {
        http_response_code(422);
        echo json_encode(['error' => 'invalid message']);
        exit;
    }

    $stmt = $pdo->prepare('INSERT INTO guestbook (name, message) VALUES (:name, :message)');
    $stmt->execute([':name' => $name, ':message' => $message]);

    http_response_code(201);
    echo json_encode([
        'id' => (int)$pdo->lastInsertId(),
        'name' => $name,
        'message' => $message,
    ]);
    exit;
}

// GET - latest 50 entries
$rows = $pdo->query('SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT 50')
    ->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);
