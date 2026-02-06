
import { CaseStudy, AboutItemData } from './types';

export const ABOUT: AboutItemData[] = [
  {
    text: 'Depth-Limited Search (DLS) merupakan algoritma pencarian yang bekerja dengan cara menelusuri satu cabang pohon atau graf hingga mencapai kedalaman tertentu sebelum berpindah ke cabang lainnya. Algoritma ini merupakan pengembangan dari metode Depth-First Search (DFS) yang dimodifikasi dengan penambahan parameter batas atau "limit" untuk mengontrol sejauh mana pencarian dilakukan. Dengan adanya batasan ini, DLS mampu mengatasi kelemahan utama DFS yang sering terjebak dalam jalur pencarian yang sangat dalam atau bahkan tidak terbatas.',
  },
  {
    text: "Dalam proses operasinya, DLS akan berhenti mengeksplorasi suatu jalur segera setelah mencapai batas kedalaman yang telah ditentukan, meskipun solusi mungkin berada di level yang lebih dalam lagi. Hal ini membuat efisiensi ruang atau memorinya sangat baik karena hanya perlu menyimpan jalur yang sedang aktif dalam batas tersebut. Namun, efektivitas algoritma ini sangat bergantung pada ketepatan penentuan nilai batas. Jika batas terlalu kecil, solusi yang diinginkan mungkin tidak akan pernah ditemukan.",
  },
  {
    text: "Secara praktis, DLS sering digunakan sebagai komponen dasar dalam algoritma yang lebih kompleks seperti Iterative Deepening Search untuk mendapatkan solusi yang lebih optimal tanpa mengorbankan memori. Dalam konteks pengembangan sistem, algoritma ini sangat berguna untuk menangani masalah dengan ruang pencarian yang luas namun memiliki estimasi kedalaman solusi yang sudah diketahui. Penggunaannya memastikan bahwa sistem tetap responsif dan tidak menghabiskan sumber daya komputasi pada jalur yang tidak relevan secara berlebihan.",
    codes: [
      { title: "Pseudocode", filePath: "/codes/pseu_dls.txt" },
      { title: "penjelasan algoritma", filePath: "/codes/penjelasan_algoritma_dls.txt" },
    ]
  },
];

// src/constants.ts
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'studi-kasus',
    title: 'Efisiensi Fiberoptic Internet Rakyat',
    text: 'Penelitian ini berfokus pada tantangan besar dalam memeratakan akses internet di wilayah pemukiman dengan menekan biaya penggelaran kabel fiber optic yang dikenal sangat mahal. Solusi yang diusulkan memanfaatkan infrastruktur jalur kereta api sebagai tulang punggung *(backbone)* jaringan nasional. Strategi ini sejalan dengan kolaborasi antara **PT Surge (PT Solusi Sinergi Digital Tbk)** dan **PT KAI (PT Kereta Api Indonesia Persero)**, yang memungkinkan pemanfaatan aset jalur kereta untuk mempercepat penetrasi internet rakyat secara efisien di sepanjang koridor transportasi utama.',
  },
  {
    text: 'Untuk memastikan pemodelan yang akurat, pengumpulan dataset dilakukan melalui dua pendekatan berbeda. Pertama, data koordinat pemukiman penduduk dikumpulkan secara manual menggunakan **Google Maps** untuk memvalidasi titik-titik persebaran populasi yang membutuhkan akses. Kedua, data koordinat jalur kereta api diambil secara presisi melalui **Google Earth** dengan memanfaatkan fitur Path. Penggunaan fitur ini memungkinkan identifikasi lintasan rel yang mendetail sebagai titik acuan utama penarikan kabel fiber optic.',
    downloads: [
      { label: "Dataset koordinat pemukimaan", url: "/dataset_wilayah.csv", fileName: "dataset_wilayah.csv" },
      { label: "Dataset jalur kereta", url: "/jalur_kereta.csv", fileName: "jalur_kereta.csv" }
    ]
  },
  {
    text: 'Langkah teknis pertama dalam penelitian ini adalah menentukan titik koordinat tower yang paling efisien menggunakan algoritma K-Center Clustering. Algoritma ini bekerja secara iteratif untuk menentukan lokasi pusat layanan (tower) yang optimal guna memastikan seluruh pemukiman penduduk terjangkau oleh sinyal dalam radius tertentu. Dengan pendekatan ini, potensi area yang terisolasi dari akses komunikasi dapat diminimalisir melalui penempatan node yang strategis.',
  },
  {
    text: 'Setelah titik tower ditentukan, efisiensi penarikan kabel dihitung menggunakan metode Depth Limited Search (DLS) dengan batasan jarak (depth limit) sejauh 5 KM dari jalur kereta api. Untuk menjamin akurasi perhitungan jarak pada permukaan bumi yang melengkung, digunakan rumus Haversine:',
    formula: `\\begin{gathered} 
    a = \\sin^2 \\left( \\frac{\\Delta\\text{lat}}{2} \\right) + \\cos(\\text{lat}_1) \\cdot \\cos(\\text{lat}_2) \\cdot \\sin^2 \\left( \\frac{\\Delta\\text{lon}}{2} \\right) \\\\[10pt]
    c = 2 \\cdot \\operatorname{atan2}(\\sqrt{a}, \\sqrt{1-a}) \\\\[10pt]
    d = R \\cdot c 
    \\end{gathered}`
  },
  {
    text: 'Dalam model ini, tower yang berada dalam jangkauan 5 KM diklasifikasikan sebagai Fiber Node, di mana koneksi internet ditarik langsung menggunakan kabel fisik dari jalur kereta. Sementara itu, untuk tower yang berada di luar batas tersebut, sistem menerapkan metode Wireless Backhaul, yaitu menghubungkan tower tersebut ke node fiber terdekat secara nirkabel guna menghindari biaya konstruksi fisik yang berlebihan.'
  }
];

