"""
content-api - the "letter of the day" microservice.

Picks a sweet note that stays the same for a given calendar day, so Najwa
sees one consistent message per day. Pure Python standard library.
"""
import json
import os
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

NOTES = {
    "id": [
        "Kamu adalah hal terbaik yang pernah terjadi di hidupku.",
        "Senyummu itu obat paling manjur buat hariku.",
        "Makasih ya udah jadi kamu. Aku sayang kamu.",
        "Bareng kamu, hari biasa jadi luar biasa.",
        "Kamu cantik, hari ini, besok, dan selamanya.",
        "Aku bersyukur tiap hari punya kamu.",
        "Pelukan virtual buat kamu. Jangan lupa makan ya.",
        "Kamu nggak pernah sendirian, aku selalu ada.",
    ],
    "en": [
        "You're the best thing that's ever happened to me.",
        "Your smile is the best cure for my whole day.",
        "Thank you for being you. I love you.",
        "With you, ordinary days become extraordinary.",
        "You're beautiful, today, tomorrow, and always.",
        "I'm grateful every single day to have you.",
        "A virtual hug for you. Don't forget to eat.",
        "You're never alone, I'm always here.",
    ],
}


def note_for_today(lang: str) -> str:
    pool = NOTES.get(lang, NOTES["id"])
    index = date.today().toordinal() % len(pool)
    return pool[index]


class Handler(BaseHTTPRequestHandler):
    def _send(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            return self._send({"status": "ok"})
        if parsed.path == "/note":
            qs = parse_qs(parsed.query)
            lang = (qs.get("lang", ["id"])[0]).lower()
            if lang not in NOTES:
                lang = "id"
            return self._send({"lang": lang, "note": note_for_today(lang)})
        self._send({"error": "not found"}, 404)

    def log_message(self, *args):  # quieter logs
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8082"))
    print(f"content-api (Python) listening on :{port}")
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
