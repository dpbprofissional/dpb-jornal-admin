import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ArticleFormData {
  id?: number;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  coverUrl: string;
  author: string;
  slug: string;
  publishedAt: string;
}

const CATEGORIES = ['INVESTIGAÇÃO', 'ANÁLISE', 'REPORTAGEM', 'ENTREVISTA', 'OPINIÃO'];

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    subtitle: '',
    category: 'INVESTIGAÇÃO',
    content: '',
    coverUrl: '',
    author: '',
    slug: '',
    publishedAt: new Date().toISOString().split('T')[0],
  });

  const { data: articles, isLoading, refetch } = trpc.admin.articles.list.useQuery();
  const createMutation = trpc.admin.articles.create.useMutation({
    onSuccess: () => {
      toast.success('Artigo criado com sucesso!');
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || 'Erro ao criar artigo');
    },
  });

  const updateMutation = trpc.admin.articles.update.useMutation({
    onSuccess: () => {
      toast.success('Artigo atualizado com sucesso!');
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || 'Erro ao atualizar artigo');
    },
  });

  const deleteMutation = trpc.admin.articles.delete.useMutation({
    onSuccess: () => {
      toast.success('Artigo deletado com sucesso!');
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || 'Erro ao deletar artigo');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      category: 'INVESTIGAÇÃO',
      content: '',
      coverUrl: '',
      author: '',
      slug: '',
      publishedAt: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
  };

  const handleOpenDialog = (article?: any) => {
    if (article) {
      setEditingId(article.id);
      setFormData({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle || '',
        category: article.category,
        content: article.content,
        coverUrl: article.coverUrl || '',
        author: article.author,
        slug: article.slug,
        publishedAt: new Date(article.publishedAt).toISOString().split('T')[0],
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content || !formData.author || !formData.slug) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle || undefined,
      category: formData.category,
      content: formData.content,
      coverUrl: formData.coverUrl || undefined,
      author: formData.author,
      slug: formData.slug,
      publishedAt: new Date(formData.publishedAt),
    };

    if (editingId) {
      await updateMutation.mutateAsync({
        id: editingId,
        ...payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este artigo?')) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
            <p className="text-slate-600 mt-2">Gerenciar artigos do DPB Jornal</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Editar Artigo' : 'Criar Novo Artigo'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do artigo abaixo
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Título *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Título do artigo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug *</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="slug-do-artigo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtítulo</label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Subtítulo do artigo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoria *</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Autor *</label>
                    <Input
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Nome do autor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data de Publicação</label>
                    <Input
                      type="date"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL da Capa</label>
                    <Input
                      value={formData.coverUrl}
                      onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Conteúdo *</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Conteúdo do artigo..."
                    className="min-h-[300px]"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingId ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Artigos</CardTitle>
            <CardDescription>
              {articles?.length || 0} artigos publicados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Título</th>
                      <th className="text-left py-3 px-4 font-medium">Categoria</th>
                      <th className="text-left py-3 px-4 font-medium">Autor</th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article: any) => (
                      <tr key={article.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">{article.title}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                            {article.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">{article.author}</td>
                        <td className="py-3 px-4">
                          {format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: ptBR })}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(article)}
                            className="gap-1"
                          >
                            <Edit2 className="h-3 w-3" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(article.id)}
                            className="gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Deletar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">Nenhum artigo publicado ainda</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
