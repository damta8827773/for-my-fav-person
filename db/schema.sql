-- Schema for the guestbook (used by the PHP service via SQLite).
CREATE TABLE IF NOT EXISTS guestbook (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL DEFAULT 'Najwa',
    message     TEXT    NOT NULL,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_guestbook_created ON guestbook (created_at DESC);
