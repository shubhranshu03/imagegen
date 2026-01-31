# Authentication Setup Guide

## Step 1: Update Your Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Replace with your actual Supabase credentials from earlier.

## Step 2: Supabase Database Setup

### Step-by-Step Instructions:

#### 2.1 - Go to Supabase SQL Editor
1. Open your Supabase project: https://supabase.com
2. Click on your project name
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query** button

#### 2.2 - Create Users Table
Copy and paste this code into the SQL editor:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  credits INTEGER DEFAULT 150,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Then click **Run** button (or press Ctrl+Enter)

✅ You should see: "Success. No rows returned"

#### 2.3 - Enable Row Level Security (RLS)
Paste this in a NEW query:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

Click **Run** button

✅ You should see: "Success. No rows returned"

#### 2.4 - Create Read Policy
Paste this in a NEW query:

```sql
CREATE POLICY "Users can read their own data"
ON users FOR SELECT
USING (auth.uid() = id);
```

Click **Run** button

✅ You should see: "Success. No rows returned"

#### 2.5 - Create Update Policy
Paste this in a NEW query:

```sql

```

Click **Run** button

✅ You should see: "Success. No rows returned"

#### 2.6 - Verify Table Created
Go to **Database** → **Tables** (left sidebar)
You should see `users` table listed there

Click on `users` table to see:
- id (UUID)
- email (TEXT)
- created_at (TIMESTAMP)
- credits (INTEGER)
- updated_at (TIMESTAMP)

## Step 3: Visual Guide - Where to Find Things in Supabase

### Supabase Dashboard Layout:

```
Supabase.com
    ↓
Click your project
    ↓
You'll see LEFT SIDEBAR with:
├── Home
├── SQL Editor          ← Use this for SQL queries
├── Database
│   └── Tables          ← See your tables here
│   └── Migrations      ← See what ran
├── Authentication
│   └── Users           ← See registered users here
├── Storage
└── Settings
```

### SQL Editor Location:
```
In Supabase Dashboard
Left Menu → SQL Editor
    ↓
Click "New Query"
    ↓
Paste SQL code here
    ↓
Click "Run" button (or Ctrl+Enter)
    ↓
See success message
```

## Step 4: Install Dependencies

Make sure you have installed the required packages:

```bash
npm install @supabase/supabase-js
```

If you already installed it, you'll see:
```
added 0 packages (already have all dependencies)
```

If it's the first time:
```
added 15 packages
```

Either way is fine! ✅

## Step 5: How It Works

### Authentication Flow:
1. User clicks the **Send** button in the dashboard
2. If not logged in → **Login/Register Modal** appears
3. User can toggle between Login and Register modes
4. After successful auth → Modal closes and generation proceeds

### Components:
- **AuthModal.tsx** - Login/Register popup component
- **useAuth.ts** - Hook to check authentication status
- **supabase.ts** - Supabase client configuration

## Step 5: How It Works

### Authentication Flow:
1. User clicks the **Send** button in the dashboard
2. If not logged in → **Login/Register Modal** appears
3. User can toggle between Login and Register modes
4. After successful auth → Modal closes and generation proceeds

### What Each File Does:
- **AuthModal.tsx** - Beautiful login/register form in a popup
- **useAuth.ts** - Checks if user is logged in
- **supabase.ts** - Connects to Supabase

### Security (RLS - Row Level Security):
- Only users can see their own data
- Other users cannot access your information
- Database enforces this automatically

### Features:
✓ Login with email and password
✓ Register with email and password confirmation
✓ Automatic logout functionality
✓ Error/success messages
✓ Clean, modern UI with black and white theme
✓ Responsive design
✓ Session persistence (stays logged in after refresh)

## Step 5: How It Works

### Authentication Flow:
1. User clicks the **Send** button in the dashboard
2. If not logged in → **Login/Register Modal** appears
3. User can toggle between Login and Register modes
4. After successful auth → Modal closes and generation proceeds

### What Each File Does:
- **AuthModal.tsx** - Beautiful login/register form in a popup
- **useAuth.ts** - Checks if user is logged in
- **supabase.ts** - Connects to Supabase

### Security (RLS - Row Level Security):
- Only users can see their own data
- Other users cannot access your information
- Database enforces this automatically

### Features:
✓ Login with email and password
✓ Register with email and password confirmation
✓ Automatic logout functionality
✓ Error/success messages
✓ Clean, modern UI with black and white theme
✓ Responsive design
✓ Session persistence (stays logged in after refresh)

## Step 6: Complete Testing Guide

### Test 1: Verify Database Table
**What to do:**
1. Go to https://supabase.com and login
2. Click on your project
3. Go to **Database** → **Tables** (left sidebar)
4. Look for `users` table

**Expected Result:**
✅ You see a table called `users` with these columns:
   - `id` (UUID type)
   - `email` (TEXT type)
   - `created_at` (TIMESTAMP type)
   - `credits` (INTEGER type)
   - `updated_at` (TIMESTAMP type)

**If you don't see it:**
- Go back and run the SQL queries from Step 2.2 to 2.5

---

### Test 2: Create First User (Sign Up)
**What to do:**
1. Make sure dev server is running: `npm run dev`
2. Open: http://localhost:3000/dashboard
3. Click the **Send** button (bottom right, inside text area)
4. Modal popup appears
5. Click **Sign Up** tab
6. Fill in:
   - Email: `testuser@example.com`
   - Password: `Test123456`
   - Confirm Password: `Test123456`
7. Click **Create Account** button

**Expected Result:**
✅ You see message: "Registration successful! Please check your email to confirm."
✅ Modal closes or switches to login
✅ No errors

