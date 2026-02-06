// src/types.ts

/**
 * Interface untuk item file yang dapat diunduh
 */
export interface DownloadItem {
  label: string;
  url: string;
  fileName: string;
}

/**
 * Interface untuk blok kode program
 */
export interface CodeItem {
  title: string;
  filePath: string;
  language?: string; // Opsional: default ke 'text' jika tidak diisi
}

/**
 * Interface dasar untuk item di section "About"
 * Mendukung teks, rumus LaTeX, download, dan kode.
 */
export interface AboutItemData {
  text: string;
  formula?: string; 
  downloads?: DownloadItem[];
  codes?: CodeItem[];
  image?: string;
  imageCaption?: string;
}

/**
 * Interface untuk item di section "Studi Kasus" dan section lainnya.
 * Menambahkan properti title dan id untuk keperluan navigasi dan heading.
 */
export interface CaseStudy {
  id?: string;
  title?: string;
  description?: string;
  text?: string;
  formula?: string; 
  downloads?: DownloadItem[];
  codes?: CodeItem[];
  image?: string;
  imageCaption?: string;
}

/**
 * Definisi ID untuk sistem navigasi dan scroll-spy.
 * Memasukkan section baru: implementasi, evaluasi, dan kesimpulan.
 */
export type SectionId = 
  | 'about' 
  | 'studi-kasus' 
  | 'implementasi' 
  | 'evaluasi' 
  | 'kesimpulan';