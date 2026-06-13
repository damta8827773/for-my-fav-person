export type Memory = {
  id: number;
  images: string[];
  title: { id: string; en: string };
  desc: { id: string; en: string };
};

const A = (s: string) => `/assets/${s}`;

export const memories: Memory[] = [
  { id: 1, images: [A("dam1.png")],
    title: { id: "Pertama Bertemu", en: "First Meeting" },
    desc: { id: "Foto waktu kita pertama ketemu.", en: "The photo of when we first met." } },
  { id: 2, images: [A("dam2.png")],
    title: { id: "Hadiah Kejutan", en: "Surprise Gift" },
    desc: { id: "Aku jemput kamu, lalu tiba-tiba dikasih hadiah ultah.", en: "I picked you up, then was suddenly handed a birthday gift." } },
  { id: 3, images: [A("dam3.png")],
    title: { id: "Nongkrong", en: "Hanging Out" },
    desc: { id: "Foto nongkrong random kita.", en: "A random hang-out photo of ours." } },
  { id: 4, images: [A("dam4.png")],
    title: { id: "Ke Ancol", en: "To Ancol" },
    desc: { id: "Ke Ancol berempat sama Dapi & Lestari.", en: "Went to Ancol, the four of us with Dapi & Lestari." } },
  { id: 5, images: [A("dam5.png")],
    title: { id: "Hari Wisuda", en: "Graduation Day" },
    desc: { id: "Pertama kali kamu datang pas wisudaku.", en: "The first time you came to my graduation." } },
  { id: 6, images: [A("dam6.png")],
    title: { id: "Surprise Pertama", en: "First Surprise" },
    desc: { id: "Pertama kalinya aku nge-surprise kamu.", en: "The first time I surprised you." } },
  { id: 7, images: [A("dam7-1.png"), A("dam7-2.png"), A("dam7-3.png"), A("dam7-4.png"), A("dam7-5.png")],
    title: { id: "Album Manis", en: "Sweet Album" },
    desc: { id: "Kenangan manis lainnya.", en: "More of our sweet memories." } },
  { id: 8, images: [A("dam8.png")],
    title: { id: "Jalan Sore", en: "Evening Walk" },
    desc: { id: "Jalan-jalan sore bareng.", en: "An evening walk together." } },
  { id: 9, images: [A("dam9.png")],
    title: { id: "Momen Lucu", en: "Funny Moment" },
    desc: { id: "Momen lucu kita berdua.", en: "A funny moment of the two of us." } },
  { id: 10, images: [A("dam10.png")],
    title: { id: "Makan Malam", en: "Dinner" },
    desc: { id: "Dinner bareng kamu.", en: "Dinner together with you." } },
  { id: 11, images: [A("dam11-1.png"), A("dam11-2.png"), A("dam11-3.png"), A("dam11-4.png"), A("dam11-5.png")],
    title: { id: "Album Selfie", en: "Selfie Album" },
    desc: { id: "Koleksi selfie favorit kita.", en: "Our favorite selfie collection." } },
];
