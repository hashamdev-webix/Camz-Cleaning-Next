# Database Migrations

## Blog Comments Table Migration

This migration creates the `blog_comments` table for storing blog comments.

### Features:

- ✅ Stores comment data (name, email, comment text)
- ✅ Status field for moderation (pending, approved, rejected)
- ✅ Foreign key relationship with blogs table
- ✅ Row Level Security (RLS) enabled
- ✅ Public can submit comments
- ✅ Only approved comments visible to public
- ✅ Admins can view/approve/reject/delete all comments
- ✅ Automatic timestamps (created_at, updated_at)

### How to Run:

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `create_blog_comments_table.sql`
4. Paste and click **Run**

#### Option 2: Using Supabase CLI

```bash
# Make sure you're in the project root
cd /Users/macbookair/Webix\ Solutions/30\ Camz\ Cleaning\ NEXT/Camz-Cleaning-Next

# Run the migration
supabase db push
```

### Table Schema:

```sql
blog_comments (
  id UUID PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id),
  name VARCHAR(255),
  email VARCHAR(255),
  comment TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Status Values:

- `pending` - Newly submitted, awaiting approval
- `approved` - Approved by admin, visible to public
- `rejected` - Rejected by admin, not visible

### Security:

- Anyone can submit comments (no login required)
- Only approved comments are publicly visible
- Admins have full access to manage comments
- Email addresses are stored but not displayed publicly
