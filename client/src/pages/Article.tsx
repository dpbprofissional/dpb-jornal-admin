import { useRoute } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Article() {
  const [match, params] = useRoute("/artigo/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug as string;

  const { data: article, isLoading, error } = trpc.admin.articles.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-5 py-20">
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="mb-8 border-white/20 hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-gray-400">O artigo que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-5 py-6">
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="border-white/20 hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Article */}
      <article className="bg-black">
        <div className="max-w-4xl mx-auto px-5 py-12 sm:py-20">
          <span className="inline-block bg-[#ff3b30] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm mb-6">
            {article.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-8">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl sm:text-2xl text-gray-400 font-medium leading-relaxed mb-10 italic">
              {article.subtitle}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-12 border-y border-white/10 py-6">
            <span>{article.author}</span>
            <span className="opacity-20">|</span>
            <span>
              {format(new Date(article.publishedAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          </div>

          {article.coverUrl && (
            <img
              src={article.coverUrl}
              alt={article.title}
              className="w-full rounded-xl mb-12 shadow-2xl"
            />
          )}

          <div className="prose prose-invert max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </article>

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
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Investigações</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Contato</a></li>
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