// src/constants.ts
// Tambahkan export baru untuk masing-masing section

export const IMPLEMENTASI: CaseStudy[] = [
  {
    id: 'implementasi',
    title: 'Strategi Penentuan Lokasi (K-Center)',
    codes: [
      { title: "Python", filePath: "/codes/cluster.txt" },
    ],
  },
  {
    text: 'Algoritma ini dimulai dengan menempatkan satu menara pada titik pertama dalam dataset, kemudian mencari titik berikutnya yang memiliki jarak paling jauh dari menara yang sudah ada. Dengan memilih titik terjauh sebagai lokasi menara baru secara berulang, algoritma memastikan bahwa penyebaran menara dilakukan seinklusif mungkin. Teknik ini sangat efektif untuk masalah cakupan (coverage) karena secara agresif mencoba mengurangi jarak maksimum antara pengguna dan menara terdekat.',
  },
  {
    text: 'Berbeda dengan K-Means yang biasanya mengharuskan kita menentukan jumlah cluster ***k*** di awal, kode Anda menggunakan pendekatan dinamis dengan bantuan variabel radius_limit sebesar 0.0225. Program akan menjalankan loop yang terus meningkatkan nilai ***k*** (jumlah menara) sampai jarak terjauh dari titik manapun ke menara terdekatnya (max_dist) berada di bawah ambang batas radius tersebut. Ini memastikan tidak ada satu pun wilayah yang "tertinggal" atau berada di luar jangkauan layanan.',
  },
  {
    text: 'Setelah kondisi radius terpenuhi, program akan menghasilkan jumlah total menara optimal yang dibutuhkan untuk meng-cover seluruh wilayah tersebut. Hasil koordinat akhir disimpan ke dalam file **koordinat_tower.csv**, yang siap digunakan sebagai titik acuan pembangunan infrastruktur di lapangan. Pendekatan ini sangat relevan karena memberikan kepastian jangkauan yang merata.',
  },
  {
    image: '/image/persebaran_wilayah.webp',
    imageCaption:'Visualisasi persebaran wilayah'
  },
  {
    image: '/image/clustering.webp',
    imageCaption:'Visualisasi setelah Clustering'
  },
  {
    title: 'Strategi optimasi algoritma DLS',
    codes: [
      { title: "Python", filePath: "/codes/python_dls.txt" },
    ],
  },
  {
    text: 'Langkah pertama yang dilakukan algoritma adalah memproses data spasial dari koordinat tower dan jalur kereta. Karena permukaan bumi melengkung, algoritma menggunakan Formula Haversine untuk menghitung jarak terpendek (lingkaran besar) antara dua titik koordinat latitude dan longitude. Untuk setiap tower, sistem melakukan iterasi ke seluruh titik koordinat di jalur kereta guna menemukan titik terdekat yang paling efisien untuk ditarik kabel fiber.',
  },
  {
    text:'Algoritma ini menerapkan aturan Depth Limit 5 KM. Tower yang berada dalam radius kurang dari atau sama dengan 5 km dari jalur kereta diklasifikasikan sebagai Fiber Node. Tower ini dianggap layak secara ekonomi dan teknis untuk dihubungkan langsung menggunakan kabel fiber optik (jalur hijau dalam visualisasi). Hal ini bertujuan untuk memastikan stabilitas bandwidth yang tinggi bagi pemukiman di sekitar jalur utama tersebut.'
  },
  {
    text:'Bagi tower yang berada di luar jangkauan 5 km, algoritma secara cerdas tidak memaksakan penarikan kabel fiber yang mahal. Sebaliknya, tower tersebut dikategorikan sebagai Wireless Node. Algoritma akan mencari Fiber Node terdekat untuk dijadikan sebagai jembatan (bridge). Koneksi kemudian dilakukan secara nirkabel (wireless backhaul) yang digambarkan dengan garis putus-putus oranye. Strategi ini mengoptimalkan biaya pembangunan infrastruktur tanpa mengorbankan keterhubungan wilayah yang jauh dari pusat transmisi.'
  },
  {
    image: '/image/visualisasi_dls.webp',
    imageCaption:'Visualisasi DLS'
  },  
];

