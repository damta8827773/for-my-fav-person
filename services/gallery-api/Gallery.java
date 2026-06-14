// gallery-api - serves memory/photo metadata as JSON (Java).
// Uses only the JDK built-in HTTP server. No Maven/Gradle needed.
// Compile: javac Gallery.java     Run: java Gallery
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class Gallery {

    record Memory(int id, String[] images, String titleId, String titleEn, String descId, String descEn) {}

    static String img(String f) { return "/assets/" + f; }

    static final List<Memory> MEMORIES = List.of(
        new Memory(1, new String[]{img("dam1.png")}, "Pertama Bertemu", "First Meeting",
            "Foto waktu kita pertama ketemu.", "The photo of when we first met."),
        new Memory(2, new String[]{img("dam2.png")}, "Hadiah Kejutan", "Surprise Gift",
            "Aku jemput kamu, lalu tiba-tiba dikasih hadiah ultah.", "I picked you up, then was suddenly handed a birthday gift."),
        new Memory(3, new String[]{img("dam3.png")}, "Nongkrong", "Hanging Out",
            "Foto nongkrong random kita.", "A random hang-out photo of ours."),
        new Memory(4, new String[]{img("dam4.png")}, "Ke Ancol", "To Ancol",
            "Ke Ancol berempat sama Dapi & Lestari.", "Went to Ancol, the four of us with Dapi & Lestari."),
        new Memory(5, new String[]{img("dam5.png")}, "Hari Wisuda", "Graduation Day",
            "Pertama kali kamu datang pas wisudaku.", "The first time you came to my graduation."),
        new Memory(6, new String[]{img("dam6.png")}, "Surprise Pertama", "First Surprise",
            "Pertama kalinya aku nge-surprise kamu.", "The first time I surprised you."),
        new Memory(7, new String[]{img("dam7-1.png"), img("dam7-2.png"), img("dam7-3.png"), img("dam7-4.png"), img("dam7-5.png")},
            "Album Manis", "Sweet Album", "Kenangan manis lainnya.", "More of our sweet memories."),
        new Memory(8, new String[]{img("dam8.png")}, "Jalan Sore", "Evening Walk",
            "Jalan-jalan sore bareng.", "An evening walk together."),
        new Memory(9, new String[]{img("dam9.png")}, "Momen Lucu", "Funny Moment",
            "Momen lucu kita berdua.", "A funny moment of the two of us."),
        new Memory(10, new String[]{img("dam10.png")}, "Makan Malam", "Dinner",
            "Dinner bareng kamu.", "Dinner together with you."),
        new Memory(11, new String[]{img("dam11-1.png"), img("dam11-2.png"), img("dam11-3.png"), img("dam11-4.png"), img("dam11-5.png")},
            "Album Selfie", "Selfie Album", "Koleksi selfie favorit kita.", "Our favorite selfie collection.")
    );

    static String esc(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    static String toJson() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < MEMORIES.size(); i++) {
            Memory m = MEMORIES.get(i);
            if (i > 0) sb.append(",");
            sb.append("{\"id\":").append(m.id()).append(",\"images\":[");
            for (int j = 0; j < m.images().length; j++) {
                if (j > 0) sb.append(",");
                sb.append("\"").append(esc(m.images()[j])).append("\"");
            }
            sb.append("],\"title\":{\"id\":\"").append(esc(m.titleId()))
              .append("\",\"en\":\"").append(esc(m.titleEn()))
              .append("\"},\"desc\":{\"id\":\"").append(esc(m.descId()))
              .append("\",\"en\":\"").append(esc(m.descEn())).append("\"}}");
        }
        return sb.append("]").toString();
    }

    static void json(HttpExchange ex, String body, int code) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        ex.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = ex.getResponseBody()) { os.write(bytes); }
    }

    public static void main(String[] args) throws Exception {
        int port = System.getenv("PORT") != null ? Integer.parseInt(System.getenv("PORT")) : 8084;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/gallery", ex -> json(ex, toJson(), 200));
        server.createContext("/health", ex -> json(ex, "{\"status\":\"ok\"}", 200));
        server.setExecutor(null);
        System.out.println("gallery-api (Java) listening on :" + port);
        server.start();
    }
}
