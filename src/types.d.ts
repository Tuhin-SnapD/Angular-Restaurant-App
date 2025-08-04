interface Navigator {
  share?: (data: ShareData) => Promise<void>;
  clipboard?: Clipboard;
}

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

interface Clipboard {
  writeText(text: string): Promise<void>;
  readText(): Promise<string>;
} 