export const EVALUASI: CaseStudy[] = [
  {
    id: 'evaluasi',
    title: 'Hibridisasi Algoritma dalam Pemodelan Jaringan',
    text: 'Kami menyadari bahwa penerapan metode Depth Limited Search (DLS) secara murni dalam studi kasus penentuan jalur backbone internet ini masih memiliki keterbatasan efisiensi jika diterapkan pada skenario dunia nyata yang kompleks. Penggunaan ambang batas statis sebesar 5 KM untuk klasifikasi node fiber cenderung mengabaikan dinamika topografi dan optimasi biaya infrastruktur yang sebenarnya. Oleh karena itu, kami mengusulkan pendekatan integratif yang menggabungkan beberapa algoritma dengan tahapan sebagai berikut',
  },
  {
    title: '1. Klasifikasi Tower A dan Koneksi Backbone',
    text: 'Langkah awal dalam perancangan topologi jaringan ini dimulai dengan mengidentifikasi unit infrastruktur sebagai Tower A. Pada tahap ini, dilakukan proses pemetaan titik koordinat setiap menara terhadap jalur kereta api yang berfungsi sebagai backbone utama serat optik. Dengan mengimplementasikan logika Depth-Limited Search (DLS), sistem menyaring menara-menara yang berada dalam radius "kedalaman" atau jarak maksimal 2,10 km dari jalur utama, Menara yang memenuhi kriteria ini diklasifikasikan sebagai Tower A, yang kemudian dihubungkan secara langsung ke titik terdekat di jalur backbone menggunakan media transmisi kabel serat optik.',
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap1.txt" },
    ],
    image: '/image/tahap1.webp',
    imageCaption:'visualisasi tower A'
  },
  {
    title: '2. Klasifikasi Tower B dan Perluasan Jangkauan',
    text: 'Fokus pengembangan dialihkan pada menara yang berada di zona menengah, yang diklasifikasikan sebagai Tower B. Pada fase ini, logika pencarian tetap menggunakan parameter jarak geospasial, namun dengan batasan kedalaman (depth limit) yang lebih luas, yaitu di atas 2,10 km hingga maksimal 5,00 km dari jalur backbone utama. Menara yang masuk dalam kategori ini adalah infrastruktur yang secara geografis tidak lagi memungkinkan untuk disebut sebagai simpul utama (Tower A), namun masih cukup krusial untuk diintegrasikan ke dalam ekosistem jaringan melalui perhitungan efisiensi jarak.',    
  },
  {
    text:'Proses identifikasi ini secara otomatis mengabaikan menara yang telah terproses pada tahap sebelumnya guna memastikan tidak adanya tumpang tindih klasifikasi. Setiap unit Tower B yang ditemukan akan dicatat koordinatnya dan dihitung jarak terdekatnya terhadap jalur kereta api sebagai referensi awal konektivitas. Tahap ini menjadi jembatan penting dalam memperluas cakupan layanan internet rakyat ke wilayah rural yang memiliki jarak moderat dari infrastruktur inti.'
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap_2.txt" },
    ],
    image: '/image/tahap2.webp',
    imageCaption:'visualisasi tower B'
  },
  {
    title: '3. Optimasi Koneksi dengan Algoritma Greedy dan Geometri Spasial',
    text: 'Dilakukan optimasi untuk menentukan jalur transmisi yang paling efisien bagi Tower B dengan mempertimbangkan dua opsi koneksi: menyambung ke Tower A terdekat atau langsung ke Backbone. Keputusan ini diambil berdasarkan kriteria total panjang kabel dan integritas geografis. Sistem akan menghitung akumulasi jarak dari Tower B ke Tower A ditambah jarak Tower A ke backbone; jika total jarak tersebut tidak melebihi 6,0 km, maka koneksi antar-menara dipertimbangkan sebagai jalur potensial.',
  },
  {
    text:'Selain faktor jarak, aspek teknis yang sangat krusial dalam tahap ini adalah pengecekan persilangan jalur (intersection). Menggunakan fungsi logika geometri, sistem memastikan bahwa kabel yang menghubungkan Tower B ke Tower A tidak memotong jalur kereta api (backbone). Jika ditemukan adanya persilangan atau jika total jarak melebihi batas yang ditentukan, maka Tower B akan dipaksa untuk terhubung langsung ke backbone melalui jalur tegak lurus terdekat. Hal ini dilakukan untuk menjaga efisiensi penempatan kabel dan menghindari kendala teknis di lapangan saat proses instalasi serat optik dilakukan.'
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap_3.txt" },
    ],
    image: '/image/tahap3.webp',
    imageCaption:'visualisasi tower A + b + backbone'
  },
  {
    title: '4. Klasifikasi Tower Sisa menggunakan Algoritma Nearest Neighbor',
    text: 'Setelah menara pada kategori A dan B terpetakan, tahap keempat difokuskan pada penanganan seluruh menara yang belum terakomodasi, yang kemudian diklasifikasikan sebagai Tower Sisa. Pada fase ini, sistem melakukan penyaringan terhadap indeks data untuk mengidentifikasi menara yang berada di luar jangkauan langsung backbone (di atas 5 km) atau yang tidak memenuhi kriteria pada tahap-tahap sebelumnya. Mengingat jaraknya yang jauh dari infrastruktur utama, tower-tower ini tidak lagi dihubungkan langsung ke backbone, melainkan diintegrasikan ke dalam jaringan melalui tower yang sudah aktif.',
  },
  {
    text:'Algoritma yang diterapkan pada tahap ini adalah Nearest Neighbor Search yang berbasis pada perhitungan jarak linear terkecil. Untuk setiap unit Tower Sisa, sistem melakukan iterasi terhadap seluruh koordinat Tower B yang telah terdaftar untuk menentukan titik tumpu (hub) terdekat. Penentuan koneksi ini didasarkan pada nilai minimum hasil kalkulasi Rumus Haversine, sehingga setiap menara sisa akan memiliki jalur transmisi menuju Tower B dengan jarak tempuh paling pendek. Hasil dari tahap ini adalah terbentuknya kelompok-kelompok klaster kecil di mana Tower B berperan sebagai gerbang utama bagi tower di wilayah pelosok.'
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap_4.txt" },
    ],
    image: '/image/tahap4.webp',
    imageCaption:'Koneksi Tower Sisa ke Tower B Terdekat'
  },
  {
    title: '5. Klasifikasi Tower Sisa menggunakan Algoritma Nearest Neighbor',
    text: 'Tahap kelima bertujuan untuk mengoptimalkan beban distribusi pada jaringan dengan melakukan audit terhadap kapasitas koneksi setiap Tower B. Mengingat Tower B berfungsi sebagai titik tumpu (hub) bagi Tower Sisa, terdapat risiko bottleneck atau penurunan performa jika satu menara melayani terlalu banyak koneksi sekaligus. Algoritma yang digunakan pada tahap ini adalah Threshold-based Clustering & Representative Election. Sistem melakukan pemindaian terhadap seluruh Tower B dan mengidentifikasi menara yang memiliki lebih dari 3 koneksi dari Tower Sisa.',
  },
  {
    text:'Untuk menangani beban berlebih tersebut, sistem melakukan prosedur dengan Pemilihan Tower C Di dalam klaster Tower Sisa yang terhubung pada satu Tower B, sistem memilih satu menara dengan jarak geografis paling dekat ke Tower B untuk dipromosikan menjadi Tower C. Kemudian dikonfigurasi sebagai sub-hub. Tower Sisa lainnya di dalam klaster tersebut yang semula terhubung langsung ke Tower B, kini dialihkan koneksinya menuju Tower C. Perhitungan jarak baru dilakukan menggunakan Rumus Haversine untuk memastikan jalur dari Tower Sisa ke Tower C tetap efisien secara spasial.'
  },
  {
    text:'Melalui pendekatan ini, topologi jaringan berubah dari model bintang sederhana (star topology) menjadi model pohon bertingkat (hierarchical tree). Hal ini tidak hanya mengurangi beban teknis pada Tower B, tetapi juga memperpendek bentangan kabel atau jangkauan nirkabel dari menara-menara di ujung jaringan.'
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap_5.txt" },
    ],
    image: '/image/tahap5.webp',
    imageCaption:'Visualisasi optimasi HUB'
  },
  {
    title: '6. Integrasi Topologi dan Penentuan Media Transmisi',
    text: 'Tahap akhir dari evaluasi ini adalah integrasi seluruh data koneksi ke dalam sebuah Master Topology yang menentukan arsitektur fisik jaringan secara komprehensif. Pada fase ini, sistem menerapkan Algoritma Klasifikasi Media untuk menentukan jenis transmisi data yang paling sesuai berdasarkan hierarki menara yang telah terbentuk pada tahap-tahap sebelumnya. Algoritma ini memetakan hubungan antar-node ke dalam dua kategori utama Fiber Optic dan Wireless Backhaul.',
  },
  {
    text:'Ketentuan penentuan media transmisi dilakukan dengan cara eluruh koneksi yang melibatkan infrastruktur inti, yaitu hubungan dari Tower A ke Backbone, Tower B ke Backbone, Tower B ke Tower A, serta Tower C ke Tower B, secara otomatis diklasifikasikan menggunakan media serat optik untuk menjamin stabilitas dan kecepatan tinggi. Koneksi yang berasal dari Tower Sisa menuju Tower B atau Tower C dikategorikan sebagai Wireless Backhaul, yang direpresentasikan dalam visualisasi melalui garis putus-putus untuk membedakannya dengan jalur kabel fisik.'
  },
  {
    text:'Seluruh segmen koordinat kemudian dikompilasi ke dalam satu basis data terpadu *(topology_jaringan_fiber.csv)* yang mencakup informasi ID node, posisi geografis, jarak dalam kilometer, hingga jenis media yang digunakan. Hasil akhirnya divisualisasikan dalam sebuah peta topologi yang memberikan gambaran utuh mengenai sebaran akses internet rakyat, memudahkan tim teknis dalam merencanakan implementasi infrastruktur di lapangan.'
  },
  {
    codes: [
      { title: "Python", filePath: "/codes/tahap_6.txt" },
    ],
    image: '/image/tahap6.webp',
    imageCaption:'Visualisasi topologi jaringan internet rakyat setelah evaluasi'
  }    
];

