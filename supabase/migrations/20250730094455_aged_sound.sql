/*
  # Allow conversations without company_id

  1. Changes
    - Update conversations RLS policy to allow users to create conversations without company_id
    - Update messages RLS policy to work with conversations that have null company_id
  
  2. Security
    - Users can only create conversations for themselves (user_id = auth.uid())
    - Users can only access their own conversations or shared ones
    - Messages follow conversation access rules
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to create conversations for their company" ON conversations;
DROP POLICY IF EXISTS "Users can insert own messages" ON messages;

-- Create new conversation policy that allows null company_id
CREATE POLICY "Users can create own conversations"
  ON conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Update conversation select policy to work with null company_id
DROP POLICY IF EXISTS "Users can view own conversations or shared conversations" ON conversations;
CREATE POLICY "Users can view own conversations or shared conversations"
  ON conversations
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() 
    OR auth.uid() = ANY (shared_with)
    OR (company_id IS NOT NULL AND company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ))
  );

-- Create new messages policy that works with conversations that may have null company_id
CREATE POLICY "Users can insert messages in accessible conversations"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() 
    AND conversation_id IN (
      SELECT id FROM conversations 
      WHERE user_id = auth.uid() 
      OR auth.uid() = ANY (shared_with)
      OR (company_id IS NOT NULL AND company_id IN (
        SELECT company_id FROM user_profiles WHERE id = auth.uid()
      ))
    )
  );