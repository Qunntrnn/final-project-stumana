import { AppGuard } from '@app/components/app-guard';

export default function Layout({ children }) {
  return <AppGuard>{children}</AppGuard>
}
