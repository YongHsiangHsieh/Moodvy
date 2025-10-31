# 🎬 Moodvy - Your Movie Discovery Companion

A modern, interconnected movie discovery web application that helps users explore movies, discover actors, and navigate through an extensive network of cinematic connections.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.4-007FFF?style=flat&logo=mui)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite)
![React Query](https://img.shields.io/badge/React_Query-5.90.2-FF4154?style=flat&logo=react-query)

---

## 📖 Table of Contents

- [What is Moodvy?](#what-is-moodvy)
- [Why I Built This](#why-i-built-this)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Future Enhancements](#future-enhancements)

---

## 🎯 What is Moodvy?

Moodvy is a **comprehensive movie discovery platform** that goes beyond simple movie listings. It creates an **interconnected web of cinematic information**, allowing users to:

- 🎥 Discover movies across multiple categories (popular, top-rated, now playing)
- 🎭 Explore actor profiles with complete filmographies
- 🔗 Navigate seamlessly between movies and actors
- 💡 Get personalized recommendations and discover similar films
- ⭐ View detailed information about movies and cast members

Think of it as your personal movie encyclopedia with intelligent navigation - **every piece of information is interconnected**, making exploration intuitive and engaging.

---

## 💡 Why I Built This

This project was developed as part of my Web Application Development coursework at SETU (South East Technological University) with three core objectives:

### 1. **Learning Modern React Patterns**

I wanted to master contemporary React development practices including:

- Custom hooks for reusable logic
- Component composition and separation of concerns
- State management with Context API and React Query
- Performance optimization with caching and lazy loading

### 2. **Creating Extensive Information Linking**

The rubric emphasized "extensive linking of information" - I achieved this by:

- **Bidirectional navigation**: Movie → Actor → Movie (creating interconnection cycles)
- **Discovery pathways**: Recommendations and similar movies for endless exploration
- **Sorted data**: Filmographies sorted by popularity to highlight actors' most famous work
- **Multiple entry points**: Users can start from popular movies, top-rated, or now playing

### 3. **Building Production-Ready Code**

I focused on:

- **Maintainability**: Centralized constants, reusable utilities, DRY principles
- **Consistency**: Refactored components to follow established patterns
- **User Experience**: Loading states, error handling, responsive design
- **Code Quality**: JSDoc documentation, clear naming conventions

---

## ✨ Key Features

### 🎬 Movie Discovery

- **Homepage**: Discover latest movies with rich poster displays
- **Categories**: Browse popular, top-rated, and now-playing movies
- **Search & Filter**: Find movies by genre and rating
- **Favorites**: Mark and manage your favorite movies
- **Upcoming**: Preview movies coming soon to theaters

### 🎭 Actor Profiles

- **Complete Biographies**: Detailed actor information (birthday, birthplace, career)
- **Filmography**: View all movies an actor has appeared in
- **Smart Sorting**: Movies sorted by popularity (famous roles first)
- **Clickable Links**: Navigate from actor back to any movie

### 🔗 Intelligent Interconnections

- **Cast Lists**: Click any actor from a movie's cast to view their profile
- **Recommendations**: AI-powered movie suggestions based on current selection
- **Similar Movies**: Find movies with similar themes, genres, or styles
- **Circular Navigation**: Create exploration loops (Movie → Actor → Movie → Actor...)

### 🎨 User Experience

- **Responsive Design**: Seamless experience on mobile, tablet, and desktop
- **Loading States**: Skeleton screens for smooth perceived performance
- **Horizontal Scrolling**: Browse cast and recommendations with styled scrollbars
- **Material Design**: Clean, modern UI with Material-UI components
- **Error Handling**: Graceful error messages when data is unavailable

---

## 🛠️ How It Works

### The Interconnection Architecture

Moodvy creates a **web of connections** between movies and actors:

```
┌─────────────────────────────────────────────────────────────┐
│                     USER JOURNEY                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Homepage                                                    │
│    ↓ [Click Movie]                                          │
│  Movie Details                                               │
│    ↓ [Click Actor in Cast]                                  │
│  Actor Profile                                               │
│    ↓ [Click Movie in Filmography]                           │
│  Different Movie Details                                     │
│    ↓ [Click Recommendation]                                 │
│  Another Movie Details                                       │
│    ↓ [Click Similar Movie]                                  │
│  Yet Another Movie Details                                   │
│    ↓ [Click Different Actor]                                │
│  Different Actor Profile                                     │
│    ↓ [Continue exploring...]                                │
│  ∞ Endless discovery paths                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Example

**Scenario**: User explores Tom Hanks

1. **User clicks** "Forrest Gump" on homepage
2. **App fetches** movie details from TMDB API
3. **App displays** movie info + fetches cast data
4. **User clicks** "Tom Hanks" in cast section
5. **App navigates** to `/actors/31`
6. **App fetches** Tom Hanks' biography AND filmography
7. **App sorts** filmography by popularity (Toy Story, Forrest Gump first)
8. **User clicks** "Cast Away" from filmography
9. **App navigates** back to movie details
10. **Cycle continues** - user can explore indefinitely

---

## 🏗️ Technology Stack

### Core Framework

- **React 19.1.1**: Latest React with improved performance and features
- **Vite 7.1.7**: Lightning-fast build tool with HMR (Hot Module Replacement)
- **React Router 7.9.3**: Client-side routing with nested routes

### UI & Styling

- **Material-UI (MUI) 7.3.4**: Comprehensive component library
- **Custom Theme**: Tailored color palette and typography
- **Responsive Grid**: Adaptive layouts for all screen sizes

### Data Management

- **React Query 5.90.2**: Powerful server state management
  - Automatic caching (6-hour stale time)
  - Background refetching
  - Loading and error states
- **Context API**: Global state for favorites and user preferences

### API Integration

- **TMDB API**: The Movie Database REST API
- **Custom API Client**: Centralized fetch wrapper with error handling
- **Image CDN**: Optimized image loading from TMDB servers

---

## 📁 Project Architecture

### File Structure

```
movies/src/
├── api/                      # API integration layer
│   ├── client.js            # Unified fetch client
│   ├── config.js            # API configuration
│   └── tmdb-api.jsx         # 15 TMDB endpoint functions
│
├── components/              # Reusable UI components
│   ├── actorDetails/        # Actor profile display
│   ├── castCard/            # Actor card in cast lists
│   ├── compactMovieCard/    # Compact movie card (recommendations)
│   ├── horizontalScrollContainer/ # Reusable scroll wrapper
│   ├── movieCard/           # Full-size movie card
│   ├── movieDetails/        # Movie detail sections
│   ├── pageHeader/          # Page title component
│   ├── siteHeader/          # Navigation bar
│   └── skeletons/           # Loading state components
│
├── constants/               # Centralized constants
│   ├── queryKeys.js         # React Query cache keys
│   └── routes.js            # Route path definitions
│
├── contexts/                # React Context providers
│   └── moviesContext.jsx    # Favorites and state management
│
├── hooks/                   # Custom React hooks
│   ├── useMovieById.jsx              # Fetch single movie
│   ├── useMovieCredits.jsx           # Fetch cast/crew
│   ├── useMovieRecommendations.jsx   # Fetch recommendations
│   ├── useMovieSimilar.jsx           # Fetch similar movies
│   ├── usePersonDetails.jsx          # Fetch actor bio
│   └── usePersonMovieCredits.jsx     # Fetch actor filmography
│
├── pages/                   # Route components (data layer)
│   ├── homePage.jsx                  # Discover movies
│   ├── popularMoviesPage.jsx         # Popular category
│   ├── topRatedMoviesPage.jsx        # Top rated category
│   ├── nowPlayingMoviesPage.jsx      # Now playing category
│   ├── movieDetailsPage.jsx          # Movie detail view
│   ├── actorDetailsPage.jsx          # Actor profile view
│   └── favoriteMoviesPage.jsx        # User favorites
│
├── theme/                   # Material-UI theme customization
│   ├── index.js             # Theme provider
│   ├── palette.js           # Color scheme
│   ├── typography.js        # Font styles
│   └── components.js        # Component overrides
│
├── utils/                   # Utility functions
│   ├── movie.js             # Movie-related helpers
│   ├── string.js            # String manipulation
│   └── collections.js       # Array/object utilities
│
└── main.jsx                 # App entry point & routing
```

### Design Patterns Used

#### 1. **Separation of Concerns**

- **Pages**: Handle routing and data fetching
- **Components**: Handle presentation and UI
- **Hooks**: Encapsulate data fetching logic
- **Utils**: Provide reusable helper functions

#### 2. **Custom Hooks Pattern**

All data fetching follows consistent pattern:

```jsx
const { data, isLoading, error, LoadingState } = useCustomHook(id, apiFunction);
```

#### 3. **Component Composition**

Reusable components combined to build complex UIs:

- `HorizontalScrollContainer` + `CompactMovieCard` = Recommendation section
- `PageHeader` + `ActorDetails` = Actor profile page

#### 4. **Centralized Configuration**

- All routes defined in `constants/routes.js`
- All query keys in `constants/queryKeys.js`
- All API endpoints in `api/tmdb-api.jsx`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YongHsiangHsieh/Moodvy.git
   cd moodvy-app/movies
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `movies` directory:

   ```env
   VITE_TMDB_KEY=your_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 🔌 API Integration

### TMDB Endpoints Used

| Endpoint                      | Purpose            | Hook                      |
| ----------------------------- | ------------------ | ------------------------- |
| `/discover/movie`             | Homepage movies    | `useMovieList`            |
| `/movie/popular`              | Popular movies     | `useMovieList`            |
| `/movie/top_rated`            | Top rated movies   | `useMovieList`            |
| `/movie/now_playing`          | Movies in theaters | `useMovieList`            |
| `/movie/upcoming`             | Upcoming releases  | `useMovieList`            |
| `/movie/{id}`                 | Movie details      | `useMovieById`            |
| `/movie/{id}/credits`         | Cast & crew        | `useMovieCredits`         |
| `/movie/{id}/recommendations` | Recommended movies | `useMovieRecommendations` |
| `/movie/{id}/similar`         | Similar movies     | `useMovieSimilar`         |
| `/person/{id}`                | Actor biography    | `usePersonDetails`        |
| `/person/{id}/movie_credits`  | Actor filmography  | `usePersonMovieCredits`   |
| `/genre/movie/list`           | Genre list         | Context                   |
| `/movie/{id}/images`          | Movie posters      | Template                  |

### Data Caching Strategy

React Query caches all API responses with:

- **6-hour stale time**: Data considered fresh for 6 hours
- **Background refetching**: Silent updates in background
- **Automatic deduplication**: Same query only fetches once
- **Optimistic updates**: Instant UI feedback

---

## 🎓 What I Learned

### Technical Skills

- ✅ Advanced React patterns (custom hooks, composition)
- ✅ State management (Context API + React Query)
- ✅ API integration and error handling
- ✅ Responsive design with Material-UI
- ✅ Performance optimization (memoization, lazy loading)
- ✅ Code organization and architecture

### Soft Skills

- ✅ Problem-solving (queryKey bug, data sorting)
- ✅ Planning and execution (20-step implementation plan)
- ✅ Refactoring for maintainability
- ✅ Documentation and code clarity

### Key Takeaways

1. **Centralization is key**: Constants and utilities prevent bugs
2. **Reusability saves time**: Components like `HorizontalScrollContainer` used 5+ times
3. **User experience matters**: Loading states and error handling crucial
4. **Data quality varies**: Sorting TMDB data improves accuracy

---

## 🔮 Future Enhancements

### Potential Features

- 🔍 **Advanced Search**: Multi-criteria search with filters
- 🎬 **Video Trailers**: Embedded YouTube trailers
- 📊 **Analytics Dashboard**: User viewing statistics
- 🌙 **Dark Mode**: Toggle between light/dark themes
- 🔐 **User Authentication**: Personal accounts and sync
- 💬 **Social Features**: User reviews and ratings
- 🎯 **Watchlist**: Track movies to watch
- 📱 **Mobile App**: React Native version

### Technical Improvements

- 📦 **Code Splitting**: Lazy load routes for faster initial load
- 🧪 **Testing**: Unit tests with Jest, E2E with Cypress
- ♿ **Accessibility**: ARIA labels, keyboard navigation
- 🌍 **Internationalization**: Multi-language support
- 📈 **Analytics**: Track user behavior with Google Analytics

---

## 👨‍💻 Author

**Wilson Hsieh**  
Web Application Development Student  
South East Technological University (SETU)

- GitHub: [@YongHsiangHsieh](https://github.com/YongHsiangHsieh)
- Project: [Moodvy](https://github.com/YongHsiangHsieh/Moodvy)

---

## 📄 License

This project is developed for educational purposes as part of the Web Application Development module at SETU.

---

## 🙏 Acknowledgments

- **TMDB**: For providing the comprehensive movie database API
- **Material-UI**: For the beautiful component library
- **React Query**: For powerful data fetching and caching
- **SETU**: For the guidance and coursework structure

---

## 📞 Support

If you have questions or suggestions:

1. Open an issue on GitHub
2. Contact via university email

---

**Built with ❤️ and ☕ by Wilson Hsieh**
