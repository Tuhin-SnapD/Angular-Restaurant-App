# L'Artisan Culinaire - Elegant Restaurant Website

<div align="center">

![L'Artisan Culinaire](https://img.shields.io/badge/L'Artisan-Culinaire-gold?style=for-the-badge&logo=angular&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-16.0.0-red?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript&logoColor=white)

*A sophisticated, elegant website for an artisanal restaurant showcasing culinary excellence and luxury dining experiences.*

</div>

---

## 🍷 Overview

**L'Artisan Culinaire** is a premium restaurant website built with Angular, featuring a sophisticated design that reflects the elegance and craftsmanship of fine dining. The application showcases the restaurant's culinary masterpieces, philosophy, and commitment to excellence through an immersive digital experience.

### ✨ Key Features

- **Elegant Design System**: Luxury color palette with gold, burgundy, and charcoal themes
- **Responsive Layout**: Fully responsive design optimized for all devices
- **Interactive Components**: Smooth animations and hover effects
- **Professional Typography**: Custom fonts (Playfair Display, Cormorant Garamond, Montserrat)
- **Modern UI/UX**: Material Design components with custom styling
- **Performance Optimized**: Fast loading and smooth interactions

---

## 🎨 Design Philosophy

The website embodies the essence of artisanal cuisine through:

- **Luxury Aesthetics**: Sophisticated color schemes and premium visual elements
- **Craftsmanship Focus**: Attention to detail in every component and interaction
- **Seasonal Excellence**: Emphasis on fresh, local ingredients and seasonal menus
- **Curated Experience**: Every element designed to create an unforgettable journey

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn** (v1.22 or higher)
- **Angular CLI** (v16 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tuhin-snapd/angular-restaurant-app.git
   cd angular-restaurant-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` to view the application.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── about/                 # About page component
│   ├── contact/               # Contact page component
│   ├── dishdetail/            # Dish detail component
│   ├── footer/                # Footer component
│   ├── header/                # Header component
│   ├── home/                  # Home page component
│   ├── menu/                  # Menu page component
│   ├── services/              # Angular services
│   ├── shared/                # Shared models and constants
│   ├── directives/            # Custom directives
│   └── app-routing/           # Routing configuration
├── assets/                    # Static assets
├── environments/              # Environment configurations
└── styles.scss               # Global styles and theming
```

---

## 🛠️ Technologies Used

### Frontend Framework
- **Angular 16** - Progressive web application framework
- **TypeScript** - Type-safe JavaScript development
- **Angular Material** - Material Design components
- **Flex Layout** - Responsive layout system

### Styling & Design
- **SCSS/Sass** - Advanced CSS preprocessing
- **Google Fonts** - Typography (Playfair Display, Cormorant Garamond, Montserrat)
- **Font Awesome** - Icon library
- **CSS Grid & Flexbox** - Modern layout techniques

### Development Tools
- **Angular CLI** - Command-line interface
- **Karma & Jasmine** - Unit testing framework
- **Protractor** - End-to-end testing
- **ESLint** - Code linting

---

## 🎯 Features

### 🏠 Home Page
- **Hero Section**: Elegant introduction with restaurant branding
- **Featured Content**: Showcase of signature dishes, promotions, and chef highlights
- **Philosophy Section**: Three pillars of culinary excellence
- **Luxury Badges**: Michelin Starred, Farm to Table, Artisanal

### 📋 Menu Page
- **Culinary Masterpieces**: Grid layout showcasing all dishes
- **Interactive Cards**: Hover effects and image overlays
- **Chef's Selection**: Curated menu items with luxury badges
- **Responsive Grid**: Adaptive layout for all screen sizes

### ℹ️ About Page
- **Heritage Story**: Rich history and tradition
- **Excellence in Numbers**: Key statistics and achievements
- **Culinary Leadership**: Meet the master chefs
- **Inspirational Quote**: Chef's philosophy and vision

### 📞 Contact Page
- **Contact Information**: Location, hours, and contact details
- **Interactive Forms**: User feedback and inquiries
- **Professional Layout**: Clean and accessible design

---

## 🎨 Design System

### Color Palette
- **Gold** (`#D4AF37`) - Primary accent color
- **Burgundy** (`#8B2635`) - Secondary accent color
- **Charcoal** (`#2C2C2C`) - Primary text color
- **Cream** (`#FDF6E3`) - Background color
- **Ivory** (`#FFFFF0`) - Card background color

### Typography
- **Playfair Display** - Headings and titles
- **Cormorant Garamond** - Body text and descriptions
- **Montserrat** - UI elements and navigation

### Components
- **Luxury Cards** - Elevated card design with shadows and hover effects
- **Gradient Backgrounds** - Sophisticated color transitions
- **Interactive Elements** - Smooth animations and transitions
- **Luxury Badges** - Premium styling for special indicators

---

## 🔧 Development

### Available Scripts

```bash
# Development server
ng serve

# Build for production
ng build --prod

# Run unit tests
ng test

# Run end-to-end tests
ng e2e

# Lint code
ng lint

# Generate component
ng generate component component-name
```

### Code Style

The project follows Angular style guidelines and best practices:
- **TypeScript** strict mode enabled
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **Angular Material** design system

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Breakpoints
- **xs**: 0px - 599px
- **sm**: 600px - 959px
- **md**: 960px - 1279px
- **lg**: 1280px - 1919px
- **xl**: 1920px+

---

## 🧪 Testing

### Unit Tests
```bash
ng test
```
- Component testing with Jasmine
- Service testing
- Directive testing

### End-to-End Tests
```bash
ng e2e
```
- User journey testing
- Cross-browser compatibility
- Performance testing

---

## 🚀 Deployment

### Production Build
```bash
ng build --prod
```

### Deployment Options
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload to S3 bucket

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Material Design** - For the design system
- **Google Fonts** - For beautiful typography
- **Font Awesome** - For the icon library

---

## 📞 Support

For support and questions:
- **Email**: support@lartisanculinaire.com
- **Website**: https://lartisanculinaire.com
- **Documentation**: [Project Wiki](https://github.com/yourusername/angular-restaurant-app/wiki)

---

<div align="center">

**Made with ❤️ for culinary excellence**

*L'Artisan Culinaire - Where culinary artistry meets timeless elegance*

</div>