export const KESIMPULAN: CaseStudy[] = [
  {
    id: 'kesimpulan',
    title: 'Kesimpulan',
    text: 'Perbandingan antara sebelum dan sesudah evaluasi menunjukkan evolusi dari pendekatan yang sederhana dan linear menuju arsitektur jaringan yang hierarkis dan kompleks. Secara efisiensi operasional, dls murni jauh lebih praktis dalam implementasi awal karena hanya menggunakan satu aturan utama, yaitu depth limit sejauh 5 km dari jalur kereta sebagai penentu media transmisi. Jika tower berada dalam jangkauan tersebut, ia ditarik kabel fiber secara langsung ke backbone, sementara sisanya dihubungkan melalui wireless backhaul ke node fiber terdekat. Pendekatan ini sangat cepat untuk pemetaan skala besar namun cenderung menghasilkan banyak tarikan kabel panjang yang mungkin redundan karena setiap tower dianggap sebagai entitas mandiri terhadap jalur kereta.',
  },
  {
    text: 'Sebaliknya, menggunakan pendekatan alogritma campuran menawarkan efisiensi topologi dan biaya jangka panjang yang lebih baik melalui klasifikasi tower (A, B, dan C). Alih-alih setiap tower berebut akses ke backbone, pendekatan ini membangun struktur bertingkat di mana Tower A berfungsi sebagai gerbang utama, Tower B sebagai aggregator, dan Tower C sebagai titik distribusi akhir. Meskipun kode ini lebih kompleks karena melibatkan manajemen ketergantungan antar file CSV (*seperti tower_A.csv dan koneksi_tower_b_final.csv*), hasil akhirnya jauh lebih optimal untuk penggelaran infrastruktur nyata. Jaringan tidak lagi berbentuk "kipas" yang terpusat ke rel, melainkan membentuk jaring (mesh) yang lebih terorganisir, meminimalkan penggunaan kabel fiber yang tidak perlu dengan memaksimalkan fungsi tiap tingkatan tower.',
  },
  {
    text:'Dari sisi efisiensi biaya (CAPEX), penggunaan model terbaru berhasil memberikan penghematan kabel sekitar **1,33** km. Pengurangan ini berdampak langsung pada penurunan biaya pengadaan material, seperti kabel, ducting, dan tiang, serta menekan biaya jasa instalasi secara signifikan. Meskipun angka jarak tersebut terlihat kecil, dalam skala proyek infrastruktur, penghematan ini setara dengan pengurangan titik potensi kegagalan kabel yang dapat mengganggu stabilitas sistem di masa depan.',
  },
  {
    text: 'Optimalisasi jangkauan juga terlihat jauh lebih efektif melalui model algoritma campuran. Hasil simulasi membuktikan bahwa menghubungkan satu tower ke tower terdekat lainnya (seperti Tower B ke Tower A) jauh lebih efisien dibandingkan memaksakan seluruh jalur ditarik lurus menuju backbone di jalur kereta. Pendekatan ini memungkinkan tower tambahan mendapatkan akses Fiber Optic yang stabil tanpa harus menambah beban kabel secara berlebihan di satu titik pusat.'
  },
  {
    text: 'Ditinjau dari stabilitas jaringan, model algoritma campuran menawarkan manajemen trafik yang lebih terorganisir per wilayah. Berbeda dengan model dls murni yang menarik kabel panjang secara mandiri ke rel sehingga berisiko mengalami degradasi sinyal jika jaraknya mendekati batas maksimal model algoritma campuran ini membagi beban melalui node perantara. Hal ini tidak hanya menjaga kualitas sinyal, tetapi juga memudahkan tim teknis dalam melakukan pemeliharaan rutin.'
  },
  {
    text: 'model hierarki ini memberikan fleksibilitas perluasan yang tinggi untuk pengembangan jangka panjang. Dengan struktur ini, penambahan tower baru di masa depan menjadi jauh lebih mudah kita cukup menghubungkannya ke Tower B atau Tower C terdekat. Strategi ini sangat krusial untuk menghindari ketergantungan pada jalur kereta yang mungkin sudah jenuh atau posisinya terlalu jauh dari titik ekspansi baru.'
  },
  {
    title:'Penutup',
    text:'Secara keseluruhan, perbedaan mendasar antara kedua pendekatan ini terletak pada strategi konektivitasnya dls murni bertindak sebagai model basis yang memprioritaskan kedekatan geografis dengan jalur utama menggunakan parameter tunggal, sedangkan pendekatan algoritma campuran merupakan model jaringan matang yang menerapkan manajemen trafik dan distribusi peran antar-tower. Jika dls murni efektif untuk menentukan kelayakan awal suatu area berdasarkan depth limit 5 km, maka pendekatan algoritma campuran adalah panduan teknis yang lebih efisien untuk implementasi di lapangan karena mampu mengurangi redundansi kabel dan mengorganisir tower ke dalam hierarki Fiber Optic dan Wireless Backhaul yang sistematis.'
  },
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', url: 'https://github.com/drrri-py/Tugas-besar-kecerdasan-buatan-kelompok-12-algoritma-DLS.git', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' },
  { label: 'Docs', url: 'https://docs.google.com/document/d/1k0zXrOLNqVem8q8hx3IcsVJEBpwKApn_7KbXYJv3r08/edit?usp=sharing', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z'},
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'Instagram', url: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
];
