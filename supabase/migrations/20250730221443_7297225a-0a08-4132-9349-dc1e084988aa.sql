-- Fix critical security issues in RLS policies

-- Add missing INSERT policy for profiles table
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Add missing DELETE policy for profiles table (only admins can delete)
CREATE POLICY "Only admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create security definer function to prevent recursive RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Update existing UPDATE policy to restrict sensitive fields
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  -- Prevent users from changing these sensitive fields
  (OLD.role = NEW.role) AND
  (OLD.is_active = NEW.is_active) AND
  (OLD.id = NEW.id) AND
  (OLD.created_at = NEW.created_at)
);

-- Create admin-only policy for role management
CREATE POLICY "Only admins can update user roles and status" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');

-- Add constraints for data validation
ALTER TABLE public.profiles 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

ALTER TABLE public.profiles 
ADD CONSTRAINT check_full_name_length 
CHECK (length(full_name) <= 100);

ALTER TABLE public.profiles 
ADD CONSTRAINT check_phone_format 
CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$');

-- Add constraints for products table
ALTER TABLE public.products 
ADD CONSTRAINT check_name_length 
CHECK (length(name) > 0 AND length(name) <= 200);

ALTER TABLE public.products 
ADD CONSTRAINT check_price_positive 
CHECK (price > 0);

ALTER TABLE public.products 
ADD CONSTRAINT check_description_length 
CHECK (description IS NULL OR length(description) <= 1000);

ALTER TABLE public.products 
ADD CONSTRAINT check_details_length 
CHECK (details IS NULL OR length(details) <= 2000);

-- Create function to log admin actions for security monitoring
CREATE OR REPLACE FUNCTION public.log_admin_action()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Log role changes
  IF TG_OP = 'UPDATE' AND OLD.role != NEW.role THEN
    INSERT INTO auth.audit_log_entries (
      instance_id,
      id,
      payload,
      created_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      json_build_object(
        'action', 'role_change',
        'user_id', NEW.id,
        'old_role', OLD.role,
        'new_role', NEW.role,
        'changed_by', auth.uid()
      ),
      now()
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for admin action logging
CREATE TRIGGER log_profile_admin_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_admin_action();