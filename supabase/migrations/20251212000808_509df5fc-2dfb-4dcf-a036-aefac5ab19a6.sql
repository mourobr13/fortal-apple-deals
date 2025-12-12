-- Fix 1: Create trigger to automatically create profiles on user signup
-- This prevents privilege escalation by ensuring role is ALWAYS set to 'user' by the database

-- Drop existing trigger if it exists (to be safe)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger that fires after new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fix 2: Add RLS policies for product-images storage bucket
-- Only admins can upload images, but anyone can view (public product catalog)

-- Policy: Only admins can upload product images
CREATE POLICY "Only admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Only admins can update product images
CREATE POLICY "Only admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Only admins can delete product images
CREATE POLICY "Only admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Anyone can view product images (public catalog)
CREATE POLICY "Public read access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');