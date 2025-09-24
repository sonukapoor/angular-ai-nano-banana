# Angular AI Nano Banana 🍌

A modern, minimal Angular app for generating images using Google Gemini AI. Built with the latest Angular features (standalone components, signals).

## Features

- **AI Image Generation**: Instantly create images from your ideas and uploads using Google Gemini AI.
- **Modern Angular**: Uses standalone components, signals, and best practices for a fast, reactive UI.
- **Drag & Drop Upload**: Effortlessly upload images by dragging or selecting files.
- **Live Preview**: See a preview of your uploaded image before generating.
- **Loading Indicator**: Animated 3-dot loader shows progress while your image is being generated.
- **Responsive & Accessible**: Looks great on all devices, with accessible color contrast and keyboard navigation.
- **Minimal, Customizable Styles**: Global styles are clean, minimal, and easy to adapt to your brand.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set your Google Gemini API key**
   - Add your API key to `src/environments/environment.ts` as `API_KEY`.
3. **Run the app**
   ```bash
   npm start
   ```
4. **Open in your browser**
   - Visit [http://localhost:4200](http://localhost:4200)

## Project Structure

- `src/app/image-generator/` — Main image generator component (UI, logic, styles)
- `src/styles.scss` — Minimal global styles for the app
- `src/environments/` — API key configuration

## Customization

- Update the color palette or layout in `styles.scss` to match your brand.
- Extend the image generator with more AI models, prompt options, or output formats.

## Credits

- Built by [Sonu Kapoor](https://sonukapoor.com/) — Google Developer Expert (Angular), Microsoft MVP, and open-source leader.
- Powered by [Google Gemini AI](https://ai.google.dev/)

## License

MIT
