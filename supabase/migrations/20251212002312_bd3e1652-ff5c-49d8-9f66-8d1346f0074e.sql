-- Add RLS policy to allow admins to view all user profiles
-- Uses the existing get_current_user_role() SECURITY DEFINER function to avoid infinite recursion

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.get_current_user_role() = 'admin');