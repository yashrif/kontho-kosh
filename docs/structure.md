```markdown
# Konthokosh Application Page Structure

This document outlines all the required pages for the Konthokosh platform, based on the SRS. Each page includes a description and its main sections/components.

---

## 1. Landing Page (`/`) ✅
**Purpose:** Introduction to Konthokosh, value proposition, and entry point for users.
**Sections:**
- Hero section (project tagline, call-to-action)
- Features overview (AI originality, blockchain proof, privacy)
- How it works (step-by-step visual)
- Login/Sign Up button (MetaMask/Clerk integration)
- Footer (links, contact, social)

## 2. Authentication Page (`/auth`) ✅
**Purpose:** User authentication via MetaMask (wallet) and Clerk.
**Sections:**
- MetaMask connect button
- Clerk login/signup (optional email/username)
- Auth status display (success/error)

## 3. Dashboard Page (`/dashboard`)
**Purpose:** Main user hub after login; shows user info and content summary.
**Sections:**
- User profile (wallet address, optional username/email)
- Quick stats (number of posts, originality status)
- Button to create new post
- List of recent submissions (with status: processing, original, duplicate)

## 4. New Post Page (`/post/new`)
**Purpose:** Submit new story/poem for originality check and blockchain registration.
**Sections:**
- Content editor (textarea or rich text)
- Submit button
- Loading indicator (PageLoader)
- Result display (original/duplicate, similarity score, details)
- Blockchain registration status (pending, success, error)

## 5. Post Details Page (`/post/[id]`)
**Purpose:** View details of a single post, originality report, and blockchain proof.
**Sections:**
- Post content (title, body)
- Originality status (original/duplicate, similarity %)
- Similar posts (list with links and similarity scores)
- Blockchain info (content hash, block ID, timestamp, transaction hash)
- Copy/share proof button

## 6. My Posts Page (`/my-posts`)
**Purpose:** List all posts submitted by the logged-in user.
**Sections:**
- Table/list of posts (title, date, status, actions)
- Filter/search bar
- Link to post details

## 7. Explore/Public Feed Page (`/explore`)
**Purpose:** Browse public, original posts from all users.
**Sections:**
- List/grid of posts (title, author, date)
- Filters (recent, most original, trending)
- Search bar
- Link to post details

## 8. Originality Report Modal/Drawer (component, used in multiple pages)
**Purpose:** Show detailed similarity analysis for a post.
**Sections:**
- List of similar posts (with similarity %)
- Highlighted text differences (if available)
- Option to close

## 9. Settings/Profile Page (`/settings`)
**Purpose:** Manage user profile, wallet, and preferences.
**Sections:**
- Profile info (wallet, email, username)
- Option to disconnect wallet
- Notification preferences

## 10. Error/Not Found Page (`/404`)
**Purpose:** Shown for invalid routes or missing content.
**Sections:**
- Error message
- Link to home/dashboard

---

## Notes
- All pages should be responsive and support both light/dark themes.
- Use PageLoader for loading states.
- Use UI components and color scheme as per coding guidelines.
- Authentication is required for all pages except Landing, Auth, and 404.
- Blockchain registration and originality check are tightly integrated in the new post flow.
```
