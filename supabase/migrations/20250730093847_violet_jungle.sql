/*
  # Fix messages table RLS policy for INSERT operations

  1. Security Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing authenticated users to insert their own messages
    - Ensure user_id matches auth.uid() for security

  2. Policy Details
    - Allow INSERT for authenticated users
    - Validate user_id matches authenticated user
    - Simple and secure approach
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Allow authenticated users to insert their own messages" ON messages;

-- Create a simple INSERT policy for authenticated users
CREATE POLICY "Users can insert own messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);