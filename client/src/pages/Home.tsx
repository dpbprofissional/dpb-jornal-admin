import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Home page with dynamic articles from database
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { data: articles, isLoading } = trpc.admin.articles.list.useQuery();

  const handleArticleClick = (slug: string) => {
    setLocation(`/artigo/${slug}`);
  };

  const handleAdminClick = () => {
    if (user) {
      setLocation("/admin");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">DPB Jornal Investigativo</h1>
            <p className="text-sm text-gray-400 mt-1">Informação apurada. Verdade documentada.</p>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <a href="#/" className="text-sm hover:text-[#ff3b30] transition-colors">
                INÍCIO
              </a>
              <a href="#/" className="text-sm hover:text-[#ff3b30] transition-colors">
                INVESTIGAÇÕES
              </a>
              <a href="#/" className="text-sm hover:text-[#ff3b30] transition-colors">
                SOBRE
              </a>
              <a href="#/" className="text-sm hover:text-[#ff3b30] transition-colors">
                CONTATO
              </a>
            </nav>
            <Button
              onClick={handleAdminClick}
              variant="outline"
              size="sm"
              className="border-white/20 hover:bg-white/10"
            >
              ACESSO RESTRITO
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-5 py-20">
        {/* Featured article */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            <div
              className="group cursor-pointer mb-20"
              onClick={() => handleArticleClick(articles[0].slug)}
            >
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-[#111] mb-6 border border-white/10">
                {articles[0].coverUrl && (
                  <img
                    src={articles[0].coverUrl}
                    alt={articles[0].title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">
                {articles[0].category}
              </span>
              <h2 className="font-serif text-4xl font-black mt-3 leading-tight group-hover:text-[#ff3b30] transition-colors">
                {articles[0].title}
              </h2>
              {articles[0].subtitle && (
                <p className="text-lg text-gray-400 mt-4 leading-relaxed">
                  {articles[0].subtitle}
                </p>
              )}
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-6">
                {format(new Date(articles[0].publishedAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })} · {articles[0].author}
              </div>
            </div>

            {/* Latest articles */}
            {articles.length > 1 && (
              <section className="mt-20">
                <div className="flex items-center gap-4 mb-12">
                  <h3 className="font-serif text-2xl font-black tracking-tight">
                    Últimas Investigações
                  </h3>
                  <div className="h-[1px] w-full bg-white/10" />
                </div>

                <div className="grid gap-12 sm:grid-cols-2">
                  {articles.slice(1).map((article: any) => (
                    <div
                      key={article.id}
                      className="group flex flex-col cursor-pointer"
                      onClick={() => handleArticleClick(article.slug)}
                    >
                      <div className="aspect-[16/9] overflow-hidden rounded-lg bg-[#111] mb-6 border border-white/10">
                        {article.coverUrl && (
                          <img
                            src={article.coverUrl}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">
                        {article.category}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold mt-3 leading-tight group-hover:text-[#ff3b30] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      {article.subtitle && (
                        <p className="text-sm text-gray-400 mt-4 line-clamp-3 leading-relaxed">
                          {article.subtitle}
                        </p>
                      )}
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-6">
                        {format(new Date(article.publishedAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">Nenhum artigo publicado ainda</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <div>
              <h4 className="font-black mb-4">DPB Jornal Investigativo</h4>
              <p className="text-sm text-gray-400">
                Informação apurada. Verdade documentada.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#/" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Investigações</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4">Contato</h4>
              <p className="text-sm text-gray-400">
                contato@detetivebiano.site
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 DPB Jornal Investigativo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
