// love-api - the "heart math" microservice.
// Computes the countdown to our special day and serves rotating love quotes.
// Pure Go standard library, no external dependencies.
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

var target = time.Date(2026, time.November, 2, 0, 0, 0, 0, time.Local)

var quotes = map[string][]string{
	"id": {
		"Semangat terus ya, sayangku.",
		"Jangan lupa jaga kesehatan dan makan tepat waktu.",
		"Aku selalu ada di sini untukmu.",
		"Selalu cinta sama kamu, hari ini dan seterusnya.",
		"Aku sayang kamu, lebih dari yang bisa kuketik.",
	},
	"en": {
		"Keep your spirits up, my love.",
		"Don't forget to stay healthy and eat on time.",
		"I'm always here for you.",
		"Always loving you, today and beyond.",
		"I love you, more than I could ever type.",
	},
}

func lang(r *http.Request) string {
	if l := r.URL.Query().Get("lang"); l == "en" {
		return "en"
	}
	return "id"
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(v)
}

func statsHandler(w http.ResponseWriter, r *http.Request) {
	now := time.Now()
	d := target.Sub(now)
	daysLeft := int(d.Hours() / 24)

	var msg string
	if lang(r) == "en" {
		if daysLeft > 0 {
			msg = fmt.Sprintf("%d days left until our special day.", daysLeft)
		} else {
			msg = "Our special day is here. 🎉"
		}
	} else {
		if daysLeft > 0 {
			msg = fmt.Sprintf("%d hari lagi menuju hari spesial kita.", daysLeft)
		} else {
			msg = "Hari spesial kita sudah tiba. 🎉"
		}
	}

	writeJSON(w, map[string]any{
		"target":   target.Format("2006-01-02"),
		"now":      now.Format(time.RFC3339),
		"daysLeft": daysLeft,
		"message":  msg,
	})
}

func quotesHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, map[string]any{"quotes": quotes[lang(r)]})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/stats", statsHandler)
	mux.HandleFunc("/quotes", quotesHandler)
	mux.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) { writeJSON(w, map[string]string{"status": "ok"}) })

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("love-api (Go) listening on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}
