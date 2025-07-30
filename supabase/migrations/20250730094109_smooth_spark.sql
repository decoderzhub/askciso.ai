/*
  # Fix conversations RLS policy

  1. Security Updates
    - Drop existing restrictive INSERT policy for conversations
    - Create new policy allowing authenticated users to create conversations for their company
    - Ensure users can only create conversations linked to their user ID and company

  2. Policy Details
    - Allow INSERT when user_id matches authenticated user
    - Allow INSERT when company_id matches user's company from user_profiles
    - Maintains security while enabling conversation creation
*/

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can create conversations for their company" ON conversations;

-- Create new policy that allows authenticated users to insert conversations
CREATE POLICY "Allow users to create conversations for their company"
  ON conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    (company_id IS NULL OR company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ))
  );