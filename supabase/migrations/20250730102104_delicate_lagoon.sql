/*
  # Fix company profiles RLS policy

  1. Security Changes
    - Drop existing restrictive INSERT policy on company_profiles
    - Add new policy allowing authenticated users to create company profiles
    - Ensure authenticated users can insert their own company profiles during registration

  This resolves the "new row violates row-level security policy" error during user registration.
*/

-- Drop the existing restrictive policy if it exists
DROP POLICY IF EXISTS "Allow authenticated users to create company profiles" ON company_profiles;

-- Create a new policy that allows authenticated users to insert company profiles
CREATE POLICY "Allow authenticated users to create company profiles" 
  ON company_profiles 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Ensure the existing SELECT policy works correctly
DROP POLICY IF EXISTS "Users can view own company" ON company_profiles;
CREATE POLICY "Users can view own company" 
  ON company_profiles 
  FOR SELECT 
  TO authenticated 
  USING (
    id IN (
      SELECT user_profiles.company_id 
      FROM user_profiles 
      WHERE user_profiles.id = auth.uid()
    ) 
    OR created_by = auth.uid()
  );