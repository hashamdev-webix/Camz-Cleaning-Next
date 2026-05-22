# 🔧 Setup Blog Comments Feature

## ⚠️ Current Issue

The blog comment form is showing an error because the `blog_comments` table doesn't exist in the database yet.

## ✅ Solution - Follow These Steps:

### Step 1: Open Supabase Dashboard

1. Go to your Supabase project: https://supabase.com/dashboard
2. Select your project: **Camz Cleaning**

### Step 2: Run the SQL Migration

1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file: `CREATE_BLOG_COMMENTS_TABLE.sql` (in project root)
4. Copy ALL the contents
5. Paste into the SQL Editor
6. Click **RUN** button (bottom right)

### Step 3: Verify Table Creation

1. Go to **Table Editor** in left sidebar
2. You should see a new table: `blog_comments`
3. Check that it has these columns:
   - id
   - blog_id
   - name
   - email
   - comment
   - status
   - created_at
   - updated_at

### Step 4: Test the Comment Form

1. Go to any blog detail page: http://localhost:3001/blogs/[any-blog-id]
2. Scroll down to "Leave a Reply" section
3. Fill in:
   - Comment text
   - Your name
   - Your email
4. Click "Post Comment"
5. You should see: ✅ "Comment submitted! It will appear after approval."

### Step 5: Check Comments in Database

1. Go back to Supabase Dashboard
2. Click **Table Editor** → **blog_comments**
3. You should see your test comment with status = "pending"

## 📋 Table Structure

```
blog_comments
├── id (UUID, Primary Key)
├── blog_id (UUID, References blogs)
├── name (Text)
├── email (Text)
├── comment (Text)
├── status (Text: pending/approved/rejected)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

## 🔒 Security (RLS Policies)

- ✅ Anyone can submit comments (no login required)
- ✅ Only approved comments are visible to public
- ✅ Admins can view/approve/reject all comments
- ✅ Email addresses are stored but not displayed publicly

## 🎯 Features

- ✅ Real-time form validation
- ✅ Email format validation
- ✅ Loading state during submission
- ✅ Success/error messages
- ✅ Form clears after successful submission
- ✅ Comments require admin approval before showing

## 🐛 Troubleshooting

**Error: "Could not find the table 'public.blog_comments'"**

- Solution: Run the SQL migration (Step 2 above)

**Error: "Failed to submit comment"**

- Check Supabase connection
- Verify RLS policies are created
- Check browser console for detailed error

**Comments not showing on blog page**

- Comments need admin approval first
- Check status field in database (should be "approved" to show)

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console (F12) for errors
2. Check Supabase logs in dashboard
3. Verify the SQL migration ran successfully
4. Make sure your Supabase project is active

---

**Status:** Ready to deploy after running migration ✅
