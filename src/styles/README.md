# Styles Map

This project uses React-first styles under `src/styles`.

## Structure

- `src/styles/global.css`
  - global reset/base rules used by the app entry.
- `src/styles/pages/*.css`
  - page-level styles imported directly by each page component.

## Page → CSS mapping

- `src/pages/MainPage.jsx` → `src/styles/pages/main.css`
- `src/pages/LoginPage.jsx` → `src/styles/pages/login.css`
- `src/pages/RegisterPage.jsx` → `src/styles/pages/register.css`
- `src/pages/HomePage.jsx` → `src/styles/pages/home.css`
- `src/pages/AboutPage.jsx` → `src/styles/pages/about.css`
- `src/pages/ContactPage.jsx` → `src/styles/pages/contact.css`
- `src/pages/TermsPage.jsx` → `src/styles/pages/terms.css`
- `src/pages/ProfilePage.jsx` → `src/styles/pages/profile.css`
- `src/pages/EditProfilePage.jsx` → `src/styles/pages/edit-profile.css`
- `src/pages/TypingPage.jsx` → `src/styles/pages/typing.css` + `src/styles/pages/home.css`
- `src/pages/AdditionalTypePage.jsx` → `src/styles/pages/additional-type.css`
- `src/pages/AdditionalAccuracyPage.jsx` → `src/styles/pages/additional-accuracy.css`
- `src/pages/AdditionalReactionPage.jsx` → `src/styles/pages/additional-reaction.css`

## Notes

- Legacy non-React frontend folders and HTML/JS files were removed.
- Keep new style files in `src/styles/pages` and import them from the owning page component.
