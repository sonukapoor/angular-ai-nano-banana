import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-generator.html',
  styleUrls: ['./image-generator.scss'],
})
export class ImageGenerator {
  #ai = new GoogleGenAI({ apiKey: environment.API_KEY });

  selectedFile = signal<File | null>(null);
  imageUrl = signal<string | null>(null);
  isDragging = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);
  prompt = signal('');
  filePreview = signal<string | null>(null);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.error.set(null);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview.set(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        this.filePreview.set(null);
      }
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile.set(file);
      this.error.set(null);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview.set(reader.result as string);
          console.log(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.filePreview.set(null);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  async generateImage() {
    if (!this.selectedFile()) {
      this.error.set('Please upload an image file.');
      console.log('ss');
      return;
    }

    if (!this.prompt().trim()) {
      this.error.set('Please enter a prompt.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.imageUrl.set(null);

    try {
      const fileData = await this.readFileAsBase64(this.selectedFile()!);
      const prompt = this.prompt().trim();
      const response = await this.#ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: [
          { inlineData: { mimeType: this.selectedFile()!.type, data: fileData } },
          { text: prompt },
        ],
      });

      const candidates = response?.candidates;
      if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            this.imageUrl.set('data:image/png;base64,' + part.inlineData.data);
          }
        }
      } else {
        this.error.set('No image generated.');
      }
    } catch (err: any) {
      this.error.set(err.message || 'Failed to generate image.');
    } finally {
      this.loading.set(false);
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
