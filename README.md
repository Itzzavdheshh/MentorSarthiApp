# MentorSarthiApp

## 🚀 Overview
MentorSarthiApp is a modern, cross-platform (Mobile, Tablet, and Web) mentorship and coaching application. It connects ambitious learners and junior professionals with experienced industry experts for 1-on-1 sessions, career guidance, and live workshops.

## 🎯 Purpose
The purpose of this project is to bridge the gap between emerging talent and industry veterans by providing an accessible, intuitive platform where users can easily find mentors, book time slots, and level up their careers.

## 🧠 Problem Statement
Navigating a career path, preparing for interviews, or transitioning into new roles can be isolating and confusing. Finding reliable, experienced mentors is difficult, and managing the logistics of scheduling and paying for sessions adds unnecessary friction to the learning process.

## 💡 Solution
MentorSarthiApp provides a unified, centralized marketplace for mentorship. It offers a categorized directory of verified experts, transparent pricing, seamless scheduling logic, and a dedicated dashboard to track upcoming and past sessions—all wrapped in a premium, responsive user interface.

## ✨ Features
- **Cross-Platform Compatibility:** Runs seamlessly on iOS, Android, and Web browsers.
- **Universal Responsive Design:** Fully adaptive layouts leveraging Tailwind CSS (NativeWind v4) that dynamically scale from mobile screens to multi-column desktop grids.
- **Mentor Discovery:** Browse and filter mentors by categories (Tech, Business, Design, Finance, Career, Soft Skills).
- **Rich Mentor Profiles:** View mentor expertise, background, availability schedule, pricing, and peer reviews.
- **Booking Flow:** Intuitive interface to select session dates, available time slots, and durations, culminating in a checkout experience.
- **Workshop Listings:** Dedicated space to browse and enroll in upcoming group live sessions with limited seats.
- **User Dashboard:** Centralized hub to manage profile settings, track upcoming scheduled sessions, and review past interactions.
- **Local Profile Persistence:** User profile data is managed via Context API and persisted locally across sessions.

## 🏗️ Architecture
The application is built entirely as a frontend monolith using the **Expo (React Native) SDK 54**. It is structured as a Universal App capable of compiling to native iOS/Android binaries as well as a progressive web application (PWA).

- **Routing:** Utilizes **Expo Router** (file-based navigation) for deep-linking, layout nesting, and seamless screen transitions.
- **Styling:** Styled using **NativeWind v4** and Tailwind CSS, allowing the use of utility classes (`className`) directly on React Native components, with responsive breakpoints (`sm:`, `md:`, `lg:`).
- **State Management:** Relies on the React Context API (`ProfileContext.tsx`) for global state and `@react-native-async-storage/async-storage` for local data persistence.
- **Data Layer:** The application currently operates without a backend server. All mentor, workshop, and session data is securely mocked via static constants in `constants/AppData.ts`.

## 🔄 Workflow
1. **Onboarding & Auth:** Users land on the login/registration screens (currently mocked workflows).
2. **Dashboard:** Users are greeted by a personalized dashboard summarizing their mentorship journey.
3. **Discovery:** Users navigate to the "Mentors" tab to search or filter professionals by their specific needs.
4. **Evaluation:** Clicking a mentor card opens their detailed profile, showing credentials, reviews, and availability.
5. **Booking:** Users select "Book Session", choose a date, time slot, and session duration.
6. **Checkout:** Users proceed to the payment confirmation screen (UI indicates Razorpay integration) and confirm their booking.

## 🧩 Tech Stack
- **Framework:** React Native, Expo (SDK 54)
- **Routing:** Expo Router
- **Styling:** Tailwind CSS, NativeWind (v4), `expo-linear-gradient`
- **State & Storage:** React Context API, AsyncStorage
- **Icons & UI:** Expo Vector Icons (via emojis/text in current state), Expo Haptics

## 📂 Folder Structure
- `/app` - Expo Router file-based routing. Contains all screens, layouts (`_layout.tsx`), and tabs (`(tabs)/`).
- `/components` - Reusable UI components (e.g., `ResponsiveLayout.tsx`, parallax views, themed elements).
- `/constants` - Static configurations, theme colors (`Colors.ts`), and mocked backend data (`AppData.ts`).
- `/context` - Global state providers (`ProfileContext.tsx`).
- `/assets` - Static assets like images and fonts.

## 🔐 Security
- **Authentication:** Currently non-functional. Login and Registration forms exist but do not securely transmit credentials or manage JWT tokens.
- **Payment Processing:** The UI mentions "Secured by Razorpay," but there is no actual SDK integration or secure token exchange implemented yet.
- **Data Storage:** User profile data is stored unencrypted in `AsyncStorage`. (Note: `expo-secure-store` is listed in dependencies but is not actively utilized in the code).

## ⚡ Performance Notes
- **Optimized Re-renders:** Filtering logic utilizes React's `useMemo` to prevent expensive recalculations during search and category toggling.
- **List Rendering:** Currently relies on standard `ScrollView` with `.map()` for rendering lists of mentors and workshops. While sufficient for the mocked dataset, this is a known bottleneck for large datasets.

## 🧪 Known Issues
- **Missing Backend:** The application is entirely frontend-driven. All mentors, reviews, and workshops are hardcoded in `AppData.ts`.
- **Inefficient List Rendering:** The use of `ScrollView` instead of `FlatList` or `SectionList` will cause memory bloat and frame drops if the mentor list grows significantly.
- **Mocked Workflows:** Form submissions (Auth, Profile Edits) lack strict validation logic, and the payment gateway is entirely simulated.
- **Unused Dependencies:** Packages like `expo-secure-store` are installed but not implemented for sensitive data.

## 🔮 Future Improvements
- **Backend Integration:** Connect the app to a robust backend (e.g., Node.js/Express + PostgreSQL or Firebase) to serve dynamic mentor and booking data.
- **Real Authentication:** Implement OAuth (Google/Apple) and secure JWT-based authentication flows.
- **Payment Gateway Integration:** Implement the actual Razorpay or Stripe SDK to handle real transactions securely.
- **Performance Upgrades:** Refactor all scrollable lists (Mentors, Workshops) to use `FlatList` or `@shopify/flash-list` for infinite scrolling and memory efficiency.
- **Live Video SDK:** Integrate WebRTC or a service like Agora/Zoom API to conduct the actual 1-on-1 sessions within the app.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app installed on your physical mobile device (optional but recommended)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MentorSarthiApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run the App:**
   - **Web:** Press `w` in the terminal to open the web app.
   - **Mobile:** Scan the QR code displayed in the terminal using the Expo Go app on your phone.

## 📸 Screenshots 
*(Consider adding screenshots here of the Dashboard, Mentor Profile, and Booking screens on both Mobile and Desktop views to showcase the responsive design.)*

## 🤝 Contribution Guide
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request for review.

## 📄 License
*This project is currently unlicensed. (Consider adding an MIT License if you plan to open-source this project).*
