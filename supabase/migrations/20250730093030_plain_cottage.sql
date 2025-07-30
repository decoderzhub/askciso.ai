/*
  # Fix Messages RLS Policy

  1. Security
    - Drop existing restrictive INSERT policy for messages table
    - Create new INSERT policy that allows authenticated users to insert their own messages
    - Ensure messages can only be inserted into conversations the user has access to
*/

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can create messages in accessible conversations" ON messages;

-- Create new INSERT policy for messages
CREATE POLICY "Allow authenticated users to insert their own messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = conversation_id 
      AND (
        conversations.user_id = auth.uid() 
        OR auth.uid() = ANY(conversations.shared_with)
        OR conversations.company_id IN (
          SELECT company_id FROM user_profiles 
          WHERE user_profiles.id = auth.uid()
        )
      )
    )
  );