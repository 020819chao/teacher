import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '给胡老师的教师节祝福',
  description: '一封写给胡老师的教师节祝福信。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
