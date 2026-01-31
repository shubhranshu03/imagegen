# 📸 Step-by-Step Visual Guide - Creating Users Table

## Overview
This guide shows you exactly where to click in Supabase to create the users table.

---

## STEP 1: Login to Supabase

### 1.1 Go to Website
```
Open: https://supabase.com
```

### 1.2 Click Your Project
Look for your project name in the list and click it.

```
You should see:
┌─────────────────────────────────┐
│  Projects                       │
├─────────────────────────────────┤
│  📦 Your_Project_Name          │ ← Click this
│  📦 Other Project               │
└─────────────────────────────────┘
```

---

## STEP 2: Find SQL Editor

After clicking your project, look at the **LEFT SIDEBAR**:

```
LEFT SIDEBAR:
├── 🏠 Home
├── 📝 SQL Editor              ← Click here
├── 💾 Database
├── 🔐 Authentication
├── 📦 Storage
└── ⚙️  Settings
```

Click on **SQL Editor**

---

## STEP 3: Create New Query

In SQL Editor, you'll see:

```
┌────────────────────────────────┐
│  SQL Editor                    │
├────────────────────────────────┤
│                                │
│  [+ New Query]  [v]            │ ← Click "+ New Query"
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │ (Empty editor area)      │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  [Run] or Ctrl+Enter           │
└────────────────────────────────┘
```

Click on **"+ New Query"** button

---

## STEP 4: Copy & Paste First SQL

After clicking "New Query", you'll see an empty text editor.

### 4.1 Copy This Code:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  credits INTEGER DEFAULT 150,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4.2 Paste into Editor
- Click in the editor area
- Paste the code (Ctrl+V)

You should see:

```
┌──────────────────────────────────────┐
│ CREATE TABLE users (               │
│   id UUID PRIMARY KEY ...          │
│   email TEXT NOT NULL ...          │
│   ...                              │
│ );                                 │
└──────────────────────────────────────┘
```

### 4.3 Click Run Button
Look for blue **"Run"** button at the bottom

```
[Run]  or press Ctrl+Enter
```

Click it!

### 4.4 Check Result
You should see:

```
✅ Success. No rows returned
```

If you see this, **GREAT!** Table created! ✅

---

## STEP 5: Enable Row Level Security (RLS)

### 5.1 Create New Query
Click **"+ New Query"** again

### 5.2 Copy & Paste This Code:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### 5.3 Click Run
You should see:
```
✅ Success. No rows returned
```

---

## STEP 6: Create Read Policy

### 6.1 Create New Query
Click **"+ New Query"** again

### 6.2 Copy & Paste:
```sql
CREATE POLICY "Users can read their own data"
ON users FOR SELECT
USING (auth.uid() = id);
```

### 6.3 Click Run
You should see:
```
✅ Success. No rows returned
```

---

## STEP 7: Create Update Policy

### 7.1 Create New Query
Click **"+ New Query"** again

### 7.2 Copy & Paste:
```sql
CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (auth.uid() = id);
```

### 7.3 Click Run
You should see:
```
✅ Success. No rows returned
```

---

## STEP 8: Verify Everything Created

### 8.1 Go to Database → Tables
Look at LEFT SIDEBAR again:

```
LEFT SIDEBAR:
├── 🏠 Home
├── 📝 SQL Editor
├── 💾 Database
│   ├── 📋 Tables         ← Click here
│   ├── 🔄 Migrations
│   ├── 🔗 Relations
│   └── 🔍 Queries
├── 🔐 Authentication
└── ...
```

Click on **Tables** under Database

### 8.2 Look for "users" Table
You should see a list:

```
TABLES:
├── users              ← You should see this! ✅
├── migrations
└── (other tables if any)
```

### 8.3 Click on "users" to See Columns
Click on the `users` table name

You should see:

```
TABLE: users
├── id (uuid)           ← Primary key
├── email (text)        ← Unique email
├── created_at (timestamp)
├── credits (integer, default: 150)
└── updated_at (timestamp)
```

**Perfect!** Table is created with all columns! ✅

---

## STEP 9: Check Policies

### 9.1 Go Back to Database
In LEFT SIDEBAR, look for your table options

Click on the **"users"** table

### 9.2 Find Policies Tab
You should see tabs:

```
Columns | Indexes | Policies | Triggers
                   ↑
                Click here
```

Click on **Policies** tab

### 9.3 You Should See:
```
POLICIES FOR users TABLE:
├── Users can read their own data (SELECT)
└── Users can update their own data (UPDATE)
```

**Excellent!** Your security is set up! ✅

---

## STEP 10: Check Authentication Users

### 10.1 Go to Authentication
In LEFT SIDEBAR:

```
LEFT SIDEBAR:
├── 🏠 Home
├── 📝 SQL Editor
├── 💾 Database
├── 🔐 Authentication        ← Click here
│   ├── 👥 Users
│   ├── 🔑 Providers
│   └── ⚙️  Settings
└── ...
```

Click on **Authentication**

### 10.2 Click Users
Click on **Users** sub-menu

You should see:

```
USERS:
(empty list - no users yet)

This is where new users will appear when they sign up!
```

---

## Summary - You're Done! ✅

You have successfully:

✅ Created `users` table with 5 columns
✅ Enabled Row Level Security (RLS)
✅ Created read policy (users see their own data)
✅ Created update policy (users update their own data)
✅ Verified table exists
✅ Verified policies are set
✅ Ready to start using authentication!

---

## Troubleshooting - If Something Went Wrong

### Issue: See Error "table already exists"
```
ERROR: relation "users" already exists
```
**Solution:** 
- Click on "users" in Tables
- You probably ran the first query twice
- That's OK! The table still exists and is ready to use

### Issue: See Error "syntax error"
```
ERROR: syntax error at or near...
```
**Solution:**
- Make sure you copied the code EXACTLY
- Check for missing semicolons at the end
- Try copying from this guide again carefully

### Issue: Policies not showing
```
No policies found
```
**Solution:**
- Run the policy creation queries again
- Make sure you ran all 2 policy queries

### Issue: Table not appearing in Tables list
```
No tables found
```
**Solution:**
- Refresh the page (F5)
- Run the CREATE TABLE query again
- Wait a few seconds for database to update

---

## Next Step

Now go to **AUTH_SETUP.md** Step 6 and follow the **Testing Guide** to create your first user!
