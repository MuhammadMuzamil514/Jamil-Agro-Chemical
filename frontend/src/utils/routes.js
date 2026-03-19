function normalizeAdminPath(pathValue) {
  const cleaned = (pathValue || '').trim().replace(/^\/+|\/+$/g, '')
  return cleaned || 'portal-2026-admin'
}

export const ADMIN_BASE_PATH = normalizeAdminPath(import.meta.env.VITE_ADMIN_PATH)
export const ADMIN_DASHBOARD_PATH = `/${ADMIN_BASE_PATH}`
export const ADMIN_LOGIN_PATH = `/${ADMIN_BASE_PATH}/login`
