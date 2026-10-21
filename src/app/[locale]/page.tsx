import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Stage } from "@/components/Stage";
import { App } from "@/components/app/App";

type Props = { params: Promise<{ locale: string }> };

/**
 * Site = uygulama. Masaüstünde solda başlık sahnesi, sağda telefon çerçevesi
 * içinde çalışan uygulama; mobilde yalnızca uygulama, tam ekran.
 */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="lg:mx-auto lg:grid lg:min-h-[calc(100dvh-7rem)] lg:w-full lg:max-w-[1360px] lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
        <div className="hidden lg:block lg:col-span-6">
          <Stage locale={locale} dict={dict} />
        </div>
        <div className="lg:col-span-6 lg:flex lg:justify-center lg:py-4">
          <div className="device">
            <App locale={locale} dict={dict} />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
