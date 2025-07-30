/*
  # Fix RLS Infinite Recursion

  1. Problem
    - Infinite recursion detected in policy for relation "team_members"
    - Circular dependencies between user_profiles, company_profiles, and team_members policies

  2. Solution
    - Simplify RLS policies to remove circular dependencies
    - Use direct auth.uid() checks instead of complex subqueries
    - Remove recursive policy lookups between tables

  3. Changes
    - Drop existing problematic policies
    - Create simplified, non-recursive policies
    - Ensure each policy can be evaluated independently
*/

-- Drop existing policies that may cause recursion
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

DROP POLICY IF EXISTS "Users can view own company" ON company_profiles;
DROP POLICY IF EXISTS "Company owners can update company" ON company_profiles;

DROP POLICY IF EXISTS "Users can view team members of their company" ON team_members;
DROP POLICY IF EXISTS "Company admins can manage team members" ON team_members;

-- Create simplified user_profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create simplified company_profiles policies
CREATE POLICY "Users can view own company"
  ON company_profiles
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT company_id 
      FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Company owners can update company"
  ON company_profiles
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
  );

-- Create simplified team_members policies
CREATE POLICY "Users can view team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own team membership"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Ensure RLS is enabled on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;