**Troubleshooting:**
- If password < 6 chars: "Password must be at least 6 characters"
- If passwords don't match: "Passwords do not match"
- If email invalid: "Invalid email format"

---

### Test 3: Verify User Created in Supabase
**What to do:**
1. Go to Supabase Dashboard
2. Go to **Authentication** → **Users** (left sidebar)
3. Look for the user you just created

**Expected Result:**
✅ You see `testuser@example.com` in the users list
✅ Shows creation time and other details

---

### Test 4: Login (Sign In)
**What to do:**
1. Go to: http://localhost:3000/dashboard
2. Click **Send** button again
3. Modal appears
4. Stay on **Sign In** tab (default)
5. Enter:
   - Email: `testuser@example.com`
   - Password: `Test123456`
6. Click **Sign In** button

**Expected Result:**
✅ Message: "Login successful!"
✅ Modal closes automatically
✅ You're now logged in

---

### Test 5: Try to Generate Image
**What to do:**
1. After logging in, upload an image (drag & drop left side)
2. Enter text in the prompt area: "Make it cooler"
3. Click **Send** button

**Expected Result:**
✅ Image generates immediately
✅ No modal appears (because you're already logged in)
✅ Credits decrease by 10

---

### Test 6: Logout
**What to do:**
1. Look at left sidebar
2. Click **Logout** button (bottom of sidebar)

**Expected Result:**
✅ Modal appears again
✅ You're logged out
✅ Can login with different account

---

### Test 7: Login Again
**What to do:**
1. Modal is open from logout
2. Enter same credentials:
   - Email: `testuser@example.com`
   - Password: `Test123456`
3. Click **Sign In**

**Expected Result:**
✅ Login successful
✅ Modal closes
✅ You can generate again

---

### Test 8: Wrong Password
**What to do:**
1. Go to dashboard
2. Click Send button
3. Enter:
   - Email: `testuser@example.com`
   - Password: `WrongPassword`
4. Click **Sign In**

**Expected Result:**
✅ Error message appears (exact message from Supabase)
✅ Modal stays open (doesn't close)
✅ Can retry with correct password

---

### Test 9: New Account (Second User)
**What to do:**
1. Modal is open
2. Click **Sign Up** tab
3. Enter different email: `another@example.com`
4. Password: `Password123`
5. Confirm: `Password123`
6. Click **Create Account**

**Expected Result:**
✅ Registration successful message
✅ Can now login with this account
✅ Two users in Supabase Authentication

---

### Test 10: Session Persistence
**What to do:**
1. Login to dashboard
2. Refresh the page (F5 or Ctrl+R)
3. Wait for page to load

**Expected Result:**
✅ You stay logged in
✅ No modal appears
✅ Auth session persists

---

## Step 7: Checklist - Everything Working?

Check all these boxes:

- [ ] Environment variables added to `.env.local`
- [ ] SQL queries ran in Supabase without errors
- [ ] `users` table exists in Database → Tables
- [ ] Can sign up with new email
- [ ] New user appears in Authentication → Users
- [ ] Can login with that email/password
- [ ] Modal closes after successful login
- [ ] Can logout
- [ ] Modal reappears after logout
- [ ] Session persists after page refresh

**If all checked:** ✅ You're ready to use authentication!

---

## Step 8: What's Next?

### Optional Features to Add Later:

1. **Email Verification**
   - Send confirmation emails
   - Users must verify email before login

2. **Password Reset**
   - Add "Forgot Password" button
   - Send reset link via email

3. **Social Login**
   - Add Google sign in
   - Add GitHub sign in

4. **User Profile**
   - Show user email in header
   - User settings page
   - Change password

5. **Credit System**
   - Store user credits in database
   - Deduct credits when generating
   - Buy more credits with payment

6. **Admin Dashboard**
   - View all users
   - Manage credits
   - See analytics

---

## Frequently Asked Questions (FAQ)

### Q: Where do I find my Supabase credentials?
**A:** 
1. Go to supabase.com
2. Click your project
3. Go to **Settings** → **API**
4. You'll see:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Anon Key)

### Q: What's the difference between Sign Up and Sign In?
**A:**
- **Sign Up** = Create new account (Register)
- **Sign In** = Login to existing account

### Q: Can I change the modal design?
**A:** Yes! Edit `app/Component/AuthModal.tsx` to customize colors, text, layout, etc.

### Q: What if I forgot my password?
**A:** In this version, users can't reset. You can add this feature later.

### Q: Can multiple users use the same email?
**A:** No! Each email must be unique (enforced by database).

### Q: Why is my password minimum 6 characters?
**A:** For security. You can change it in `AuthModal.tsx` line 71.

### Q: What happens to user data if I delete the account?
**A:** Account and all associated data are deleted from Supabase.

### Q: Can I store more user information?
**A:** Yes! Add more columns to the `users` table (name, phone, avatar, etc.)

---

## Quick Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run type checking
npm run lint

# View Supabase docs
# https://supabase.com/docs/reference/javascript/introduction
```

---

## Support

**Still stuck?**
1. Check the error message carefully
2. Google the exact error message
3. Check Supabase docs: https://supabase.com/docs
4. Check Next.js docs: https://nextjs.org/docs

**Common errors:**
- "Cannot find module '@supabase/supabase-js'" → Run `npm install @supabase/supabase-js`
- "NEXT_PUBLIC_SUPABASE_URL is not set" → Add it to `.env.local`
- "User already registered" → Email already exists, use different email

---

**Congratulations!** 🎉 You now have a complete authentication system!

Next steps:
1. Follow the testing guide above
2. Test all 10 test cases
3. Check all boxes in the checklist
4. Start using it in your app!
