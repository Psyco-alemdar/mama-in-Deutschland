-- Reviewed release hardening. No personal records are modified.
BEGIN;
ALTER FUNCTION public.set_updated_at() SET search_path = '';
ALTER FUNCTION public.is_mama_admin() SET search_path = '';
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
-- This existing RPC is an authenticated community operation, not a public counter.
REVOKE EXECUTE ON FUNCTION public.increment_community_post_like(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_community_post_like(uuid) TO authenticated;
-- Contact UI requires sign-in. The old permissive policy allowed forged user IDs.
ALTER POLICY contact_messages_insert_anyone ON public.contact_messages
  TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
COMMIT;
