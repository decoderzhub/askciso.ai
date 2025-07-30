/*
  # Allow authenticated users to create company profiles

  1. Security
    - Add policy to allow authenticated users to create company profiles
    - This enables user registration flow to work properly
*/

CREATE POLICY "Allow authenticated users to create company profiles"
  ON company_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);